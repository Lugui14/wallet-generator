const bip32 = require("bip32");
const bip39 = require("bip39");
const bitcoin = require("bitcoinjs-lib");

// BTC Testnet network
const network = bitcoin.networks.testnet;

// Derivates the path for the wallet
const path = "m/49'/1'/0'/0";

// Generates a mnemonic
const mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

const root = bip32.fromSeed(seed, network);

// Derivates the account and node (keys)
const account = root.derivePath(path);
const node = account.derive(0).derive(0);

// Generates the BTC address
const btcAddress = bitcoin.payments.p2pkh({
  pubkey: node.publicKey,
  network,
}).address;

console.log("\n##### WALLET GENERATED  #####");
console.log("ADDRESS: ", btcAddress);
console.log("PRIVATE KEY: ", account.toWIF());
console.log("MNEMONIC: ", mnemonic);
console.log("\n");
