// HTTP SERVER
import express from 'express';
import cors from 'cors';
// Config
import server from './graphql/index'
import config from './config';
//import db from './models'
const db = require('./models');
//console.log(db)
const app = express();


function setPort(port = 5000) {
 app.set('port', parseInt(port, 10)); 
}

function listen() {
 const port = app.get('port') || config.port;
 app.listen(port, () => {
   console.log(`The server is running and listening at http://localhost:${port}`);
 });
}

app.use(cors({
 origin: '*', // Be sure to switch to your production domain
 optionsSuccessStatus: 200
}));

// Endpoint to check if the API is running
app.get('/api/status', (req, res) => {
 res.send({ status: 'ok' });
});

// Apollo Middleware Added
server.applyMiddleware({ app });

db.sequelize.sync().then(() => {
  // populate author table with dummy data
  // db.author.bulkCreate(
  //   times(10, () => ({
  //     firstName: faker.name.firstName(),
  //     lastName: faker.name.lastName()
  //   }))
  // );
  // // populate post table with dummy data
  // db.post.bulkCreate(
  //   times(10, () => ({
  //     title: faker.lorem.sentence(),
  //     content: faker.lorem.paragraph(),
  //     authorId: random(1, 10)
  //   }))
});


export default {
 getApp: () => app,
 setPort,
 listen
};