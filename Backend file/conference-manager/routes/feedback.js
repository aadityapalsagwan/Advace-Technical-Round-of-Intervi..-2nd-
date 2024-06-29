const express = require('express');
const router = express.Router();
const Conference = require('../models/Conference');

// Submit Feedback

router.get('/', (req, res) => {
    res.send('Run Feedback!')
});



router.post('/:id/feedback', async (req, res) => {
    try {
      const conference = await Conference.findById(req.params.id);
      if (!conference) {
        return res.status(404).json({ msg: 'Conference not found' });
      }
      const { userId, comment } = req.body;
      // Assuming conference has a registrations field which is an array of objects
      conference.registrations = conference.registrations || [];
      conference.registrations.push({ userId, comment });
      await conference.save();
      res.json(conference);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
