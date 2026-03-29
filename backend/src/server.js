const express      = require('express');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRouter');
const patientRouter = require('./routes/patientRouter');
const patientCaregiverRouters = require('./routes/patientCaregiverRouters');
const caregiverRouters = require('./routes/caregiverRouter');
const taskTypeRouter = require('./routes/taskTypeRouter');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',  authRoutes);
app.use('/api/patient', patientRouter);
app.use('/api/patient-caregiver', patientCaregiverRouters);
app.use('/api/caregiver', caregiverRouters);
app.use('/api/task-type', taskTypeRouter);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

//node src/server.js