import {app,server} from './app.js';
import { dbConnection } from './config/dbConnection.js';
import {config} from 'dotenv';
config();

const PORT = process.env.PORT || 5000;


dbConnection()
.then(() => {
        app.listen(PORT, () => {
            console.log(`Server ready at http://localhost:8000${server.graphqlPath}`);
        })
})
.catch((error) => {
    console.log('MONGODB CONNECTION FAILED !!!', error);
})