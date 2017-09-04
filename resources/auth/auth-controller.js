const uberClient = require('../uber/uber-client');
const User = require('../users/user');

const login = (req, res, next) => {
    const { code } = req.query;
    req.session.code = code;

    uberClient.getAccessToken(code)
        .then(({ access_token }) => {
            req.session.access_token = access_token;

            return uberClient.getMe(req.session.access_token)
        })
        .then((user) => {
            return User.findOrCreate({ where: { rider_id: user.rider_id }, defaults: user });
        })
        .then((result) => {
            const [user, created] = result;
            req.session.user = user;
            res.redirect('/');
        });
};

const logout = (req, res, next) => {
    req.session.destroy();

    res.redirect('/');
};

module.exports = {
    login,
    logout
};