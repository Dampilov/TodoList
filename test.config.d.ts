import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { TODO } from "./build/typechain"

declare module "mocha" {
    export interface Context {
        // SIGNERS
        signers: SignerWithAddress[]
        owner: SignerWithAddress
        alice: SignerWithAddress
        bob: SignerWithAddress
        carol: SignerWithAddress
        tema: SignerWithAddress
        misha: SignerWithAddress

        // CONTRACTS
        token1: TODO
        token2: TODO
        token3: TODO
    }
}
