import User from "../models/User.js";

const registerUser = async (email, password) => {
  try {
    let user = await User.findOne({ email });

    if (user) {
      throw new Error("409");
    }

    user = new User({ email, password });
    await user.save();
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const userService = {
  registerUser,
};

export default userService;
