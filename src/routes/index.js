const express = require('express');

const homeRoute = require('../home/home.route');
const authRoute = require('../auth/auth.route');
const adminRoute = require('../admin/admin.route');
const userRoute = require('../user/user.route');
const depositRoute = require('../deposit/deposit.route');
const withdrawRoute = require('../withdraw/withdraw.route');
const transactionRoute = require('../transaction/transaction.route');
const miscRoute = require('../misc/misc.route');

const router = express.Router();

const routes = [
  {
    path: '/',
    route: homeRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/admin',
    route: adminRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/deposit',
    route: depositRoute,
  },
  {
    path: '/withdraw',
    route: withdrawRoute,
  },
  {
    path: '/transaction',
    route: transactionRoute,
  },
  {
    path: '/misc',
    route: miscRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
