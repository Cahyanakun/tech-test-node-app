const BaseRepository = require('../common/helper/BaseRepository');
const db = require('../database/models');
const { Op } = require('../database/models').Sequelize;
const { user } = require('../database/models');

class UserService extends BaseRepository {
  constructor(model) {
    super(model);
    this.rawQuery = {
      balance: `COALESCE((SELECT SUM(CASE WHEN "balances"."ref_type" in ('deposit', 'withdraw','transfer') AND "balances"."user_id" = "user"."id" THEN "balances"."amount" ELSE 0 END) from "balances"), 0)`,
    };
    this.fields = {
      balance: 'balance',
    };
    this.attributes = [
      'id',
      'fullName',
      'address',
      'bod',
      [db.Sequelize.literal(this.rawQuery.balance), 'balance'],
    ];
  }

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

  async findWitBalance(id) {
    return this.findOne({
      attributes: this.attributes,
      where: { id },
      include: 'account',
    });
  }
}

module.exports = new UserService(user);
