import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(400).json({ errorMsg: 'No authorization header' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(400).json({ errorMsg: 'No token provided' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(400).json({ errorMsg: 'Invalid or expired token' });
    }
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) return;

        if (req.user && req.user.isAdmin) {
            return next()
        } else {
            return res.status(400).json({ errorMsg: 'Admin Access Required' })
        }
    })
}
