import express from 'express';
import bodyParser from 'body-parser';
import router from './Routes/Routes.js';

const app = express();
app.use(bodyParser.json());

app.use('/api', router);
const PORT = 4010;
app.listen(PORT, () => console.log(`Started server hallBooking on port ${PORT}`));