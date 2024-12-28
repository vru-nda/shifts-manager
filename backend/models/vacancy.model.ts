import {DataTypes} from 'sequelize';
import sequelize from '../config/database';

const Vacancy = sequelize.define('vacancy', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [1, 100],
    },
  },
  description: {
    type: DataTypes.STRING(500),
    allowNull: true,
    validate: {
      len: [0, 500],
    },
  },
});

export default Vacancy;
