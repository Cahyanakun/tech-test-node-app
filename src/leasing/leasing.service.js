const BaseRepository = require('../common/helper/BaseRepository');
const { car } = require('../database/models');

class carService extends BaseRepository {}

module.exports = new carService(car);
