import express from "express";
import userRouter from './routes/user.route.js';
import errorMiddleware from "./middlewares/error.middleware.js";
import { ApolloServer, gql } from 'apollo-server-express';
import resolvers from "./controllers/user.controler.js";
import typeDefs from "./graphql/schema.js"; 

const app = express();


app.use(express.json());

app.use('/api/v1/user', userRouter)

const server = new ApolloServer({ typeDefs, resolvers });

async function startApolloServer() {
    await server.start();
    server.applyMiddleware({ app });
}

startApolloServer().catch(error => console.log('Error starting Apollo Server:', error));

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