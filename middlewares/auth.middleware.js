
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth)
        return res.status(401).json({message: 'Вы не авторизованы'});

    const token = auth.split(' ')[1];

    jwt.verify(token, '123456', (error, payload) => {
        if (error)
            return res.status(403).json({ message: 'Ваш токен не действителен' });

        req.user = {userId: payload.userId};
        next();
    });
}

module.exports = authMiddleware;