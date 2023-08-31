
const express = require("express");
const cors = require("cors")
const app = express();
const PORT = 4000;
const cookieParser =require('cookie-parser')
const users =require("./routes/users")
const project =require("./routes/projects")
const pledges =require("./routes/pledges")

app.use(express.json())
app.use(cors())     
app.use("/api/users",users)
app.use("/api/project",project)
app.use('/api/pledges',pledges)
app.use(cookieParser())
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});