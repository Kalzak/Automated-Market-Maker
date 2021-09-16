var Amm = artifacts.require("Amm");

module.exports = function(deployer) {
	deployer.deploy(Amm, '1000000000000000000', '1000000000000000000000');
}
