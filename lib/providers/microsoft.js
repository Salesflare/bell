'use strict';

exports = module.exports = function (options) {

    return {
        protocol: 'oauth2',
        useParamsAuth: true,
        auth: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
        token: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
        scope: ['User.read','offline_access'],
        profile: function (credentials, params, get, reply) {

            get('https://graph.microsoft.com/v1.0/me/', null, (profile) => {

                if (!profile.mail) {
                    profile.mail = profile.userPrincipalName;
                }
                credentials.profile = {
                    id: profile.id,
                    displayName: profile.displayName,
                    email: profile.mail,
                    raw: profile
                };
                return reply();
            });
        }
    };
};
