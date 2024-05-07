import express from "express";
import errorMiddleware from "./middlewares/error.middleware.js";
import { ApolloServer } from 'apollo-server-express';
import resolvers from "./controllers/user.controler.js";
import typeDefs from "./graphql/schema.js";
import { authenticate } from "./middlewares/auth.middleware.js";
import cookieParser from 'cookie-parser';

const app = express();


app.use(express.json());
app.use(cookieParser());

app.use(authenticate);

const server = new ApolloServer({
    typeDefs: [typeDefs],
    resolvers: [resolvers],
    context: ({ req, res }) => ({ req, res, user: req.user })
});

async function startApolloServer() {
    await server.start();
    server.applyMiddleware({ app });
}

startApolloServer()
    .catch(error => console.log('Error starting Apollo Server:', error));

/**
 * dummy route
 */
app.get('/', (req, res) => {
    res.send('Welcome Application!')
})

/**
 * route not found show this message
 */
app.get('*', (req, res) => {
    res.send('oops page not found!')
})

app.use(errorMiddleware);
export {
    app,
    server
};