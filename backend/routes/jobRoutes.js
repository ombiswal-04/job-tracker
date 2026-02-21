import express from 'express';
import { getJobs, createJob, updateJob, deleteJob } from '../controllers/jobController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getJobs);                              // Public
router.post('/', protect, adminOnly, createJob);       // Admin
router.put('/:id', protect, adminOnly, updateJob);     // Admin
router.delete('/:id', protect, adminOnly, deleteJob);  // Admin

export default router;
