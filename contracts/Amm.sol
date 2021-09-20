pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Amm {
	using SafeMath for uint256;
	
	// Address of token1
	address public token1;

	// Address of token2
	address public token2;

	// The constant product to be maintained
	uint256 public constantProduct;

	function setToken1(address _token1) public {
		token1 = _token1;	
	}

	function setToken2(address _token2) public {
		token2 = _token2;
	}

	function getLiquidity() public view returns(uint256, uint256){
		uint256 token1Amt = IERC20(token1).balanceOf(address(this));
		uint256 token2Amt = IERC20(token2).balanceOf(address(this));
		return (token1Amt, token2Amt);
	}

	function calculateConstantProduct() public {
		uint256 token1Amt = IERC20(token1).balanceOf(address(this));
		uint256 token2Amt = IERC20(token2).balanceOf(address(this));
		constantProduct = token1Amt.mul(token2Amt);
	}

	function quoteT1_to_T2(uint256 t1InputAmt) public view returns(uint256) {
		uint256 token1Amt = IERC20(token1).balanceOf(address(this));
		uint256 token2Amt = IERC20(token2).balanceOf(address(this));
		return token2Amt.sub(constantProduct.div(token1Amt.add(t1InputAmt)));
	}

	function quoteT2_to_T1(uint256 t2InputAmt) public view returns(uint256) {
		uint256 token1Amt = IERC20(token1).balanceOf(address(this));
		uint256 token2Amt = IERC20(token2).balanceOf(address(this));
		return token1Amt.sub(constantProduct.div(token2Amt.add(t2InputAmt)));
	}
	
	function exchangeT1_to_T2(uint256 t1InputAmt) public {
		uint256 token1Amt = IERC20(token1).balanceOf(address(this));
		uint256 token2Amt = IERC20(token2).balanceOf(address(this));
		uint256 outputAmount = token2Amt.sub(constantProduct.div(token1Amt.add(t1InputAmt)));
		IERC20(token1).transferFrom(msg.sender, address(this), t1InputAmt);
		IERC20(token2).transfer(msg.sender, outputAmount);
	}

	function exchangeT2_to_T1(uint256 t2InputAmt) public {
		uint256 token1Amt = IERC20(token1).balanceOf(address(this));
		uint256 token2Amt = IERC20(token2).balanceOf(address(this));
		uint256 outputAmount = token1Amt.sub(constantProduct.div(token2Amt.add(t2InputAmt)));
		IERC20(token2).transferFrom(msg.sender, address(this), t2InputAmt);
		IERC20(token1).transfer(msg.sender, outputAmount);
	}
}
