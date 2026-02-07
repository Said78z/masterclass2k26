# Testnet Deployment Plan: Masterclass 2026

To validate the architecture, we will target four distinct ecosystems.

## 1. Ethereum / L2 (The Foundation)
- **Primary**: Sepolia Testnet.
- **Secondary**: Arbitrum Sepolia (for low gas fee testing).
- **Focus**: ERC20 Standards, Uniswap V3 forks, and Gnosis Safe automation.

## 2. Berachain (The DePIN/DeFi Hybrid)
- **Testnet**: Artio.
- **Why**: Berachain is ideal for DePIN because of its "Proof of Liquidity" consensus. 
- **Goal**: Deploy a validator-tracking script that claims rewards automatically.

## 3. Solana (High Speed)
- **Net**: Devnet.
- **Focus**: Anchor Framework and Jito (MEV) awareness.
- **Exercise**: Deploy a simple SPL token and create a "Liquidity Pool" script on Raydium Devnet.

## 4. Movement (The Future of Move)
- **Net**: Movement Testnet (Aptos/Sui compatible).
- **Why**: Demonstrating DevSecOps in the Move ecosystem (Memory Safety).
- **Goal**: Basic entry script to interaction with Move modules.

---

## Deployment Workflow
1.  **Local Development**: Hardhat/Foundry for EVM.
2.  **Simulation**: Use `anvil` or `hardhat node` to fork the mainnet.
3.  **Testnet Blast**: Scripted deployment to multiple chains using `scripts/testnet-deploy/multichain.js`.
