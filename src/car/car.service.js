const BaseRepository = require('../common/helper/BaseRepository');
const { car } = require('../database/models');

class CarService extends BaseRepository {}

module.exports = new CarService(car);
