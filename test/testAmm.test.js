const Amm = artifacts.require("Amm");

contract("Amm", (accouts) => {
	it("getQuoteT1toT2 returns value", async() => {
		const instance = await Amm.deployed();
		let res = await instance.quoteT1_to_T2('1000000000000000000');
		console.log(res.toString());
	});

	it("getQuoteT2_to_T1 returns value", async() => {
		const instance = await Amm.deployed();
		let res = await instance.quoteT2_to_T1('100000000000000000000');
		console.log(res.toString());
	});
});
