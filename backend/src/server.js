const express      = require('express');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const patientRouter = require('./routes/patientRouter');
const patientCaregiverRouters = require('./routes/patientCaregiverRouters');
const caregiverRouters = require('./routes/caregiverRouter');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',  authRoutes);
app.use('/api/patient', patientRouter);
app.use('/api/patient-caregiver', patientCaregiverRouters);
app.use('/api/caregiver', caregiverRouters);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

//node src/server.js