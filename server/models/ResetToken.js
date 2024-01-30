import mongoose from "mongoose";

const resetTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    token: {
      type: String,
      required: true,
    },
    expirationDate: {
      type: Date,
      default: () => Date.now() + 60 * 60 * 1000,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ResetToken = mongoose.model("ResetToken", resetTokenSchema);

export default ResetToken;
