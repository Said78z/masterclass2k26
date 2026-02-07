// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MasterToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Masterclass2026", "MC26") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
}
