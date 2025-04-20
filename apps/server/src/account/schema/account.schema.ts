import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
  },
  balance: {
    type: Number,
  },
});

export const Account =
  mongoose.models.Account || mongoose.model("Account", accountSchema);
