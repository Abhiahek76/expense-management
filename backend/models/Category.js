import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: [
      "Food",
      "Transport",
      "Entertainment",
      "Shopping",
      "Health",
      "Education",
      "Others",
    ], // Add your category list here
  },
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
