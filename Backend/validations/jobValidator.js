import Joi from "joi";

// Schema for creating a job
export const createJobSchema = Joi.object({
    title:    Joi.string().required(),
    company:  Joi.string().required(),
    status:   Joi.string().valid("Applied", "Interview", "Offer", "Rejected").required(),
    location: Joi.string().allow(""),       // optional
    salary:   Joi.number().min(0),          // optional, but must be positive if given
    jobLink: Joi.string().allow(""), // optional, but must be a valid URL if given
    notes:    Joi.string().allow(""),       // optional
});
export const registerSchema = Joi.object({
    username:         Joi.string().min(3).max(30).required(),
    email:            Joi.string().email().required(),
    password:         Joi.string().min(6).required(),
    confirm_password: Joi.string().valid(Joi.ref('password')).required()
                        .messages({ 'any.only': 'passwords must match' }),
});

export const loginSchema = Joi.object({
    email:    Joi.string().required(),
    password: Joi.string().required(),
});
export const updateProfileSchema = Joi.object({
  username: Joi.string().min(3).max(30).optional().allow(""),
  email: Joi.string().email().optional().allow(""),
  bio: Joi.string().max(300).optional().allow(""),
  phone: Joi.string().optional().allow(""),
  location: Joi.string().optional().allow(""),
  skills: Joi.array().items(Joi.string()).optional(),
  linkedin: Joi.string().optional().allow(""),
  github: Joi.string().optional().allow(""),
  portfolio: Joi.string().optional().allow(""),
  experienceLevel: Joi.string().valid("Fresher", "Junior", "Mid-Level", "Senior", "").optional(),
  role: Joi.string().optional().allow(""),
  profilePhoto: Joi.string().optional().allow(""),
  resume: Joi.string().optional().allow(""),
  appliedJobs: Joi.array().items(Joi.string()).optional(),
  savedJobs: Joi.array().items(Joi.string()).optional(),
}).options({ stripUnknown: true }).min(1);
// Schema for updating (same fields, but nothing is required)
export const updateJobSchema = Joi.object({
    title:    Joi.string(),
    company:  Joi.string(),
    status:   Joi.string().valid("Applied", "Interview", "Offer", "Rejected"),
    location: Joi.string().allow(""),
    salary:   Joi.number().min(0),
    jobLink: Joi.string().allow(""),
    notes:    Joi.string().allow(""),
}).min(1); // at least one field must be provided for an update
