import JobSeekerService from "../services/JobSeeker.js";

const getAllJobSeekers = async (req, res) => {
  try {
    const jobSeekers = await JobSeekerService.getAllJobSeekers();
    res.status(200).json(jobSeekers);
  } catch (error) {
    res.status(500).send(`Error in getting job seekers: ${error}`);
  }
};

const signUpJobSeeker = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("All fields are required");
    }

    await JobSeekerService.signUpJobSeeker(email, password);
    res.status(201).send("JobSeeker registered successfully");
  } catch (error) {
    if (error.message === "409") {
      res.status(409).send("Job seeker already exists");
    } else res.status(500).send(`Error in saving job seeker: ${error}`);
  }
};

const signInJobSeeker = async (req, res) => {
  try {
    const { email, password } = req.body;
    await JobSeekerService.signInJobSeeker(email, password).then((jobSeeker) => {
      // return token in a httpOnly cookie along with user details
      res.cookie("token", jobSeeker.token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.status(200).json({
        email: jobSeeker.email,
        name: jobSeeker.name,
        age: jobSeeker.age,
        country: jobSeeker.country,
        isPersonalInformationComplete: jobSeeker.isPersonalInformationComplete,
        isCareerInformationComplete: jobSeeker.isCareerInformationComplete,
        role: "jobSeeker",
      });
    });
  } catch (error) {
    if (error.message === "401") {
      res.status(401).send("Invalid credentials");
    } else res.status(500).send(`Error in login job seeker: ${error}`);
  }
};

const registerPersonalInformation = async (req, res) => {
  try {
    const { email } = req.user;
    const { name, age, country } = req.body;
    if (!name || !age || !country) {
      return res.status(400).send("All fields are required");
    }
    await JobSeekerService.registerPersonalInformation(
      email,
      name,
      age,
      country
    );
    res.status(201).send("Personal information saved successfully");
  } catch (error) {
    if (error.message === "404") {
      res.status(404).send("Job seeker not found");
    } else
      res
        .status(500)
        .send(`Error in saving job seeker personal information: ${error}`);
  }
};

const registerCareerInformation = async (req, res) => {
  try {
    const { email } = req.user;
    const { education, experience, seniority, title } = req.body;
    const cv = req.file.buffer;
    if (!education || !experience || !seniority || !title || !cv) {
      return res.status(400).send("All fields are required");
    }

    await JobSeekerService.registerCareerInformation(
      email,
      education,
      experience,
      seniority,
      title,
      cv
    );
    res.status(201).send("Career information saved successfully");
  } catch (error) {
    if (error.message === "404") {
      res.status(404).send("Job seeker not found");
    } else
      res.status(500).send(`Error in saving user career information: ${error}`);
  }
};

const JobSeekerController = {
  signUpJobSeeker,
  signInJobSeeker,
  getAllJobSeekers,
  registerPersonalInformation,
  registerCareerInformation,
};

export default JobSeekerController;
