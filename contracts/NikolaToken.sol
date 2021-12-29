// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NikolaToken is ReentrancyGuard {
  uint tokenAmount = 1000000000;
  address payable feeAccountAddress =
    payable(0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199);

  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }

  function getTokenValueInEthers() public view returns (uint256) {
    uint256 tokenEquityInEthers = address(feeAccountAddress).balance;
    return tokenEquityInEthers / tokenAmount;
  }

  function getRemainingAmountOfTokens() public view returns (uint256) {
    return tokenAmount;
  }
}
