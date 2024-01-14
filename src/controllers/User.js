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
    console.log("the error", error.message);
    if (error.message === "409") {
      res.status(409).send("User already exists");
    } else res.status(500).send(`Error in saving user: ${error}`);
  }
};

const userController = {
  registerUser,
};

export default userController;
