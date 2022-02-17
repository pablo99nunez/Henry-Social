import express from 'express';
import 'dotenv/config.js';

const app = express();


app.listen(process.env.PORT, () => {
  console.log('Server listening at ' + process.env.PORT);
});



export default app;
