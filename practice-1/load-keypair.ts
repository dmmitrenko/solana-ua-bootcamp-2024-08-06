import "dotenv/config";
import { Keypair } from "@solana/web3.js";
 
let privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
  console.log("Add SECRET_KEY to .env!");
  process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const keypair = Keypair.fromSecretKey(asArray);

console.log(`Public key: ${keypair.publicKey.toBase58()}`);

console.log(
  `✅ Finished! We've loaded our secret key securely, using an env file!`,
);