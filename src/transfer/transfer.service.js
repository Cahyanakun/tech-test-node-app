const BaseRepository = require('../common/helper/BaseRepository');
const { transfer } = require('../database/models');
const balanceEnum = require('../common/enum/balance');
const balanceTypeEnum = require('../common/enum/balance-type');

class TransferService extends BaseRepository {
  async createTransfer(data) {
    const transactionPaymentService = require('../transaction-payment/transaction-payment.service');
    const balanceService = require('../balance/balance.service');

    const getTransaction = await transactionPaymentService.findOne({
      where: { id: data.invoiceId },
    });
    console.log(getTransaction);

    let creates;

    if (getTransaction.amount < data.amount) {
      creates = await this.create({
        userId: data.userId,
        transactionPaymentId: getTransaction.id,
        amount: getTransaction.amount,
        payAmount: data.amount,
        remainingAmount: 0,
      });
      const balanceAmount = data.amount - getTransaction.amount;
      await getTransaction.update({ status: 1 });
      await balanceService.create({
        userId: data.userId,
        refId: creates.id,
        refType: balanceEnum.TRANSFER,
        type: balanceTypeEnum.DEBIT,
        amount: balanceAmount,
      });
    } else if (getTransaction.amount > data.amount) {
      const remaining = getTransaction.amount - data.amount;
      creates = await this.create({
        userId: data.userId,
        transactionPaymentId: getTransaction.id,
        amount: getTransaction.amount,
        payAmount: data.amount,
        remainingAmount: remaining,
      });
      await getTransaction.update({ status: 2 });

      const nextTerm = getTransaction.term + 1;
      const nextTransactionPayment = await transactionPaymentService.findOne({
        where: { transactionId: getTransaction.transactionId, term: nextTerm },
      });
      const nextAmount = nextTransactionPayment.amount + remaining * (2 / 100) + remaining;
      await nextTransactionPayment.update({ amount: nextAmount });
    } else if (getTransaction.amount == data.amount) {
      creates = await this.create({
        userId: data.userId,
        transactionPaymentId: getTransaction.id,
        amount: getTransaction.amount,
        payAmount: data.amount,
        remainingAmount: 0,
      });
      await getTransaction.update({ status: 1 });
    }
    return creates;
  }
}

module.exports = new TransferService(transfer);
