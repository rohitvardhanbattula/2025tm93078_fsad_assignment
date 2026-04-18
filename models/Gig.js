const mongoose = require('mongoose');

const GigSchema = new mongoose.Schema({
    freelancer_id: {
        type: String, 
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        default: []
    },
    hourly_rate: {
        type: Number,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Gig', GigSchema);