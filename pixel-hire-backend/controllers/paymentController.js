const Booking = require('../models/Booking');

exports.selectPaymentMethod = async (req, res) => {
  try {
    const { bookingId, method } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Only client can choose payment method
    if (booking.client.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Not your booking' });
    }

    booking.paymentMethod = method;
    await booking.save();
    res.json({ message: 'Payment method updated', booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.markAsPaid = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Only creator or client can mark as paid (for now — manual simulation)
    if (
      booking.client.toString() !== req.user._id &&
      booking.creator.toString() !== req.user._id
    ) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    booking.paymentStatus = 'paid';
    await booking.save();
    res.json({ message: 'Marked as paid', booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
