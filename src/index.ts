import express from 'express';
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan=require('morgan')
import 'dotenv/config.js';
import router from './Routes/UserRoutes';

const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
app.use("/",router)

app.listen(process.env.PORT, () => {
  console.log('Server listening at ' + process.env.PORT);
});


  
export default app;