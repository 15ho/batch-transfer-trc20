// SPDX-License-Identifier: MIT
pragma solidity >=0.8.6 <0.9.0;

import "openzeppelin-contracts/token/ERC20/IERC20.sol";

contract BatchTransferV2 {

    function batchTransfer(address token, address[] calldata to, uint256[] calldata amount) public {
        require(to.length == amount.length, "to.length != amount.length");
        uint256 count = to.length;
        uint256 totalAmount;
        for (uint256 i = 0; i < to.length;) {
            totalAmount += amount[i];
            unchecked { i++; }
        }
        IERC20 tokenContract = IERC20(token);
        require(tokenContract.allowance(msg.sender, address(this)) >= totalAmount, "InsufficientAllowance");

        assembly {
            let memPtr := mload(0x40)
            mstore(memPtr, 0x23b872dd00000000000000000000000000000000000000000000000000000000)
            mstore(add(memPtr, 4),  caller())
            for { let i := 0 } lt(i, count) { i := add(i, 1) } {
                mstore(add(memPtr, 36), calldataload(add(to.offset, mul(i, 0x20))))
                mstore(add(memPtr, 68), calldataload(add(amount.offset, mul(i, 0x20))))
                if iszero(call(
                    gas(),
                    token,
                    0,
                    memPtr,
                    100,
                    0,
                    0
                )) {
                    returndatacopy(0, 0, returndatasize())
                    revert(0, returndatasize())
                }
            }
        }
    }

}