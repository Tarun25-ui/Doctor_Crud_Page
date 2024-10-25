const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

let doctors = [
  { id: 0, fullName: "Parisa Tarun kumar", specilization: "Doctor", city: "Hyderabad" },
  { id: 1, fullName: "PARISA VENKATA SAMBA SIVA RAO", specilization: "NEUROSURGEN", city: "DELHI" },
  { id: 2, fullName: "PALLAPATI SAIDULU", specilization: "CARDIO", city: "MUMBAI" }
];

// Routes
app.get('/doctors', (req, res) => {
  res.json(doctors);
});

app.post('/doctors', (req, res) => {
  const newDoctor = { id: doctors.length, ...req.body };
  doctors.push(newDoctor);
  res.status(201).json(newDoctor);
});

app.put('/doctors/:id', (req, res) => {
  const { id } = req.params;
  const doctorIndex = doctors.findIndex(doc => doc.id === parseInt(id));
  if (doctorIndex > -1) {
    doctors[doctorIndex] = { id: parseInt(id), ...req.body };
    res.json(doctors[doctorIndex]);
  } else {
    res.status(404).json({ message: "Doctor not found" });
  }
});

app.delete('/doctors/:id', (req, res) => {
  const { id } = req.params;
  doctors = doctors.filter(doc => doc.id !== parseInt(id));
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

