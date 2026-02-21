import Job from '../models/Job.js';

// @route  GET /api/jobs
// @access Public
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({}).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route  POST /api/jobs
// @access Admin
export const createJob = async (req, res) => {
    try {
        const { title, company, location, salary, jobType, description, source, applyUrl } = req.body;

        if (!title || !company || !location || !salary || !jobType || !description) {
            return res.status(400).json({ message: 'Please fill in all required fields' });
        }

        const job = await Job.create({
            title,
            company,
            location,
            salary,
            jobType,
            description,
            source: source || 'CareerSetu',
            applyUrl: applyUrl || null,
            createdBy: req.user._id
        });

        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route  PUT /api/jobs/:id
// @access Admin
export const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        const { title, company, location, salary, jobType, description, source, applyUrl } = req.body;

        // Only update fields that were provided
        job.title = title ?? job.title;
        job.company = company ?? job.company;
        job.location = location ?? job.location;
        job.salary = salary ?? job.salary;
        job.jobType = jobType ?? job.jobType;
        job.description = description ?? job.description;
        job.source = source ?? job.source;
        job.applyUrl = applyUrl !== undefined ? applyUrl : job.applyUrl;

        const updatedJob = await job.save();
        res.json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route  DELETE /api/jobs/:id
// @access Admin
export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        await job.deleteOne();
        res.json({ message: 'Job removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
