const { Controller } = require("uni-cloud-router");
module.exports = class LoginController extends (
  Controller
) {
  login() {
	  return this.service.login.login();
  }
};