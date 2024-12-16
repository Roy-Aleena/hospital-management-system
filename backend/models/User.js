const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('hospital', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'patient' }, // 'doctor', 'nurse', 'IT'
});

sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.log('Error:', err));

module.exports = User;
