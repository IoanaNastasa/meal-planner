const express = require('express');
const mongooes = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();

// setup server
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));
// connect to mongoDB
mongooes.connect(process.env.MDB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected.')).catch(err => console.error(err));
// require('./models/userModel');
// set up routes
app.use('/auth', require('./routers/userRouter'));
app.use('/recipe', require('./routers/recipeRouter'));
app.use('/day', require('./routers/dayRouter'));
app.use('/ingredient', require('./routers/ingredientRouter'));
app.use('/unit', require('./routers/unitRouter'));
