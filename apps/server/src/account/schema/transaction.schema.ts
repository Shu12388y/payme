import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Auth'
  },
  sendedNumber: {
    type: String,
  },
  recieverNumber: {
    type: String,
  },
  amount: {
    type: Number,
  },
  transactionType: {
    type: String,
  },
});

export const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);
