// data.js

export const rooms = [
  {
    roomId: "R1",
    seatsAvailable: "4",
    amenities: "tv,ac,heater",
    pricePerhr: "100",
  },
];

export const bookings = [
  {
    customer: "Selva",
    bookingDate: "20230612",
    startTime: "12:00pm",
    endTime: "11:59am",
    bookingID: "B1",
    roomId: "R1",
    status: "booked",
    booked_On: "3/7/2023",
  },
];

export const customers = [
  {
    name: "Selva",
    bookings: [
      {
        customer: "Selva",
        bookingDate: "20230612",
        startTime: "12:00pm",
        endTime: "11:59am",
        bookingID: "B1",
        roomId: "R1",
        status: "booked",
        booked_On: "3/7/2023",
      },
    ],
  },
];