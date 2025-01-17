import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/utils";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // generateToken(newUser._id, res);
      await newUser.save();
      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } else {
      res.status(400).json({ message: "Failed to create user" });
    }
  } catch (e) {
    console.log("Error in signup controller: ", e.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);
    res.status(200).json({ message: "User logged in successfully" });
  } catch (e) {
    console.log("Error in login controller: ", e.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (e) {
    console.log("Error in logout controller: ", e.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please provide an image" });
  }

  try {
    // Extract the file buffer and name
    const { buffer, originalname, mimetype } = req.file;

    // Prepare the file for uploadThing
    const formData = new FormData();
    formData.append("image", buffer, originalname);

    // Upload the image to uploadThing
    const response = await fetch(
      `${process.env.UPLOADTHING_BASE_URL}/api/uploadthing/imageUploader`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.UPLOADTHING_TOKEN}`, // Use your token
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`UploadThing API error: ${response.statusText}`);
    }

    const { fileUrl } = await response.json();
    if (!fileUrl) {
      throw new Error("File URL not received from uploadThing");
    }

    // Update the user's profile picture
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { profilePic: fileUrl },
      { new: true }
    );

    return res.status(200).json({
      message: "Profile picture updated successfully",
      user: updatedUser,
    });
  } catch (e) {
    console.log("Error in updateProfile controller: ", e.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (e) {
    console.log("Error in checkAuth controller: ", e.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
