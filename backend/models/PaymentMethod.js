import mongoose from "mongoose";

const paymentMethodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: [
      "Cash",
      "Credit Card",
      "Debit Card",
      "Bank Transfer",
      "UPI",
      "Other",
    ], // Add your payment methods here
  },
});

const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);
export default PaymentMethod;
