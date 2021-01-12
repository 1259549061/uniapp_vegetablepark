const { Controller } = require("uni-cloud-router");
module.exports = class UserController extends (
  Controller
) {
  async visit_account() {
	  let visit = await this.service.user.visit_account();
	  console.log('visit',visit)
	  return visit
  }
};