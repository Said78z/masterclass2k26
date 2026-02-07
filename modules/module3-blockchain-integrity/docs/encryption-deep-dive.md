# Masterclass 2026 : Le Chiffrement et la Preuve d'Intégrité

Pourquoi chiffrer ou signer les données d'un nœud ? 
En 2026, les protocoles DePIN sont inondés de "Spam" (fausses données). Pour être payé, votre nœud doit prouver que la donnée vient d'une source **Matérielle (Hardware)** et non d'un script `curl` sur une VM.

## 1. Le Processus de "Signature Digitale" (Simulation)

La signature ne consiste pas à cacher la donnée (ce serait du chiffrement), mais à y apposer un **Sceau de Cire Numérique**.

### Les 3 Piliers du Chiffrement MC2026 :
1.  **Le Message (M)** : Votre donnée (ex: "Température: 22°C").
2.  **La Clé Privée (k)** : Une phrase secrète stockée dans le processeur (l'ESP32). Elle ne sort jamais du matériel.
3.  **L'Algorithme (SHA-256 + Ed25519)** : La machine à sceller.

---

## 2. TP : Simulateur de Signature (Node.js/Crypto)

Ce script simule ce qu'un nœud ESP32 fait avant d'envoyer sa donnée à la blockchain.

### Code de Simulation (`scripts/simulate-integrity.js`) :
```javascript
const crypto = require('crypto');

// 1. GÉNÉRATION DE L'IDENTITÉ (Clés de sécurité)
// Dans un monde idéal, ces clés sont générées une seule fois au boot de l'Arduino.
const { privateKey, publicKey } = crypto.generateKeyPairSync('ed25519');

const data = {
    nodeId: "ESP32-LONDON-001",
    rewardAddress: "0xSaidKaci...",
    uptime: "99.9%",
    bandwidthProvided: "1.2 TB"
};

// 2. LE HASHAGE (SHA-256)
// On transforme la donnée en une empreinte digitale unique de 64 caractères.
const message = JSON.stringify(data);
console.log("Donnée brute :", message);

// 3. LA SIGNATURE (Le Sceau)
// On utilise la clé privée pour "signer" le message.
const signature = crypto.sign(null, Buffer.from(message), privateKey);
console.log("Signature (Sceau) :", signature.toString('hex'));

// 4. LA VÉRIFICATION (Côté Blockchain/Backend)
// Le protocole utilise votre Clé Publique pour vérifier que c'est bien VOUS.
const isAuthentic = crypto.verify(null, Buffer.from(message), publicKey, signature);

console.log("\n--- Résultat de l'Analyse ---");
console.log("Donnée intègre ?", isAuthentic ? "OUI ✅ (Récompense validée)" : "NON ❌ (Fraude détectée)");
```

---

## 3. Pourquoi c'est "Inattaquable" ?

Même si un pirate intercepte le message, il ne peut pas modifier la `bandwidthProvided` sans briser la signature. S'il change un seul bit, la fonction `crypto.verify` retournera `false`.

C'est ainsi que nous saturons le réseau Berachain avec des données de "Haute Fidélité", nous garantissant les meilleurs multiplicateurs d'APY.
