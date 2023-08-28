const pledgeModel = require('../model/pledges');

// Create a new pledge
exports.createPledge = async (req, res) => {
  try {
    const { amount } = req.body;
    const newPledgeId = await pledgeModel.createPledge(amount);
    res.json({ id: newPledgeId, message: 'Pledge created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

// Get all pledges
exports.getAllPledges = async (req, res) => {
  try {
    const pledges = await pledgeModel.getAllPledges();
    res.json(pledges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};




