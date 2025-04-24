const Booking = require('../models/Booking');
const Quote = require('../models/Quote');
const Request = require('../models/Request');

exports.confirmBooking = async (req, res) => {
  try {
    const { quoteId } = req.body;

    const quote = await Quote.findById(quoteId).populate('request creator');
    if (!quote) return res.status(404).json({ message: 'Quote not found' });

    if (quote.isAccepted) return res.status(400).json({ message: 'Quote already accepted' });

    // Mark quote as accepted
    quote.isAccepted = true;
    await quote.save();

    // Mark request as booked
    const request = await Request.findById(quote.request._id);
    request.status = 'booked';
    await request.save();

    // Create booking
    const newBooking = new Booking({
      request: quote.request._id,
      client: quote.request.client,
      creator: quote.creator._id,
      quote: quote._id
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const filter = req.user.role === 'client'
      ? { client: req.user._id }
      : { creator: req.user._id };

    const bookings = await Booking.find(filter)
      .populate('client', 'fname lname profile_img')
      .populate('creator', 'fname lname profile_img')
      .populate('request')
      .populate('quote');

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
