// SPDX-License-Identifier: MIT
pragma solidity >=0.8.6 <0.9.0;

import "openzeppelin-contracts/token/ERC20/IERC20.sol";

contract BatchTransfer {

    function batchTransfer(address token, address[] memory to, uint256[] memory amount) public {
        require(to.length == amount.length, "to.length != amount.length");
        uint256 totalAmount;
        for (uint256 i = 0; i < to.length; i++) {
            totalAmount += amount[i];
        }
        uint256 allowed = IERC20(token).allowance(msg.sender, address(this));
        require(allowed >= totalAmount, "InsufficientAllowance");

        for (uint256 i = 0; i < to.length; i++) {
            IERC20(token).transferFrom(msg.sender, to[i], amount[i]);
        }
    }

}