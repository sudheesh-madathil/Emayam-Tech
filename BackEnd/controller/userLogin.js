const User = require("../model/Schema");
const bcrypt = require("bcrypt"); // Import bcrypt
const jwt = require("jsonwebtoken"); // Import jsonwebtoken
const JWT_SECRET = "your_jwt_secret_key";
exports.post = async (req, res) => {
  try {
    const { username, password } = req.body; // Destructure username and password from req.body
    console.log(req.body, "body");

    // Check if both username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
   JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send the response with token and user data
    res.json({ token,user,message:"sussessfull" });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: "Server error" });
  }
};
