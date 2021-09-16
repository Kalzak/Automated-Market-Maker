pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Amm {
	using SafeMath for uint256;

	// The number of token1s
	uint256 public token1Amt;
	// The number of token2s
	uint256 public token2Amt;
	// The constant product to be maintained
	uint256 public constantProduct;

	constructor(uint256 _token1Amt, uint256 _token2Amt) {
		token1Amt = _token1Amt;
		token2Amt = _token2Amt;
		constantProduct = token1Amt * token2Amt;
	}

	function quoteT1_to_T2(uint256 t1InputAmt) public view returns(uint256) {
		uint256 newT1Amt = token1Amt.add(t1InputAmt);
		uint256 dividedNewT1Amt = constantProduct.div(newT1Amt);
		uint256 returnValue = dividedNewT1Amt.sub(token1Amt);
		return returnValue;

		//return token1Amt.sub(constantProduct.div(token1Amt.add(t1InputAmt)));
	}

	function quoteT2_to_T1(uint256 t2InputAmt) public view returns(uint256) {
		return token2Amt.sub(constantProduct.div(token2Amt.add(t2InputAmt)));
	}
}
