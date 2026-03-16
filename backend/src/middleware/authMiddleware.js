const { verifyAccessToken   } = require('../services/cryptoService');


function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    try {
        const decoded = verifyAccessToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'The token is invalid or has expired' });
    }
}


// function requireRole(...roles) {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.role)) {
//             return res.status(403).json({ error: 'The token is invalid or has expired' });
//         }
//         next();
//     };
// }

// module.exports = { authenticate, requireRole };
module.exports = { authenticate };