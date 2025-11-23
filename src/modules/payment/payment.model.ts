import { Schema, model } from "mongoose";
import { IPayment, PaymentGateway, PaymentStatus } from "./payment.interface";

const DOCUMENT_NAME = "Payment";
const COLLECTION_NAME = "Payments";

const paymentSchema = new Schema<IPayment>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    
    amount: { type: Number, required: true },
    currency: { type: String, default: "VND" },
    
    status: { 
        type: String, 
        enum: Object.values(PaymentStatus), 
        default: PaymentStatus.PENDING,
        index: true 
    },
    
    gateway: { 
        type: String, 
        enum: Object.values(PaymentGateway), 
        required: true 
    },
    
    transactionId: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME
  }
);

paymentSchema.index({ transactionId: 1 }, { unique: true });

paymentSchema.index({ user: 1, createdAt: -1 });

export const PaymentModel = model<IPayment>(DOCUMENT_NAME, paymentSchema);