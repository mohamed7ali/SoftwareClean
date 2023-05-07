// ================INITIALIZE EXPRESS APP==================
const express = require("express");
const app = express();

// ==================GLOBAL MIDLLEWARE=====================
const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Allow http request local hosts
const cors = require("cors");
app.use(cors());
app.use(express.static("upload"));

// ==================REQUIRED MODULE=======================
const examQuestions = require("./routes/examQuestions");
const user = require("./routes/users");
const admin = require("./routes/admins");
const history = require("./routes/histories");
const userQueue = require("./routes/usersQueue");
const authentication = require("./routes/authentication");
const contactUs = require("./routes/contactUs");

// ================== LOCAL MIDDLEWARE =====================
const checkUserStatus = require("./middleware/checkStatus");
const checkContactMessage = require("./middleware/checkContactMessage");

// ==================API ROUTES [ENDPOINTS]=================
app.use("/admins", admin);
app.use("/quizzes",  examQuestions);
app.use("/users", user);
app.use("/newUsers", checkUserStatus, userQueue);
app.use("/histories", history);
app.use("/auth", authentication);
app.use("/contactUs", checkContactMessage, contactUs);

// ====================== RUN THE APP =======================
app.listen(4000, "localhost", () => {
  console.log("listening on http://localhost:4000");
});
