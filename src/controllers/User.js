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
    await userService.loginUser(email, password).then((user) => {
      // return token in a httpOnly cookie along with user details
      res.cookie("token", user.token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.status(200).json({
        email: user.email,
        name: user.name,
        age: user.age,
        country: user.country,
        role: "user",
      });
    });
  } catch (error) {
    if (error.message === "401") {
      res.status(401).send("Invalid credentials");
    } else res.status(500).send(`Error in login user: ${error}`);
  }
};

const registerPersonalInformation = async (req, res) => {
  try {
    const { email } = req.user;
    const { name, age, country } = req.body;
    if (!name || !age || !country) {
      return res.status(400).send("All fields are required");
    }
    await userService.registerPersonalInformation(email, name, age, country);
    res.status(201).send("Personal information saved successfully");
  } catch (error) {
    if (error.message === "404") {
      res.status(404).send("User not found");
    } else
      res
        .status(500)
        .send(`Error in saving user personal information: ${error}`);
  }
};

const registerCareerInformation = async (req, res) => {
  try {
    const { email } = req.user;
    const { education, experience, seniority, profession } = req.body;
    const cv = req.file.buffer;
    if (!education || !experience || !seniority || !profession || !cv) {
      return res.status(400).send("All fields are required");
    }

    await userService.registerCareerInformation(
      email,
      education,
      experience,
      seniority,
      profession,
      cv
    );
    res.status(201).send("Career information saved successfully");
  } catch (error) {
    if (error.message === "404") {
      res.status(404).send("User not found");
    } else
      res.status(500).send(`Error in saving user career information: ${error}`);
  }
};

const userController = {
  registerUser,
  loginUser,
  registerPersonalInformation,
  registerCareerInformation,
};

export default userController;
