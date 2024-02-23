const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send("User logged out successfully");
  } catch (error) {
    res.status(500).send(`Error in logout User: ${error}`);
  }
};

const UserController = {
  logoutUser,
};

export default UserController;
