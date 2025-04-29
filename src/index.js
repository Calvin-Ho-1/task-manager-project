const express = require("express");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const responseFormatter =  require("./middleware/responseFormatter.js");
const {StatusCodes} = require("http-status-codes");
const cors = require("cors");
const tasksRouter = require("./tasks/tasks.router.js");


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

app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json(null);
})

app.listen(port, ()=>{
  console.log(`App listening on port no: ${port}`)
});
