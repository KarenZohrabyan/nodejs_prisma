const express = require("express");
const User = require("./routes/user");
const Post = require("./routes/post")

const app = express();
app.use(express.json());

app.use('/api/user', User);
app.use('/api/post', Post);


app.listen(3000, () => {
    console.log('Server is running on the port 3000');
})