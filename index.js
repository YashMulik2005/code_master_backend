const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();
const courseRoute = require("./routes/Course");
const userRoute = require("./routes/User");
const practiceRoute = require("./routes/Practice");
const certifyRoute = require("./routes/Certify");
const discussRoute = require("./routes/Discuss");

// app.use(cors());
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://mastercode.netlify.app",
    methods: ["POST", "GET"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(cookieParser());

mongoose.set("strictQuery", false);
var db =
  "mongodb+srv://yashmulik95:RbzhKy87YXa3L59T@cluster0.zijivgh.mongodb.net/code_master?retryWrites=true&w=majority";

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/course", courseRoute);
app.use("/user", userRoute);
app.use("/practice", practiceRoute);
app.use("/certify", certifyRoute);
app.use("/discuss", discussRoute);

app.listen(3000, () => {
  console.log("server is running");
});
