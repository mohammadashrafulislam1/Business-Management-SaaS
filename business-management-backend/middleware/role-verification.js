// middleware/role.js
export const checkUserRole = (roles) => {
    return (req, res, next) => {
     console.log(req.body.user.role)
        // Assuming req.user is properly set by your authentication middleware
        if (!req.body.user || !req.body.user.role) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        if (!roles.includes(req.body.user.role)) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        next();
    };
};
