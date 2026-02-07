# Dossier Spécial : Berachain & Proof of Liquidity (PoL)

Berachain est la blockchain la plus stratégique de 2026 pour notre Masterclass. Contrairement à Ethereum (Proof of Stake) ou Bitcoin (Proof of Work), Berachain utilise le **Proof of Liquidity**.

## 1. Pourquoi Berachain pour le DePIN ?

Le PoL permet aux utilisateurs de déléguer leur liquidité à des validateurs. Dans notre cas, les récompenses générées par nos nœuds DePIN (Grass, Titan) peuvent être injectées directement dans l'écosystème Berachain pour :
*   **Générer du rendement (Yield)** sur les récompenses de minage.
*   **Sécuriser le réseau** en tant que validateurs légers.
*   **Maximiser l'Airdrop $BERA** en prouvant une activité on-chain constante.

## 2. L'Architecture du Nœud "Bera-Wrapper"

Un nœud Berachain dans notre usine ne se contente pas de valider ; il agit comme un **Orchestrateur de Liquidité**.

### Composants :
1.  **Bera-Node Core** : Le moteur de consensus (Polaris EVM).
2.  **Liquidity Vault Sidecar** : Un script qui surveille les récompenses et les dépose dans les "BGT Station" (Berachain Governance Token).
3.  **Integrity Signer** : Le module de chiffrement (que nous allons simuler ensuite) qui prouve au réseau que nos données de liquidité sont authentiques.

---

## 3. TP : Déploiement du Wrapper (Étape 1)

### Étape A : Préparation de l'environnement
Nous utilisons une image Docker hybride qui combine un client EVM léger et notre orchestrateur.

### Étape B : Configuration du "Honey" Engine
Le "Honey" est le stablecoin natif. Notre but est de transformer nos points DePIN en Honey via des swaps automatisés dès que l'airdrop tombe.

---

## 4. Ce que nous allons construire
Un script qui simule la connexion au testnet "Artio" de Berachain, prépare un wallet, et attend les instructions de signature chiffrée.
