import Sequelize from 'sequelize';

import config from '../../config';

const { POSTGRES_DB, POSTGRES_DB_USER, POSTGRES_DB_PASS } = config;

const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_DB_USER, POSTGRES_DB_PASS, {
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op
});
const models = {
  User: sequelize.import('./user'),
  Team: sequelize.import('./team'),
  Message: sequelize.import('./message'),
  Channel: sequelize.import('./channel')
};

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
