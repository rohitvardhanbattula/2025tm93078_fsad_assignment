const db = require('../config/db');

exports.createBooking = async (req, res) => {
    const { gig_id, client_id, freelancer_id, scheduled_date, notes } = req.body;
    try {
        const newBooking = await db.query(
            'INSERT INTO bookings (gig_id, client_id, freelancer_id, scheduled_date, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [gig_id, client_id, freelancer_id, scheduled_date, notes]
        );
        res.status(201).json({ message: 'Booking created', booking: newBooking.rows[0] });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getBookings = async (req, res) => {
    const { user_id } = req.params;
    try {
        const bookings = await db.query(
            'SELECT * FROM bookings WHERE client_id = $1 OR freelancer_id = $1 ORDER BY created_at DESC',
            [user_id]
        );
        res.status(200).json(bookings.rows);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};