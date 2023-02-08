const { addPageMetadata } = require('./pagination');

class BaseRepository {
  constructor(model) {
    if (this.constructor === BaseRepository) {
      throw new Error("Can't instantiate abstract class!");
    }
    this.model = model;
  }

  async findById(id) {
    return this.model.findOne({ where: { id } });
  }

  async findOne(options) {
    return this.model.findOne({ ...options });
  }

  async findAll(options) {
    return this.model
      .findAndCountAll({ ...options })
      .then((data) => addPageMetadata(data, options));
  }

  async findAllWithoutPaginate(options) {
    return this.model.findAll({ ...options });
  }

  async findOrCreate(options) {
    return this.model.findOrCreate({ where: { ...options } });
  }

  async create(data, options) {
    return this.model.create(data, { ...options });
  }

  async update(id, data) {
    const userFind = await this.model.findOne({ where: { id } });
    if (!userFind) return null;
    return userFind.update(data);
  }

  async updateWhere(options, data) {
    const userFind = await this.model.findOne({ where: { ...options } });
    if (!userFind) return null;
    return userFind.update(data);
  }

  async updateMany(data, options) {
    return this.model.update(data, { ...options });
  }

  async destroy(id) {
    const userFind = await this.model.findOne({ where: { id } });
    if (!userFind) return null;
    return userFind.destroy();
  }

  async destroyMany(options) {
    return this.model.destroy({ ...options });
  }
}

module.exports = BaseRepository;
