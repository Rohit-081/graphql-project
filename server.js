const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const axios = require('axios');

const app = express();

/*
ID
String
Int
Float
Boolean
List - []
*/

let  message = "This is a message"

const schema = buildSchema(`

    type Post {
        userId: Int
        id: Int
        title: String
        body: String
    }

    type User {
        name: String
        age: Int
        college: String
    }

    type Query{
        hello : String!
        welcomeMessage(name: String, dayOfWeek: String): String
        getUser : User
        getUsers : [User]
        getPostsFromExternalAPI: [Post]
        message: String
    }

    input UserInput {
        name: String!
        age: Int!
        college: String!
    }

    type Mutation {
        setMessage(newMessage: String): String 
        createUser(user: UserInput ): User
    }
`);



const root = {
    hello: () => {
        return "Hello World!"
    },
    welcomeMessage: (args) => {
        console.log(args);
        return `Hey, hows life ${args.name}, how's life ${dayOfWeek}`;
    },
    getUser: () => {
        const user = {
            name: 'Truly Jain',
            age: 26,
            college: "IIT Guwahati"
        }
        return user;
    },
    getUsers: () => {
         const users = [{
            name: 'Truly Jain',
            age: 26,
            college: "IIT Guwahati"
        },{
            name: 'Raj Jain',
            age: 26,
            college: "IIT Guwahati"
        }]
        return users;
    },
    getPostsFromExternalAPI: async () => {
        const result = await axios.get('https://jsonplaceholder.typicode.com/posts/');
           return result.data;
    },
    setMessage: ({newMessage}) => {
        message = newMessage;
        return message
    },
    message: () => {
        return message;
    },
    createUser: (args) => {
        console.log(args);
        return args.user
    }
}

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: root,
}))

app.listen(4000, ()=> {
    console.log(`Server on port 4000`)
})

//http://localhost:4000/abx