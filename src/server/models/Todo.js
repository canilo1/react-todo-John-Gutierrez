import mongoose from "mongoose";

const { Schema } = mongoose;

const TodoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"]
    },
    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"]
    },
    completed: {
      type: Boolean,
      default: false
    },
    priority: {
      type: Number,
      min: [1, "Priority must be at least 1"],
      max: [5, "Priority cannot be more than 5"],
      default: 3
    },
    dueDate: {
      type: Date,
      default: null
    },
    tags: {
      type: [String],
      default: []
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const TodoModel = mongoose.model("Todo", TodoSchema);
export default TodoModel;