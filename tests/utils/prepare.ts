import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { ethers } from "hardhat"

export async function prepareSigners(thisObject: Mocha.Context) {
    thisObject.signers = await ethers.getSigners()
    thisObject.owner = thisObject.signers[0]
    thisObject.alice = thisObject.signers[1]
    thisObject.bob = thisObject.signers[2]
    thisObject.carol = thisObject.signers[3]
    thisObject.tema = thisObject.signers[4]
    thisObject.misha = thisObject.signers[5]
}

export async function prepareTODOTokens(thisObject: Mocha.Context, signer: SignerWithAddress) {
    const tokenFactory = await ethers.getContractFactory("TODO")

    const token1 = await tokenFactory.connect(signer).deploy()
    await token1.deployed()
    thisObject.token1 = token1

    const token2 = await tokenFactory.connect(signer).deploy()
    await token2.deployed()
    thisObject.token2 = token2

    const token3 = await tokenFactory.connect(signer).deploy()
    await token3.deployed()
    thisObject.token3 = token3
}
