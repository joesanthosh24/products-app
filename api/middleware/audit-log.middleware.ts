import AuditLog from '../models/audit-log.ts';

export const auditLog = async (req, res, next) => {
    try {
        const urlArray = req.originalUrl.split("/");
        const activityUrlString = urlArray[urlArray.length - 2] + '/' + urlArray[urlArray.length - 1];
        await AuditLog.create({
            action: req.method + ' /' + activityUrlString || "",
            userEmail: req.user.email,
            productId: req.params && req.params.id ? req.params.id : "No Id"
        })

        next()
    }
    catch (err) {
        console.log('Unable to log the audit');
        next();
    }
}