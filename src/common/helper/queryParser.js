/* eslint-disable no-restricted-globals */
/* eslint-disable no-restricted-syntax */
const dayjs = require('dayjs');
const db = require('../../database/models');

const { Op } = db.Sequelize;
const OPERATORS = {
  gt: Op.gt,
  gte: Op.gte,
  lt: Op.lt,
  lte: Op.lte,
  like: Op.like,
  between: Op.between,
  betweenDate: Op.between,
  in: Op.in,
  regexp: Op.regexp,
  not: Op.not,
  endsWith: Op.endsWith,
};
/**
 * example: ?name=like:%budi%&age=between:21,25&gender=Laki-Laki
 */
const queryParser = (query) => {
  const result = {
    where: {},
    order: [['id', 'ASC']],
    page: Number(query.page) || 1,
  };
  const fields = Object.keys(query);
  for (const field of fields) {
    const q = query[field];
    // eslint-disable-next-line prefer-const
    let [op, value] = q.split(':');
    if (value) {
      const opSymbol = OPERATORS[op];
      if (['between', 'in'].includes(op)) {
        result.where[field] = {
          [opSymbol]: value.split(',').map((v) => (isNaN(v) ? v : Number(v))),
        };
      } else if (['betweenDate'].includes(op)) {
        const [start, end] = value.split(',');
        result.where[field] = {
          [opSymbol]: [
            dayjs(start).startOf('day').toISOString(),
            dayjs(end).endOf('day').toISOString(),
          ],
        };
      } else {
        result.where[field] = { [opSymbol]: isNaN(value) ? value : Number(value) };
      }
    } else if (field === 'sortBy') {
      const orderArray = op.split('.');

      if (orderArray.length === 2) {
        const [sort, order] = orderArray;
        result.order[0] = [sort, order];
      } else {
        const [model, sort, order] = orderArray;
        result.order[0] = [model, sort, order];
      }
    } else if (!['page', 'limit'].includes(field)) {
      result.where[field] = isNaN(op) ? op : Number(op);
    }
  }
  return result;
};

module.exports = queryParser;
