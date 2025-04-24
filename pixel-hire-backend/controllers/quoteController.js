const Quote = require('../models/Quote');

exports.sendQuote = async (req, res) => {
  try {
    const { requestId, proposed_amount, message } = req.body;

    const newQuote = new Quote({
      request: requestId,
      creator: req.user._id,
      proposed_amount,
      message
    });

    await newQuote.save();
    res.status(201).json(newQuote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getQuotesForRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const quotes = await Quote.find({ request: requestId }).populate('creator', 'fname lname profile_img');
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteQuote = async (req, res) => {
  try {
    const { quoteId } = req.params;

    const quote = await Quote.findById(quoteId);
    if (!quote) return res.status(404).json({ message: 'Quote not found' });

    if (quote.creator.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Not authorized to delete this quote' });
    }

    await quote.remove();
    res.json({ message: 'Quote deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};