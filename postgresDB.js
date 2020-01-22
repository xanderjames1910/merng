const Sequelize = require('sequelize');

const POSTGRESDB = new Sequelize('proyectoPetrolero', 'postgres', 'E-RpQ2we', {
  dialect: 'postgres',
  host: '34.67.217.106',
  port: '5432',
});

const DatosDiarios = POSTGRESDB.define('DATOS_DIARIOS', {
  COMPLETAMIENTO: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  FECHA: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  PD_HRS_PROD: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  PD_PETROLEO: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  PD_GAS: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  PD_AGUA: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
});

// POSTGRESDB.sync().then(() => {
//   // return DatosDiarios.create({
//   //   COMPLETAMIENTO: 'CYB-003TS',
//   //   FECHA: '2010-06-04',
//   //   PD_HRS_PROD: 24,
//   //   PD_PETROLEO: 339.027,
//   //   PD_GAS: 96,
//   //   PD_AGUA: 1138.48,
//   // });
//   return DatosDiarios;
// });

module.exports = POSTGRESDB;
