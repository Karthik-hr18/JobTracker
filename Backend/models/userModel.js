import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    profilePhoto: {
      type: String,
      default:
        "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },

    role: {
      type: String,
      default: "Job Seeker",
      trim: true,
    },

    bio: {
      type: String,
      default: "",
      maxlength: 300,
    },

    phone: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    linkedin: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    portfolio: {
      type: String,
      default: "",
    },

    resume: {
      type: String,
      default: "",
    },

    experienceLevel: {
      type: String,
      enum: ["Fresher", "Junior", "Mid-Level", "Senior"],
      default: "Fresher",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);