const BaseRepository = require('../common/helper/BaseRepository');
const { admin } = require('../database/models');

class AdminService extends BaseRepository {
  async findAll(options) {
    const whereAccount = {};

    if (options.where.email) {
      whereAccount.email = options.where.email;
      delete options.where.email;
    }

    return super.findAll({
      ...options,
      include: [{ association: 'account', where: whereAccount }],
    });
  }
}

module.exports = new AdminService(admin);
