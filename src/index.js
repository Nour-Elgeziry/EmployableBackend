import server from "./server.js";

import "./config/db.js";

const PORT = process.env.PORT || 8080;

const startServer = () => {
  server.listen(PORT, () => console.log("Server started on port 8080"));
};

startServer();
