import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true,
        enum: ['Full-time', 'Part-time', 'Remote', 'Contract']
    },
    description: {
        type: String,
        required: true
    },
    source: {
        type: String,
        enum: ['CareerSetu', 'LinkedIn', 'Indeed', 'Naukri', 'External'],
        default: 'CareerSetu'
    },
    applyUrl: {
        type: String,
        default: null
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);
export default Job;
