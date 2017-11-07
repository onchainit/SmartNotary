var SmartNotary = artifacts.require("./SmartNotary.sol");

module.exports = function(deployer) {
  deployer.deploy(SmartNotary);
};
