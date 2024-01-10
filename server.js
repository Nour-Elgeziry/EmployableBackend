import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello HireMe user! This is the backend server");
});

app.listen(3000, () => console.log("Server started on port 3000"));
