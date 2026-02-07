# Lab 1: Deploying Your First "MasterToken"

**Objective**: Learn how to deploy a standard ERC20 token to a testnet using Hardhat.

## Prerequisites
- Node.js installed.
- A wallet (Metamask) with some faucet ETH (Sepolia or Mumbai).

## Step 1: Initialize Project
```bash
npm init -y
npm install --save-dev hardhat @openzeppelin/contracts
npx hardhat init
```
Choose "Create an empty hardhat.config.js".

## Step 2: Create the Contract
Create `contracts/MasterToken.sol`:
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MasterToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Masterclass2026", "MC26") {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }
}
```

## Step 3: Deployment Script
Create `scripts/deploy.js`:
```javascript
const hre = require("hardhat");

async function main() {
  const token = await hre.ethers.deployContract("MasterToken", [1000000]);
  await token.waitForDeployment();
  console.log("Token deployed to:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

## Deliverables
1. Contract address on the explorer.
2. Screenshot of the tokens appearing in your wallet.
