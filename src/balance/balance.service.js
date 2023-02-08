const BaseRepository = require('../common/helper/BaseRepository');
const { balance } = require('../database/models');

class BalanceService extends BaseRepository {}

module.exports = new BalanceService(balance);
