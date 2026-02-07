const hre = require("hardhat");

async function main() {
    const initialSupply = 1000000;
    const token = await hre.ethers.deployContract("MasterToken", [initialSupply]);

    await token.waitForDeployment();

    console.log(
        `MasterToken with initial supply ${initialSupply} deployed to ${await token.getAddress()}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
