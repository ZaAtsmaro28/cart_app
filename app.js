require("dotenv").config();
const express = require("express");
const app = express();
const cartRoutes = require("./routes/cartRoutes");

app.use(express.json());
app.use("/cart", cartRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
