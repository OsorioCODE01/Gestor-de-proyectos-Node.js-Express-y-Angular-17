const bcrypt = require('bcrypt');


function hashUserPassword(password) {
    return bcrypt.hashSync(password, 8);
}
function compareUserPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    hashUserPassword,
    compareUserPassword
};