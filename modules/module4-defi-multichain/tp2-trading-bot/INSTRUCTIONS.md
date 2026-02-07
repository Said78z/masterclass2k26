# Lab 2: Automated Swap Script

**Objective**: Write a script that automatically swaps tokens on a testnet DEX using `ethers.js`.

## Setup
```bash
npm install ethers dotenv
```

## The Script (`swap.js`)
```javascript
const { ethers } = require("ethers");
require("dotenv").config();

const ROUTER_ADDRESS = "0x..."; // Address of Testnet Uniswap/Pancake Router
const WETH_ADDRESS = "0x...";
const TOKEN_ADDRESS = "0x...";

async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const router = new ethers.Contract(
        ROUTER_ADDRESS,
        ["function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)"],
        wallet
    );

    const tx = await router.swapExactETHForTokens(
        0, // amountOutMin (set to 0 for lab purposes, DO NOT do this in production)
        [WETH_ADDRESS, TOKEN_ADDRESS],
        wallet.address,
        Math.floor(Date.now() / 1000) + 60 * 10,
        { value: ethers.parseEther("0.01") }
    );

    console.log("Swap transaction sent:", tx.hash);
    await tx.wait();
    console.log("Swap completed!");
}

main();
```

## Challenge
Modify the script to check the price of the token *before* swapping, and only swap if the price is below a certain threshold.
