const catchAsync = require("../common/helper/catchAsync");
const apiResponse = require("../common/helper/apiResponse");

const index = catchAsync(async (req, res) => {
  apiResponse(res, "Hello This is Simple Test Project");
});

module.exports = {
  index,
};
