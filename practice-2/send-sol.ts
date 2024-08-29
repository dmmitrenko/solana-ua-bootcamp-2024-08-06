import "dotenv/config";
import {
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction,
    clusterApiUrl,
    Connection,
    sendAndConfirmTransaction,
    TransactionInstruction,
} from "@solana/web3.js";
import { Buffer } from "buffer";

let privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
    console.log("Add SECRET_KEY to .env!");
    process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

console.log(`🔑 Our public key is: ${sender.publicKey.toBase58()}`);

async function main() {
    //await deposit();

    const recipient = new PublicKey("3BuJERkQhz5dz5qVphc9qiJz75atYTkJMoeoYQwcy6G5");
    console.log(`Attempting to send 0.01 SOL to ${recipient.toBase58()}...`);

    const transaction = new Transaction();
    const sendSolInstruction = SystemProgram.transfer({
        fromPubkey: sender.publicKey,
        toPubkey: recipient,
        lamports: 0.01 * LAMPORTS_PER_SOL,
    });

    transaction.add(sendSolInstruction);

    const memoProgram = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr")

    const memoText = "Hello from solana!"

    const addMemoInstruction = new TransactionInstruction({
        keys: [{pubkey: sender.publicKey, isSigner: true, isWritable: true}],
        data: Buffer.from(memoText, "utf-8"),
        programId: memoProgram
    })

    transaction.add(addMemoInstruction)

    console.log(`memo is: ${memoText}`)
    await send(transaction);
}

async function send(transaction: Transaction) {
    const signature = await sendAndConfirmTransaction(connection, transaction, [sender]);
    console.log(`✅ Transaction confirmed, signature: ${signature}!`);
}

async function deposit() {
    const airdropSignature = await connection.requestAirdrop(
        sender.publicKey,
        1 * LAMPORTS_PER_SOL
    );

    const latestBlockHash = await connection.getLatestBlockhash();
    await connection.confirmTransaction({
        signature: airdropSignature,
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight
    });
    console.log("Airdrop completed!");
}

main().catch(err => {
    console.error(err);
});
