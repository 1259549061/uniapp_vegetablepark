const { Controller } = require("uni-cloud-router");
module.exports = class UserController extends (
  Controller
) {
  async user_visit() {
	  let visit = await this.service.user.set_visit_account();
	  return visit
  }
  async setInfo() {
	  let res = await this.service.user.setInfo()
	  return res
  }
  async get_user_visit() {
	  let visit = await this.service.user.get_visit_account();
	  return visit
  }
};