const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  members: {
    type: Array,
  },
  lastMessage: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  messageCounterMember1: {
    type: Number,
  },
  messageCounterMember2: {
    type: Number,
  },
});
conversationSchema.index({ updatedAt: -1 });
const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
