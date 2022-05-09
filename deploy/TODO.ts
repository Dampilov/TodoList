import { Address } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

module.exports = async function (hre: HardhatRuntimeEnvironment) {
    console.log(`ChainId: ${await hre.getChainId()}`)

    const { deployments, getNamedAccounts, ethers } = hre
    const { deploy } = deployments

    const { deployer } = await getNamedAccounts()
    const balance = await ethers.provider.getBalance(deployer)

    console.log(`Deployer: ${deployer} , balance: ${ethers.utils.formatEther(balance)} `)

    const result = await deploy("TODO", {
        from: deployer,
        log: true,
    })

    saveAddress(result.address, "TODO")
}

module.exports.tags = ["TODO"]

function saveAddress(address: Address, name: string) {
    const fs = require("fs")
    const contractsDir = __dirname + "/../build/address"

    if (!fs.existsSync(contractsDir)) {
        fs.mkdirSync(contractsDir)
    }

    fs.writeFileSync(contractsDir + "/" + name + ".json", JSON.stringify({ Address: address }, undefined, 2))
}
