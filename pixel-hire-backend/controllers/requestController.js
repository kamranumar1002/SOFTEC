const Request = require('../models/Request');

exports.createRequest = async (req, res) => {
  try {
    const { event_type, description, location, budget, event_date } = req.body;

    const newRequest = new Request({
      client: req.user._id,
      event_type,
      description,
      location,
      budget,
      event_date
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllOpenRequests = async (req, res) => {
  try {
    const requests = await Request.find({ status: 'open' }).populate('client', 'fname lname profile_img');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const request = await Request.findById(requestId);
    if (!request) return res.status(404).json({ message: 'Request not found' });

    // Ensure both values are strings before comparing
    if (request.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this request' });
    }

    await request.remove();
    res.json({ message: 'Request deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRequestsByCreator = async (req, res) => {
  try {
    const { creatorId } = req.params;
    const requests = await Request.find({ creator: creatorId });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};