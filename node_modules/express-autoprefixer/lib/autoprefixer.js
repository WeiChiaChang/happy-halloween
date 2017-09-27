var hijackResponse  = require('hijackresponse');
var autoprefixer = require('autoprefixer');
var postcss = require('postcss');
var LRU = require('lru-cache');
var crypto = require('crypto');

function md5(str) {
    return crypto.createHash('md5').update(str).digest('hex');
}

// Hardcoded value can be made optional at a later point - but it will have to
// work for now, as it would require a breaking change...
var lruMaxItems = 100;

module.exports = function () {
    var args = Array.prototype.slice.call(arguments);
    var autoprefixerInstance = autoprefixer.apply(null, args);
    var autoprefixerHash = md5(autoprefixerInstance.info());
    var contentTypeCache = new LRU(lruMaxItems);

    return function (req, res, next) {
        var fileType = (req.originalUrl.match(/\.(le|c)ss$/) || []).shift();
        var cachedContentType = contentTypeCache.get(req.originalUrl);

        // Attempt to load the content type for this URL from the cache. If we
        // have the content-type we can determine up front if we need to do any
        // autoprefixing.
        // This works under the assumption that it is unlikely that a content
        // type will change without the file name changing too.
        // TLDR: If not either the fileType or cachedContentType matches, don't
        // bother trying to autoprefix.
        if (!(!!fileType || (cachedContentType && /text\/css/.test(cachedContentType)))) {
            return next();
        }


        // Prevent If-None-Match revalidation with the downstream middleware with ETags that aren't suffixed with "-autoprefixer":
        var ifNoneMatch = req.headers['if-none-match'];
        if (ifNoneMatch) {
            var autoprefixerEtagRegExp = new RegExp(`-autoprefixer\\[${autoprefixerHash}\\]["-]$`);
            var validIfNoneMatchTokens = ifNoneMatch.split(" ").filter(function (etag) {
                return autoprefixerEtagRegExp.test(etag);
            });
            if (validIfNoneMatchTokens.length > 0) {
                // Give the upstream middleware a chance to reply 304:
                req.headers['if-none-match'] = validIfNoneMatchTokens.map(function (validIfNoneMatchToken) {
                    return validIfNoneMatchToken.replace(/-autoprefixer\[[a-f0-9]{32}\](["-])$/, '$1');
                }).join(" ");
            } else {
                delete req.headers['if-none-match'];
            }
        }
        delete req.headers['if-modified-since']; // Prevent false positive conditional GETs after enabling autoprefixer

        hijackResponse(res, function (err, res) {
            if (err) {
                res.unhijack();
                return next(err);
            }

            var contentType = res.getHeader('Content-Type');
            contentTypeCache.set(req.originalUrl, contentType);

            if (!(!!fileType || /text\/css/.test(contentType))) {
                return res.unhijack();
            }

            var upstreamETag;

            if (res.statusCode === 304) {
                upstreamETag = res.getHeader('ETag');
                if (upstreamETag && !(/-autoprefixer\[[a-f0-9]{32}\]"$/.test(upstreamETag))) {
                    res.setHeader('ETag', upstreamETag.replace(/"$/, '-autoprefixer[' + autoprefixerHash + ']"'));
                }
                return res.unhijack();
            } else if (res.statusCode !== 200) {
                return res.unhijack();
            }

            var chunks = [];
            res.on('data', function (chunk) {
                chunks.push(chunk);
            }).on('end', function () {
                var body = Buffer.concat(chunks).toString();

                return postcss([autoprefixerInstance])
                    .process(body)
                    .then(function (result) {
                        res.setHeader('Content-Type', 'text/css');
                        upstreamETag = res.getHeader('ETag');
                        if (upstreamETag) {
                            res.setHeader('ETag', upstreamETag.replace(/"$/, '-autoprefixer[' + autoprefixerHash + ']"'));
                        }
                        res.setHeader('Content-Length', Buffer.byteLength(result.css));
                        res.end(result.css);
                    })
                    .catch(function (err) {
                        res.unhijack();
                        return next(err);
                    });
            });
        });
        return next();
    };
};
