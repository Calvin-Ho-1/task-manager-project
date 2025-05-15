const express = require("express");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const responseFormatter = require("./middleware/responseFormatter.js");
const tasksRouter = require("./tasks/tasks.router.js");
const authRouter = require("./auth/auth.router.js");
const userRouter = require("./user/user.router.js");
const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");

const app = express();
const port = 3001;

app.use(express.json());

app.use(cors());


let accessLogStream = fs.createWriteStream(
  path.join(__dirname, "..", "access.log"), 
  {
  flags: "a",
}
);

app.use(morgan("combined", { stream: accessLogStream}));
app.use(responseFormatter);

//define routes
app.use("/", tasksRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use(responseFormatter);

app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json(null);
})

async function bootstrap(){
  try {
    await mongoose.connect("mongodb+srv://calvin:C0mpl3xPass000!@taskmanagernodejs.kuc18dc.mongodb.net/", 
      {dbName: "fullstackTasks" }
    );
    console.log("Connected To MongoDB");
    app.listen(port, ()=>{
      console.log(`App listening on port no: ${port}`)
    });
  }
  catch(error){
    console.log(error);
    process.exit(1);
  }
}

bootstrap();

