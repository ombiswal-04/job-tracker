import express from 'express';
import {
    applyToJob,
    getMyApplications,
    getAllApplications,
    updateApplicationStatus
} from '../controllers/applicationController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// IMPORTANT: specific routes must come before parameterized routes
router.get('/mine', protect, getMyApplications);                      // User: my applications
router.get('/', protect, adminOnly, getAllApplications);               // Admin: all applications
router.post('/:jobId', protect, applyToJob);                          // User: apply to a job
router.put('/:id/status', protect, adminOnly, updateApplicationStatus); // Admin: update status

export default router;
