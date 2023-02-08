const BaseRepository = require('../common/helper/BaseRepository');
const { deposit } = require('../database/models');

class DepositService extends BaseRepository {}

module.exports = new DepositService(deposit);
