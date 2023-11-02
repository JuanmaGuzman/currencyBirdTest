import { Schema, model, Document } from "mongoose";

interface ITransfer extends Document {
    transferCode: string;
    amount: number;
    date?: Date;
}

const TransferSchema = new Schema<ITransfer>({
    transferCode: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date },
});

const Transfer = model<ITransfer>("Transfer", TransferSchema);

export default Transfer;
export { ITransfer };