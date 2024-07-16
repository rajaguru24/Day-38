import express from 'express';
import bodyParser from 'body-parser';
import router from './Routes/Routes.js';

const app = express();
app.use(bodyParser.json());
app.get('/',(req,res)=>
    {
       res.send("Express App is running");
    })

app.use('/', router);
const PORT = 4000;
app.listen(PORT, () => console.log(`Started server hallBooking on port ${PORT}`));