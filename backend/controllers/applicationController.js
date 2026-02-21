import Application from '../models/Application.js';

// @route  POST /api/applications/:jobId
// @access User (logged in)
export const applyToJob = async (req, res) => {
    try {
        const { jobId } = req.params;

        // Prevent duplicate applications
        const existing = await Application.findOne({ user: req.user._id, job: jobId });
        if (existing) {
            return res.status(400).json({ message: 'You have already applied to this job' });
        }

        const application = await Application.create({
            user: req.user._id,
            job: jobId
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route  GET /api/applications/mine
// @access User (logged in)
export const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ user: req.user._id })
            .populate('job', 'title company location salary jobType source')
            .sort({ createdAt: -1 });

        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route  GET /api/applications
// @access Admin
export const getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find({})
            .populate('user', 'name email')
            .populate('job', 'title company')
            .sort({ createdAt: -1 });

        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route  PUT /api/applications/:id/status
// @access Admin
export const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        application.status = status;
        const updated = await application.save();

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
