var frontend    = require('../controllers/frontend'),
    config      = require('../config'),
    express     = require('express'),
    utils       = require('../utils'),

    frontendRoutes;

frontendRoutes = function () {
    var router = express.Router(),
        subdir = config.paths.subdir;

    // ### Admin routes
    router.get(/^\/(logout|signout)\/$/, function redirect(req, res) {
        /*jslint unparam:true*/
        res.set({'Cache-Control': 'public, max-age=' + utils.ONE_YEAR_S});
        res.redirect(301, subdir + '/ghost/signout/');
    });
    router.get(/^\/signup\/$/, function redirect(req, res) {
        /*jslint unparam:true*/
        res.set({'Cache-Control': 'public, max-age=' + utils.ONE_YEAR_S});
        res.redirect(301, subdir + '/ghost/signup/');
    });

    // redirect to /ghost and let that do the authentication to prevent redirects to /ghost//admin etc.
    router.get(/^\/((ghost-admin|admin|wp-admin|dashboard|signin|login)\/?)$/, function (req, res) {
        /*jslint unparam:true*/
        res.redirect(subdir + '/ghost/');
    });

    // ### Frontend routes
    router.get('/rss/', frontend.rss);
    router.get('/rss/:page/', frontend.rss);
    router.get('/feed/', function redirect(req, res) {
        /*jshint unused:true*/
        res.set({'Cache-Control': 'public, max-age=' + utils.ONE_YEAR_S});
        res.redirect(301, subdir + '/rss/');
    });

    // Tags
    router.get('/tag/:slug/rss/', frontend.rss);
    router.get('/tag/:slug/rss/:page/', frontend.rss);
    router.get('/tag/:slug/page/:page/', frontend.tag);
    router.get('/tag/:slug/', frontend.tag);

    // Authors
    router.get('/author/:slug/rss/', frontend.rss);
    router.get('/author/:slug/rss/:page/', frontend.rss);
    router.get('/author/:slug/page/:page/', frontend.author);
    router.get('/author/:slug/', frontend.author);

    // Default
    router.get('/page/:page/', frontend.homepage);
    router.get('/blog/', frontend.homepage);
    router.get('/', frontend.static('frontpage'));

    // Custom pages
    router.get('/music/2kl8', frontend.static('music/2kl8'));
    router.get('/music/bando-brando', frontend.static('music/bando-brando'));
    router.get('/music/caleb-carnell', frontend.static('music/caleb-carnell'));
    router.get('/music/dat-mango', frontend.static('music/dat-mango'));
    router.get('/music/iceface', frontend.static('music/iceface'));
    router.get('/music/johann', frontend.static('music/johann'));
    router.get('/music/linus', frontend.static('music/linus'));
    router.get('/music/martin', frontend.static('music/martin'));
    router.get('/music/micky-hardaway', frontend.static('music/micky-hardaway'));
    router.get('/music/notya', frontend.static('music/notya'));
    router.get('/music/sherman-lurch', frontend.static('music/sherman-lurch'));
    router.get('/music/t-wreks', frontend.static('music/t-wreks'));
    router.get('/music/tendrillar', frontend.static('music/tendrillar'));
    router.get('/music/the-island', frontend.static('music/the-island'));
    router.get('/music', frontend.static('music'));
    router.get('/about', frontend.static('about'));
    router.get('*', frontend.single);

    return router;
};

module.exports = frontendRoutes;
