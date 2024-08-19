use solana_sdk::signature::{Keypair, Signer};

fn generate_keypair_with_prefix(prefix: &str) -> Keypair {
    let mut attempts = 0;

    loop {
        let keypair = Keypair::new();
        let pubkey = keypair.pubkey().to_string();

        attempts += 1;
        if attempts % 1000 == 0 {
            println!("Attempt {}: {}", attempts, pubkey);
        }

        if pubkey.starts_with(prefix) {
            println!("Found matching public key after {} attempts: {}", attempts, pubkey);
            return keypair;
        }
    }
}

fn main() {
    let prefix = "dm";
    let keypair = generate_keypair_with_prefix(prefix);

    println!("Public Key: {}", keypair.pubkey());
    println!("Private Key: {:?}", keypair.to_bytes());
}
