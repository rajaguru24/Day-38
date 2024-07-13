 // routes/routes.js

 import express from 'express';
 import { bookRoom, createRoom, getCustomerName, getCustomers, getRooms, viewRooms } from '../Controllers/RoomController.js';
 
 const router = express.Router();
 
 router.get('/rooms',getRooms);   //get all rooms
 router.post('/create',createRoom); // create new room
 router.post('/booking/create/:id',bookRoom); // book a room
 router.get('/loadbookings',viewRooms);  // get all bookings 
 router.get('/customers',getCustomers); //get all customers
 router.get('/customer/:name',getCustomerName); // list details of a customer with name
 
 
 export default router;