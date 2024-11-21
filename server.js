import 'dotenv/config'

import express from "express";
import mongoose, { Schema } from 'mongoose';

const app = express();

// const PORT = process.env.PORT || 3333;
const { 
  PORT = 3333,
  MONGODB_URI="mongodb://127.0.0.1/c18"
} = process.env;

try {
  const conn = await mongoose.connect(MONGODB_URI);
  // console.log("connected", conn);

  // this is for errors after a connection has been established
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
} catch (error) {
  // this is for connection error
  console.log(error);
}

// functionality
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // parse application/json

// connected above
// create a schema (shape of your data)
const carSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bhp: {
    type: Number,
    required: true,
    max: 10000
  },
  avatar_url: {
    type: String,
    default: "https://static.thenounproject.com/png/449586-200.png",
  },
});
// create a model (obj that has all the methods on it. We use it to query and mutate)
const Car = mongoose.model('Car', carSchema);

// put model method calls inside route handler

app.get('/api/v1/cars/:id?', async (req, res) => {
  let query = {};
  if (req.params.id) {
    query._id = req.params.id;
  }

  // Server-side validation (express-validator)

  try {
    const cars = await Car.find(query);
    return res.status(200).json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
    // QUERY to get cars
});

app.post("/api/v1/cars", async (req, res) => {
    // Check validation
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
  
    const carData = req.body;
    console.info(carData);
    if(carData.avatar_url === '') {
      delete carData.avatar_url;
    }
    console.info(carData);
    try {
      const newCar = new Car(carData);
      const result = await newCar.save();
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
});

app.put('/api/v1/cars/:id', async (req, res) => {
    // Check validation
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    try {
      const result = await Car.updateOne({ _id: req.params.id }, req.body);
      if (result.n === 0) return res.sendStatus(404);
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
});

app.delete('/api/v1/cars/:id', async (req, res) => {
  try {
    const result = await Car.deleteOne({ _id: req.params.id });
    if (result.n === 0) return res.sendStatus(404);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
})


app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`); //log a message when it is listening
});
