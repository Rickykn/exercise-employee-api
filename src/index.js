const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("Request masuk");
  next();
  // return res.send("middleware")
});
app.use((req, res, next) => {
  console.log("Middleware 2");
  next();
});

const PORT = 2000;

const { employeeRoutes, authRoutes } = require("./routes");

app.use("/employees", employeeRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log("Listening in port", PORT);
});
