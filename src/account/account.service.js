const httpStatus = require('http-status');
const BaseRepository = require('../common/helper/BaseRepository');
const { account } = require('../database/models');
const { Op } = require('../database/models').Sequelize;
const ApiError = require('../common/helper/ApiError');

class AccountService extends BaseRepository {
  async _findOneWithProfile(isAdmin, options) {
    return this.findOne({
      ...options,
      include: {
        association: isAdmin ? 'admin' : 'user',
      },
    });
  }

  async findByEmailWithProfile(emailOrPhoneNum, isAdmin) {
    return this._findOneWithProfile(isAdmin, {
      where: {
        [Op.or]: {
          email: emailOrPhoneNum,
          phoneNumber: emailOrPhoneNum,
        },
        isAdmin,
      },
    });
  }

  async findByPhoneNum(phoneNumber, newPhoneNumber) {
    return super.findOne({
      where: {
        [Op.not]: {
          phoneNumber,
        },
        phoneNumber: newPhoneNumber,
      },
    });
  }

  async findByEmailOrPhoneNum(email, phoneNumber) {
    return super.findOne({
      where: {
        [Op.or]: {
          email,
          phoneNumber,
        },
      },
    });
  }

  async findByIdWithProfile(id, isAdmin) {
    return this._findOneWithProfile(isAdmin, {
      where: { id, isAdmin },
    });
  }

  async findByEmail(email) {
    return this.findOne({
      where: {
        email,
      },
    });
  }

  async createWithUser(data, user) {
    const isDuplicate = await super.findOne({ where: { email: data.email } });
    if (isDuplicate) throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists!');
    return this.create(
      {
        ...data,
        user,
      },
      { include: 'user' }
    );
  }

  async updateWithUser(data, body) {
    const { email, password, phoneNumber } = body;
    delete body.email;
    const accountData = await super.findOne({ where: { email } });
    if (accountData) {
      if (accountData.id !== data.account.id)
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists!');
    }

    await this.update(data.account.id, { email, password, phoneNumber });
    return data.update(body);
  }

  async createWithAdmin(data, admin) {
    const isDuplicate = await super.findOne({ where: { email: data.email } });
    if (isDuplicate) throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists!');

    return this.create(
      {
        ...data,
        isAdmin: true,
        admin,
      },
      { include: 'admin' }
    );
  }

  async updateWithAdmin(data, body) {
    const { email, password, phoneNumber } = body;
    delete body.email;
    const accountData = await super.findOne({ where: { email } });
    if (accountData) {
      if (accountData.id !== data.account.id)
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists!');
    }

    await this.update(data.account.id, { email, password, phoneNumber });
    return data.update(body);
  }
}

module.exports = new AccountService(account);
