import { get } from "https"
import { FlashbotsBundleProvider } from "@flashbots/ethers-provider-bundle";
import { Contract, providers, Wallet } from "ethers";
// import the bundle executor abi
// import the uniswappy pair 
// import the factory addresses

// CHECK IF NEED TO REQUIRES THE ENV FILE

console.log('hello world')

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//  Initializing constants that are needed to make a call to Flashbots relay  //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

// When using things like passwords, tokens, database strings, always a good idea
// to set them as environment variables for security

// FIGURE OUT IF BUNDLE EXECUTOR ADDRESS IS NEEDED

// Ethereum RPC endpoint.Can't be the same as FLASHBOTS_RPC_URL
const ETHEREUM_RPC_URL = process.env.ETHEREUM_RPC_URL || ""

// Private key for the Ethereum EOA that will be submitting Flashbot transactions
const PRIVATE_KEY = process.env.PRIVATE_KEY || ""

/* Flashbots submissions require an Ethereum private key to sign transaction payloads
   This newly-created account does not need to hold any funds or correlate to any on-chain activity
   it just needs to be used across multiple Flashbots RPC requests to identify
   requests related to the same searcher
*/ 
const FLASHBOTS_RELAY_SIGNING_KEY = process.env.FLASHBOTS_RELAY_SIGNING_KEY || getDefaultRelaySigningKey();

// A percentage that defines what overall profit is sent to the miners
const MINER_REWARD_PERCENTAGE = parseInt(process.env.MINER_REWARD_PERCENTAGE || "80")


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//               A Simple NULL check on environmental variables               //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

if (PRIVATE_KEY === "") {
  console.warn("Must provide PRIVATE_KEY environment variable")
  process.exit(1)
}

if (FLASHBOTS_RELAY_SIGNING_KEY === "") {
  console.warn("Must provide FLASHBOTS_RELAY_SIGNING_KEY. Please see https://github.com/flashbots/pm/blob/main/guides/searcher-onboarding.md")
  process.exit(1)
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//   Setting up objects that allow us to extra data off of the blockchain     //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

// Optional, hit only after successfully submitting bundle
const HEALTHCHECK_URL = process.env.HEALTHCHECK_URL || ""

function healthcheck() {
  if (HEALTHCHECK_URL === "") {
    return
  }
  get(HEALTHCHECK_URL).on('error', console.error);
}

// Used to get information off of the chain
// Standard json rpc provider directly from ethers.js (Flashbots)
const provider = new providers.StaticJsonRpcProvider(ETHEREUM_RPC_URL);

// A wallet to sign the arbitrage transaction
const arbitrageSigningWallet = new Wallet(PRIVATE_KEY);

/* An Ethereum private key that does NOT store funds and is NOT your bot's primary key
   This is an identifying key for signing payloads to establish reputation and whitelisting
   In production, this should be used across multiple bundles to build relationship
   In the npm example, a random wallet is generated everytime
*/
const flashbotsRelaySigningWallet = new Wallet(FLASHBOTS_RELAY_SIGNING_KEY);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//   The main function that represents the actual working part of the code    //
// By here, all our imports & env variables have been successfully acquired   //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
async function main() {

}

main();