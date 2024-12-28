import express from 'express';
import sequelize from './config/database';
import dotenv from 'dotenv';
import {internalError, notFound} from './middleware/errorMiddleware';
import Vacancy from './models/vacancy.model';
import shiftRoutes from './routes/shiftRoutes';
import Shift from './models/shift.model';

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({extended: false}));

app.use('/', shiftRoutes);

app.use(notFound);
app.use(internalError);

Vacancy.hasMany(Shift);
Shift.belongsTo(Vacancy);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .then(() => {
    app.listen(port, () => {
      return console.log(
        `Server is running in ${process.env.NODE_ENV} mode on port ${port}`,
      );
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
