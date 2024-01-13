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
    console.log(error);
    res.status(500).send("Error in saving");
  }
};

const userController = {
  registerUser,
};

export default userController;
