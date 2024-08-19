import "dotenv/config";
import {
    Connection,
    clusterApiUrl,
    LAMPORTS_PER_SOL,
    Keypair
} from "@solana/web3.js";

async function checkBalance() {
    const connection = new Connection(clusterApiUrl("devnet"));

    let privateKey = process.env["SECRET_KEY"];
    if (privateKey === undefined) {
        console.log("Add SECRET_KEY to .env!");
        process.exit(1);
    }

    const asArray = Uint8Array.from(JSON.parse(privateKey));
    const keypair = Keypair.fromSecretKey(asArray);

    const address = keypair.publicKey; 
    const balance = await connection.getBalance(address);
    const balanceInSol = balance / LAMPORTS_PER_SOL;

    console.log(`The balance of the account at ${address.toBase58()} is ${balanceInSol} SOL`);
    console.log(`✅ Finished!`);
}

checkBalance();
