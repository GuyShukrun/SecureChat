const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const CryptoJS = require("crypto-js");
const authToken = require("./verifyToken");

// Create a new message, relating to existing conversation
router.post("/", authToken, async (req, res) => {
  // First encrypt the message using AES encryption
  const textEncrypted = CryptoJS.AES.encrypt(
    req.body.text,
    process.env.SECRET_KEY
  ).toString();
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    sender: req.body.sender,
    text: textEncrypted,
  });
  try {
    const savedMessage = await newMessage.save();

    // After saving the encrypted message, we have to decrypt it because we are sending it back to the client
    const bytes = CryptoJS.AES.decrypt(
      savedMessage.text,
      process.env.SECRET_KEY
    );
    savedMessage.text = bytes.toString(CryptoJS.enc.Utf8);
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all messages within a conversation

router.get("/:conversationId", authToken, async (req, res) => {
  try {
    let messages = await Message.find({
      conversationId: req.params.conversationId,
    });

    // Now we have messages array, we need to decrypt text
    messages = messages.map((m) => {
      const bytes = CryptoJS.AES.decrypt(m.text, process.env.SECRET_KEY);
      m.text = bytes.toString(CryptoJS.enc.Utf8);
      return m;
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get last message within a conversation for displaying in chat converasations page
router.get("/lastMessage/:conversationId", authToken, async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });

    // Decrypt last message
    const lastMessage = messages[messages.length - 1];
    const bytes = CryptoJS.AES.decrypt(
      lastMessage.text,
      process.env.SECRET_KEY
    );
    lastMessage.text = bytes.toString(CryptoJS.enc.Utf8);

    res.status(200).json(lastMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
