import { createJob, getAllJobs, getJob, updateJob, deleteJob,totalJobs,jobStats } from "../controllers/controllers.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";
import { createJobSchema, updateJobSchema } from "../validations/jobValidator.js";
import express from "express";
const router = express.Router();

router.post('/create', protectRoute, validate(createJobSchema), createJob);
router.get('/getAll', protectRoute, getAllJobs);
router.get('/:id', protectRoute, getJob);
router.put('/update/:id', protectRoute, validate(updateJobSchema), updateJob);
router.delete('/delete/:id', protectRoute, deleteJob);
router.get('/getTotalJobs', protectRoute, totalJobs);
router.get('/jobStats', protectRoute, jobStats);

export default router;
