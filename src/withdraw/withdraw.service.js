const BaseRepository = require('../common/helper/BaseRepository');
const { withdraw } = require('../database/models');

class WithdrawService extends BaseRepository {}

module.exports = new WithdrawService(withdraw);
