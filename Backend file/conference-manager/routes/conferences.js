const express = require('express');
const router = express.Router();
const Conference = require('../models/Conference');
const User = require('../models/users');

// POST /api/conferences - Create a new conference
router.post('/', async (req, res) => {
  try {
    const { title, date, description, attendees, feedback } = req.body;

    // Validate required fields
    if (!title || !date || !description) {
      return res.status(400).json({ error: "Please provide title, date, and description for the conference." });
    }

    // Create new conference object
    const newConference = new Conference({
      title,
      date: new Date(date),
      description,
      attendees: attendees || [],
      feedback: feedback || []
    });

    // Save conference to database
    const savedConference = await newConference.save();

    // Respond with saved conference object
    res.status(201).json(savedConference);
  } catch (err) {
    // Handle server errors
    console.error("Error creating conference:", err);
    res.status(500).json({ error: "Failed to create conference. Please try again later." });
  }
});

// POST /api/conferences/:id/register - Register a user for a conference
router.post('/:id/register', async (req, res) => {
    try {
      const conferenceId = req.params.id;
      const userId = req.body.userId;
  
      // Find conference by ID
      const conference = await Conference.findById(conferenceId);
  
      // Find user by ID
      const user = await User.findById(userId);
  
      // Check if conference and user exist
      if (!conference || !user) {
        return res.status(404).json({ error: 'Conference or User not found' });
      }
  
      // Check if user is already registered for the conference
      if (conference.attendees.includes(userId)) {
        return res.status(400).json({ error: 'User is already registered for this conference' });
      }
  
      // Add user to conference attendees
      conference.attendees.push(userId);
      await conference.save();
  
      // Respond with updated conference object
      res.json(conference);
    } catch (err) {
      // Handle server errors
      console.error("Error registering for conference:", err);
      res.status(500).json({ error: "Failed to register for conference. Please try again later." });
    }
  });



// get all the data  
router.get('/', async (req, res) => {
    try {
      const conferences = await Conference.find().populate('attendees', 'name email').populate('feedback.userId', 'name');
      res.json(conferences);
    } catch (err) {
      console.error("Error fetching conferences:", err);
      res.status(500).json({ error: "Failed to fetch conferences. Please try again later." });
    }
  });

/// feedback 
  router.post('/:id/feedback', async (req, res) => {
    try {
        const conference = await Conference.findById(req.params.id);
        if (!conference) {
            return res.status(404).json({ msg: 'Conference not found' });
        }
        
        const { userId, comment } = req.body;
        conference.feedback = conference.feedback || [];
        conference.feedback.push({ userId, comment });

        await conference.save();
        res.json(conference);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
