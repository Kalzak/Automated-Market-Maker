var Amm = artifacts.require("Amm");

module.exports = function(deployer) {
	deployer.deploy(Amm, '10000000000000000000', '1000000000000000000000');
}

//Token1 has 10 tokens
//10000000000000000000
//
//Token2 has 1000 tokens
//1000000000000000000000
