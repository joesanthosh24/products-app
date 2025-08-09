import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
    action: { type: String, required: true },
    userEmail: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId }
}, {
    timestamps: true
});

export default mongoose.model('AuditLog', auditLogSchema);
