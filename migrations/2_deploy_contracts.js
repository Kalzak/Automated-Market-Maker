var Amm = artifacts.require("Amm");

module.exports = function(deployer) {
	var decimalBase = 100000000000000000;
	deployer.deploy(Amm, '1000000000000000000', '100000000000000000000');
}
