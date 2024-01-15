import userService from "../services/User.js";

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("All fields are required");
    }

    await userService.registerUser(email, password);
    res.status(201).send("User registered successfully");
  } catch (error) {
    if (error.message === "409") {
      res.status(409).send("User already exists");
    } else res.status(500).send(`Error in saving user: ${error}`);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    await userService.loginUser(email, password);
    res.status(200).send("User logged in successfully");
  } catch (error) {
    if (error.message === "401") {
      res.status(401).send("Invalid credentials");
    } else res.status(500).send(`Error in login user: ${error}`);
  }
};

const userController = {
  registerUser,
  loginUser,
};

export default userController;
