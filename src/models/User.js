import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },

    
    studentName: {
      type: String,
      unique: false,
      required: true,
    },

    
    fatherName: {
      type: String,
      unique: false,
      required: true,
    },
    
    motherName: {
      type: String,
      unique: false,
      required: true,
    },

    dob: {
      type: String,
      unique: false,
      required: true,
    },

    course: {
      type: String,
      unique: false,
      required: true,
    },

    certificateId: {
      type: String,
      unique: true,
      required: true,
    },

    totalMarks: {
      type: String,
      unique: false,
      required: true,
    },

    grade: {
      type: String,
      unique: false,
      required: true,
    },
    
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
