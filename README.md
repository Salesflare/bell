# **bell**

Third-party authentication plugin for [hapi](https://github.com/hapijs/hapi).

Lead Maintainer: [Lois Desplat](https://github.com/ldesplat)

[![Build Status](https://secure.travis-ci.org/hapijs/bell.png)](http://travis-ci.org/hapijs/bell)

**bell** ships with built-in support for authentication using `Facebook`, `GitHub`, `Google`, `Google Plus`, `Instagram`, `LinkedIn`, `Slack`, `Stripe`, `Twitter`, `Yahoo`, `Foursquare`, `VK`, `ArcGIS Online`, `Windows Live`, `Nest`, `Phabricator`, `BitBucket`, `Dropbox`, `Reddit`, `Tumblr`, `Twitch`, `Mixer`, `Salesforce`, `Pinterest`, `Discord`, `DigitalOcean`, `AzureAD`, `trakt.tv` and `Okta`. It also supports any compliant `OAuth 1.0a` and `OAuth 2.0` based login services with a simple configuration object.

**NOTE**: Bell 8.x.y uses the Hapi v16 APIs and **will not work** with Hapi v17. As of writing, Bell 8.x.y is the latest version, and [an effort to make Bell support Hapi v17 is underway](https://github.com/hapijs/bell/issues/330).

## Documentation

[**API Documentation**](API.md)

[**Providers Documentation**](Providers.md)

## Tutorials

[**Social Login with Twitter using hapi.js**](http://mph-web.de/social-signup-with-twitter-using-hapi-js/)

## Examples

[**All Examples**](/examples)

Twitter:

```javascript
var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({ port: 8000 });

// Register bell with the server
server.register(require('bell'), function (err) {

    // Declare an authentication strategy using the bell scheme
    // with the name of the provider, cookie encryption password,
    // and the OAuth client credentials.
    server.auth.strategy('twitter', 'bell', {
        provider: 'twitter',
        password: 'cookie_encryption_password_secure',
        clientId: 'my_twitter_client_id',
        clientSecret: 'my_twitter_client_secret',
        isSecure: false     // Terrible idea but required if not using HTTPS especially if developing locally
    });

    // Use the 'twitter' authentication strategy to protect the
    // endpoint handling the incoming authentication credentials.
    // This endpoints usually looks up the third party account in
    // the database and sets some application state (cookie) with
    // the local application account information.
    server.route({
        method: ['GET', 'POST'], // Must handle both GET and POST
        path: '/login',          // The callback endpoint registered with the provider
        config: {
            auth: 'twitter',
            handler: function (request, reply) {

                if (!request.auth.isAuthenticated) {
                    return reply('Authentication failed due to: ' + request.auth.error.message);
                }

                // Perform any account lookup or registration, setup local session,
                // and redirect to the application. The third-party credentials are
                // stored in request.auth.credentials. Any query parameters from
                // the initial request are passed back via request.auth.credentials.query.
                return reply.redirect('/home');
            }
        }
    });

    server.start();
});
```
