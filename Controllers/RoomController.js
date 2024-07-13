//create data

const Rooms = [
    {
      roomId: "Room1",
      roomName: "Deluxe Room",
      seatsAvailable: "4",
      amenities: "tv,ac,heater",
      pricePerhr: "400",
    },
    {
      roomId: "Room2",
      roomName: "Suite Room",
      seatsAvailable: "4",
      amenities: "tv,ac,heater",
      pricePerhr: "300",
    },
    {
      roomId: "Room3",
      roomName: "King Room",
      seatsAvailable: "4",
      amenities: "tv,ac,heater",
      pricePerhr: "250",
    },
    {
      roomId: "Room4",
      roomName: "Single Room",
      seatsAvailable: "4",
      amenities: "tv,heater",
      pricePerhr: "100",
    },
    {
      roomId: "Room5",
      roomName: "Double Room",
      seatsAvailable: "4",
      amenities: "tv,ac,heater",
      pricePerhr: "200",
    },
  ];
  
  const Bookings = [
    {
      customerName: "Geetha",
      bookingDate: "20240529",
      startTime: "12:00pm",
      endTime: "11:59am",
      bookingID: "B1",
      roomId: "Room2",
      status: "booked",
      booked_On: "25/5/2024",
    },
    {
      customerName: "Ragu",
      bookingDate: "20240602",
      startTime: "12:00pm",
      endTime: "11:59am",
      bookingID: "B2",
      roomId: "Room1",
      status: "booked",
      booked_On: "27/5/2024",
    },
    {
      customerName: "Gokul",
      bookingDate: "20240615",
      startTime: "12:00pm",
      endTime: "11:59am",
      bookingID: "B3",
      roomId: "Room1",
      status: "booked",
      booked_On: "28/5/2024",
    },
  ];
  const customers = [
    {
      name: "Geetha",
      bookings: [
        {
          customerName: "Geetha",
          bookingDate: "20240529",
          startTime: "12:00pm",
          endTime: "11:59am",
          bookingID: "B1",
          roomId: "Room2",
          status: "booked",
          booked_On: "25/5/2024",
        },
        {
          customerName: "Geetha",
          bookingDate: "20240829",
          startTime: "12:00pm",
          endTime: "11:59am",
          bookingID: "B1",
          roomId: "Room5",
          status: "booked",
          booked_On: "25/5/2024",
        },
      ],
    },
    {
      name: "Gokul",
      bookings: [
        {
          customerName: "Gokul",
          bookingDate: "20240615",
          startTime: "12:00pm",
          endTime: "11:59am",
          bookingID: "B3",
          roomId: "Room1",
          status: "booked",
          booked_On: "28/5/2024",
        },
      ],
    },
  ];
  //get method to display room
  export const getRooms = (req, res) => {
    res.status(200).json({ data: Rooms });
  };
  
  //create a room
  export const createRoom = (req, res) => {
    const { roomName, seatsAvailable, amenities, pricePerhr } = req.body;
    const newRoom = {
      roomId: "Room" + (Rooms.length + 1),
      roomName: roomName,
      seatsAvailable: seatsAvailable,
      amenities: amenities,
      pricePerhr: pricePerhr,
    };
    Rooms.push(newRoom);
    res.status(200).json({ message: "Room created successfully", data: Rooms });
  };
  
  //Booking a room
  export const bookRoom = (req, res) => {
    const bookId = req.params.id;
    const {
      customerName,
      bookingDate,
      startTime,
      endTime,
      roomId,
      status,
      booked_On,
    } = req.body;
    const isRoom = Rooms.find((ele) => ele.roomId == bookId);
    //check if room exists or not
    if (!isRoom) {
      return res
        .status(404)
        .json({ message: "Room doesn't exist", ListofRooms: Rooms });
    }
    //check the bookings under the room
    const isId = Bookings.filter((book) => book.roomId == bookId);
    console.log(isId);
    //book a room to check date which has already been booked
    if (isId.length > 0) {
      const checkDate = isId.filter((i) => {
        return i.bookingDate == bookingDate;
      });
      console.log(checkDate.length);
      if (checkDate.length == 0) {
        const newBooking = {
          customerName: customerName,
          bookingDate: bookingDate,
          startTime: startTime,
          endTime: endTime,
          bookingID: "B" + (Rooms.length + 1),
          roomId: roomId,
          status: status,
          booked_On: booked_On,
        };
        Bookings.push(newBooking);
        res.status(200).json({
          message: "Hall booked successfully",
          Added: newBooking,
          Booking: Bookings,
        });
      } else {
        res.status(404).json({
          message: "Hall has already been booked.Please choose some other hall",
          Bookings: Bookings,
        });
      }
    } else {
      const newBooking1 = {
        customerName: customerName,
        bookingDate: bookingDate,
        startTime: startTime,
        endTime: endTime,
        bookingID: "B" + (Rooms.length + 1),
        roomId: roomId,
        status: status,
        booked_On: booked_On,
      };
  
      Bookings.push(newBooking1);
      const customerInfo = customers.find(
        (c) => c.name === newBooking1.customerName
      );
      if (customerInfo) {
        customerInfo.bookings.push(newBooking1);
      } else {
        customers.push({
          name: newBooking1.customerName,
          Bookings: [newBooking1],
        });
      }
      res.status(200).json({
        message: "Hall booked successfully",
        Added: newBooking1,
        Booking: Bookings,
      });
    }
    //res.status(200).json({message:"Room Details",data:isRoom})
  };
  
  //View all rooms with booked data
  
  export const viewRooms = (req, res) => {
    const roomsBooked = Bookings.map((b) => {
      const {
        customerName,
        bookingDate,
        startTime,
        endTime,
        roomId,
        status,
        booked_On,
      } = b;
      return {
        customerName,
        bookingDate,
        startTime,
        endTime,
        roomId,
        status,
        booked_On,
      };
    });
    res.status(200).json(roomsBooked);
  };
  
  //view all customers with booked data
  export const getCustomers = (req, res) => {
    const customerBookings = customers.map((customer) => {
      const { name, bookings } = customer;
      const customerDetails = bookings.map((booking) => {
        const { roomId, bookingDate, startTime, endTime } = booking;
        return { name, roomId, bookingDate, startTime, endTime };
      });
  
      return customerDetails;
    });
  
    res.json(customerBookings);
  };
  
  //List how many times a customer has booked the room
  
  export const getCustomerName = (req, res) => {
    const name = req.params.name;
    //console.log(name);
    const customer = customers.find((customer) => customer.name == name);
    //console.log(customer);
    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    const customerBookings = customer.bookings.map((booking) => {
      const {
        customer,
        roomId,
        startTime,
        endTime,
        bookingID,
        status,
        bookingDate,
        booked_On,
      } = booking;
      return {
        customer,
        roomId,
        startTime,
        endTime,
        bookingID,
        status,
        bookingDate,
        booked_On,
      };
    });
    res.json(customerBookings);
  };