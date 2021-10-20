const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');

// routers
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const salesRouter = require('./routes/sales');
const itemsRouter = require('./routes/items');

dotenv.config();

const port = process.env.PORT || 8000;
const app = express();

mongoose.connect(
    process.env.DB_CONNECT_LOCAL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    () => {
        console.log('connected to db!');
    }
);

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/sales', salesRouter);
app.use('/api/items', itemsRouter);

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.listen(port, () => console.log(`App is listening to PORT ${port}`));
