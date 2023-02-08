const BaseRepository = require('../common/helper/BaseRepository');
const { transaction_payment } = require('../database/models');

class TransactionPaymentService extends BaseRepository {
  async findAllByUser(options, user) {
    const data = await this.findAll({
      where: {
        ...options.where,
        userId: user,
      },
      include: ['payment'],
      ...options,
    });
    return data;
  }
}

module.exports = new TransactionPaymentService(transaction_payment);
