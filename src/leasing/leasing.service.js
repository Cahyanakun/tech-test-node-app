const BaseRepository = require('../common/helper/BaseRepository');
const { leasing } = require('../database/models');

class LeasingService extends BaseRepository {}

module.exports = new LeasingService(leasing);
