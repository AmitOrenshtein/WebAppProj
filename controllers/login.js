const UserService = require('../services/user');

async function login(req, res) {
    const { username, password } = req.body
    let user= await UserService.getUserByUsernameAndPass(username, password);
    if (user) {
        console.log("logged in to user: " + username);
        req.session.loggedUser = {
            id: user._id,
            username: user.username
        };
        res.redirect('/');
    }
    else {
        console.log("incorrect!");
        res.redirect('/login?error=1');
    }
}

function logout(req, res) {
    req.session.loggedUser = undefined;
    res.redirect('/');
}

function getLoggedUser(req, res) {
    let user = undefined;
    if(req.session) {
        user =req.session.loggedUser;
    }
    res.send(user);
}

module.exports = {
    login,
    logout,
    getLoggedUser
}