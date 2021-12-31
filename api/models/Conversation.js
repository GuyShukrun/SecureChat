const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);
// conversationSchema.index({ createdAt: -1 });
const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
