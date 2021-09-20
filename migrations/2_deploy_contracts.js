var Amm = artifacts.require("Amm");
var Token1 = artifacts.require("Token1");
var Token2 = artifacts.require("Token2");

module.exports = function(deployer) {
	deployer.deploy(Amm, '10000000000000000000', '1000000000000000000000');
	deployer.deploy(Token1, "Token1", "T1");
	deployer.deploy(Token2, "Token2", "T2");
}

//Token1 has 10 tokens
//10000000000000000000
//
//Token2 has 1000 tokens
//1000000000000000000000
