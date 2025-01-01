const Booking = require('../models/Booking');

// Create a booking
exports.createBooking = async (req, res) => {
    try {
        const { date, time, guests, name, contact } = req.body;

        // Check for double bookings
        const existingBooking = await Booking.findOne({ date, time });
        if (existingBooking) return res.status(400).json({ message: 'Slot already booked!' });

        const booking = await Booking.create({ date, time, guests, name, contact });
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all bookings for a date
exports.getBookings = async (req, res) => {
    try {
        const { date } = req.query;
        const bookings = await Booking.find({ date });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        await Booking.findByIdAndDelete(id);
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
