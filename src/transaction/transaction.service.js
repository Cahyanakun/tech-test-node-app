const BaseRepository = require('../common/helper/BaseRepository');
const { transaction } = require('../database/models');

class TransactionService extends BaseRepository {
  async findAllByUser(options, user) {
    const data = await this.findAll({
      where: {
        ...options.where,
        userId: user,
      },
      ...options,
      include: ['car', 'leasing'],
    });
    return data;
  }
}

module.exports = new TransactionService(transaction);
