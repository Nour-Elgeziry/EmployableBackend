import server from "./server.js";

import "./config/db.js";

const PORT = process.env.PORT || 3000;

const startServer = () => {
  server.listen(PORT, () => console.log("Server started on port 3000"));
};

startServer();
