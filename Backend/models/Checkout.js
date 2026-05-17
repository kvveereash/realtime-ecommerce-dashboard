import mongoose from "mongoose";

const checkoutschema = mongoose.Schema({
  firstName: String,
  lastName: String,
  address: String,
  email: String,
  phone: String,
  items: Array,
  total: Number
})

export default mongoose.model("Checkout",checkoutschema)