const { ethers } = require("ethers");
require("dotenv").config();

async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const ROUTER_ADDRESS = process.env.ROUTER_ADDRESS;
    const WETH_ADDRESS = process.env.WETH_ADDRESS;
    const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS;

    const router = new ethers.Contract(
        ROUTER_ADDRESS,
        [
            "function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)",
            "function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)"
        ],
        wallet
    );

    console.log("Checking price...");
    const amountIn = ethers.parseEther("0.01");
    const amounts = await router.getAmountsOut(amountIn, [WETH_ADDRESS, TOKEN_ADDRESS]);
    console.log(`For 0.01 ETH, you will receive approximately ${ethers.formatUnits(amounts[1], 18)} Tokens`);

    console.log("Starting Swap...");
    const tx = await router.swapExactETHForTokens(
        0, // amountOutMin
        [WETH_ADDRESS, TOKEN_ADDRESS],
        wallet.address,
        Math.floor(Date.now() / 1000) + 60 * 10,
        { value: amountIn }
    );

    console.log(`Swap transaction sent: https://sepolia.etherscan.io/tx/${tx.hash}`);
    await tx.wait();
    console.log("Swap completed successfully!");
}

main().catch(console.error);
