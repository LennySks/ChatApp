import { Message } from "../models/message.model";
import { User } from "../models/user.model";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const senderId = req.user._id;

    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: id },
        { sender: id, receiver: senderId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      imageUrl = image[0].path;
    }

    const newMessage = new Message({
      sender: senderId,
      receiver: id,
      text,
      image: imageUrl,
    });
    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
