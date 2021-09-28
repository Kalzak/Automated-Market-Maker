const Amm = artifacts.require("Amm");
const Token1 = artifacts.require("Token1");
const Token2 = artifacts.require("Token2");

// Account 0 will hold 10 T1
// Account 1 will hold 1000 T2


contract("Amm", (accounts) => {

	it("Setup token1", async() => {
		const ammInstance = await Amm.deployed();
		const t1Instance = await Token1.deployed();
		await t1Instance.mint(accounts[0], '20000000000000000000');
		await t1Instance.transfer(ammInstance.address, '10000000000000000000', {from: accounts[0]});
	});

	it("Setup token2", async() => {
		const ammInstance = await Amm.deployed();
		const t2Instance = await Token2.deployed();
		await t2Instance.mint(accounts[1], '2000000000000000000000');
		await t2Instance.transfer(ammInstance.address, '1000000000000000000000', {from: accounts[1]});
	});

	it("setToken1 updates token1 address", async() => {
		const ammInstance = await Amm.deployed();
		const t1Instance = await Token1.deployed();
		await ammInstance.setToken1(t1Instance.address);
		let newT1Address = await ammInstance.token1();
		assert.equal(newT1Address, t1Instance.address, "Address did not change");
	});

	it("setToken2 updates token2 address", async() => {
		const ammInstance = await Amm.deployed();
		const t2Instance = await Token2.deployed();
		await ammInstance.setToken2(t2Instance.address);
		let newT2Address = await ammInstance.token2();
		assert.equal(newT2Address, t2Instance.address, "Address did not change");
	});

	it("getLiqidity returns correct values", async() => {
		const ammInstance = await Amm.deployed();
		let liq = await ammInstance.getLiquidity();
		assert.equal("10000000000000000000", BigInt(liq[0],toString()), "Unexpected value returned");
		assert.equal("1000000000000000000000", BigInt(liq[1],toString()), "Unexpected value returned");
	});

	it("calculateConstantProduct calculates correctly", async() => {
		const ammInstance = await Amm.deployed();
		await ammInstance.calculateConstantProduct();
		let res = await ammInstance.constantProduct();
		assert.equal("10000000000000000000000000000000000000000", res.toString());
	});

	it("quoteT1toT2 returns value", async() => {
		const ammInstance = await Amm.deployed();
		let res = await ammInstance.quoteT1_to_T2('1000000000000000000');
	});

	it("quoteT2_to_T1 returns value", async() => {
		const ammInstance = await Amm.deployed();
		let res = await ammInstance.quoteT2_to_T1('100000000000000000000');
	});

	it("exchangeT1toT2 changes holdings of amm", async() => {
		const ammInstance = await Amm.deployed();
		let liqBefore = await ammInstance.getLiquidity();
		const t1Instance = await Token1.deployed();
		await t1Instance.approve(ammInstance.address, '100000000000000000', {from: accounts[0]});
		await ammInstance.exchangeT1_to_T2('100000000000000000', {from: accounts[0]});
		let liqAfter = await ammInstance.getLiquidity();
		assert.notEqual(liqBefore[0].toString(), liqAfter[0].toString(), "Liqidity did not change");
		assert.notEqual(liqBefore[1].toString(), liqAfter[1].toString(), "Liqidity did not change");
	});

	it("exchangeT2toT1 changes holdings of amm", async() => {
		const ammInstance = await Amm.deployed();
		let liqBefore = await ammInstance.getLiquidity();
		const t2Instance = await Token2.deployed();
		await t2Instance.approve(ammInstance.address, '10000000000000000000', {from: accounts[1]});
		await ammInstance.exchangeT2_to_T1('10000000000000000000', {from: accounts[1]});
		let liqAfter = await ammInstance.getLiquidity();
		assert.notEqual(liqBefore[0].toString(), liqAfter[0].toString(), "Liqidity did not change");
		assert.notEqual(liqBefore[1].toString(), liqAfter[1].toString(), "Liqidity did not change");
	});
});
