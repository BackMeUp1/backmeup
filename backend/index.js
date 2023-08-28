
const express = require("express");
const cors = require("cors")
const app = express();
const PORT = 4000;
const users =require("./routes/users")
const project =require("./routes/projects")

app.use(express.json())
app.use(cors())    
app.use("/api/users",users)
app.use("/api/project",project)

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});