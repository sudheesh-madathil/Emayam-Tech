const userRegister = require("../model/Schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Secret key for JWT (store this in a .env file in production)
const JWT_SECRET = "your_jwt_secret_key";

exports.post = async (req, res) => {
  const { username, email, password,role } = req.body;
  console.log(req.body, "req.body");

  try {
    // Hash the user's password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const user = new userRegister({
      username,
      email,
      password: hashedPassword,
      role
    });

    // Save the user to the database
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h", // Token will expire in 1 hour
    });

    // Respond with a success message and the token
    res.status(201).json({ message: "User registered successfully", token,user});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// find by id 
exports.get = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userRegister.findById(id);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ message: "successfully get user",user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await userRegister.find(); 

    // Check if there are no users found
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Return users in response
    res.status(200).json({ message: "Successfully retrieved users",users });
  } catch (error) {
    // Return error if any
    res.status(500).json({ message: error.message });
  }
};
//delete
exports.delete = async (req, res) => {
  const { id } = req.params;
  console.log(id,"request");

  try {
    const deleteuser = await userRegister.findByIdAndDelete(id);

    if (!deleteuser) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};