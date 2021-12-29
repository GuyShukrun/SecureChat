const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// Create a new message, relating to existing conversation
router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all messages within a conversation

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(err);
  }
});

// Get last message within a conversation for displaying in chat converasations page
router.get("/lastMessage/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages[messages.length - 1]);
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
