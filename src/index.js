const express = require("express");
const User = require("./routes/user");
const Post = require("./routes/post");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schemas/user.schema");


const app = express();
app.use(express.json());

app.use('/api/user', User);
app.use('/api/post', Post);

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.use('/help', async (req, res, next) => {
    console.log('middleware for help route!')
    next()
})

app.get('/help', (req, res) => {
    console.log(res.headersSent);
    // res.status(302)
    // res.setHeader('Content_Type', 'application/json')
    // res.set({
    //     'Content_Type': 'application/json',
    //     "From": "Here"
    // })
    res.send({name:"Karenasdasfasf"});
    console.log(res.headersSent);
})

app.get('/temp', [
    (req, res, next) => {
        console.log('aaaaaaaaaaaa');
        next()
    },
    (req, res) => {
        console.log('gggggggggggggggg')
        res.send('AAAAAAAA')
    }
])


app.listen(3000, () => {
    console.log('Server is running on the port 3000');
})