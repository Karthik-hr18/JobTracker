import { userRegister,updateProfile,userLogin,getProfile } from "../controllers/controllers.js";
import validate from "../middleware/validate.js";
import { registerSchema,loginSchema } from "../validations/jobValidator.js";
import { updateProfileSchema } from "../validations/jobValidator.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import express from "express";
const router=express.Router();


router.post('/userReg',validate(registerSchema),userRegister);
router.post('/userLogin',validate(loginSchema),userLogin);
router.put('/update/profile/:id',protectRoute, validate(updateProfileSchema), updateProfile);
router.get('/profile/:id',protectRoute, getProfile);
export default router;
