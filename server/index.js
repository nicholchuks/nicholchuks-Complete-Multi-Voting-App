const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
require("dotenv").config();
const upload = require("express-fileupload");

const Routes = require("./routes/Routes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: ["http://localhost:3000"] }));
app.use(upload());

app.use("/api", Routes);

app.use(notFound);
app.use(errorHandler);

connect(process.env.MONGO_URI)
  .then(
    app.listen(process.env.PORT, () =>
      console.log(`server started on port ${process.env.PORT}`)
    )
  )
  .catch((err) => console.log(err));

// uhj5JenlnDVBp00f
