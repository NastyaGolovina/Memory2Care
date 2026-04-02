const express      = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const authRoutes = require('./routes/authRouter');
const patientRouter = require('./routes/patientRouter');
const patientCaregiverRouters = require('./routes/patientCaregiverRouters');
const caregiverRouters = require('./routes/caregiverRouter');
const taskTypeRouter = require('./routes/taskTypeRouter');
const taskRouter = require('./routes/taskRouter');
const pageRouter = require('./routes/pageRouter');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));



// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     next();
// });


app.use('/api/auth',  authRoutes);
app.use('/api/patient', patientRouter);
app.use('/api/patient-caregiver', patientCaregiverRouters);
app.use('/api/caregiver', caregiverRouters);
app.use('/api/task-type', taskTypeRouter);
app.use('/api/task', taskRouter);
app.use('/api/page', pageRouter);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

//node src/server.js