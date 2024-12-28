import {DataTypes} from 'sequelize';
import sequelize from '../config/database';

const Shift = sequelize.define('shift', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
    validate: {
      isAfterStart(value) {
        if (value <= this.startTime) {
          throw new Error('End time must be after start time');
        }
      },
    },
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  type: {
    type: DataTypes.ENUM('Consultation', 'Telephone', 'Ambulance'),
    allowNull: false,
  },
});

export default Shift;
