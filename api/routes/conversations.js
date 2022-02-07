const express = require("express");
const router = express.Router();
const Conversation = require("../models/Conversation");
const CryptoJS = require("crypto-js");
// Create new conversation
router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
    lastMessage: "",
    messageCounterMember1: req.body.messageCounterMember1,
    messageCounterMember2: req.body.messageCounterMember2,
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all conversations related to user
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    }).sort({ updatedAt: -1 });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update last message
router.put("/:conversationId", async (req, res) => {
  if (req.body.lastMessage) {
    try {
      const textEncrypted = CryptoJS.AES.encrypt(
        req.body.lastMessage,
        process.env.SECRET_KEY
      ).toString();
      const conversation = await Conversation.findByIdAndUpdate(
        req.params.conversationId,
        {
          $set: { updatedAt: new Date(), lastMessage: textEncrypted },
        }
      );
      res.status(200).json(`conversation last message updated`);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else if (req.body.messageCounterMember1) {
    try {
      const conversation = await Conversation.findByIdAndUpdate(
        req.params.conversationId,
        {
          $set: { messageCounterMember1: req.body.messageCounterMember1 },
        }
      );
      res.status(200).json(`conversation messageCounterMember1 updated`);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else if (req.body.messageCounterMember2) {
    try {
      const conversation = await Conversation.findByIdAndUpdate(
        req.params.conversationId,
        {
          $set: { messageCounterMember2: req.body.messageCounterMember2 },
        }
      );
      res.status(200).json(`conversation messageCounterMember2 updated`);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
});
module.exports = router;
