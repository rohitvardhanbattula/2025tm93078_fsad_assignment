const Gig = require('../models/Gig');

exports.createGig = async (req, res) => {
    try {
        const { freelancer_id, title, description, category, tags, hourly_rate } = req.body;

        const newGig = new Gig({
            freelancer_id,
            title,
            description,
            category,
            tags,
            hourly_rate
        });

        const savedGig = await newGig.save();
        res.status(201).json({ message: 'Gig created successfully', gig: savedGig });
    } catch (error) {
        console.error('Error creating gig:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getGigs = async (req, res) => {
    try {
        const { category } = req.query;
        let query = { is_active: true };

        if (category) {
            query.category = category;
        }

        const gigs = await Gig.find(query).sort({ created_at: -1 });
        res.status(200).json(gigs);
    } catch (error) {
        console.error('Error fetching gigs:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};