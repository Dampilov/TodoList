import { task } from "hardhat/config"
import { BigNumber } from "ethers"
import "./getContract"

task("get-task", "Prints the task with the indicated number")
    .addParam("id", "ID of being checked task")
    .setAction(async ({ id }, hre) => {
        const contract = await hre.run("get-contract", { name: "TODO" })

        try {
            const { name, completed, timeLeft } = await contract.tasks(id)
            console.log(`\nTask name: ${name}`)
            console.log(`Task is completed: ${completed}`)
            //console.log(`Time left: ${date}\n`)
            const blockNumber = await hre.ethers.provider.getBlockNumber()
            const block = await hre.ethers.provider.getBlock(blockNumber)
            const left = timeLeft - block.timestamp
            const minutes = ~~(left / 60)
            const hours = ~~(minutes / 60)
            const days = ~~(hours / 24)
            console.log(`Time left:`)
            console.log(`\tdays: ${days}`)
            console.log(`\thours: ${hours}`)
            console.log(`\tminutes: ${minutes}`)
        } catch (e) {
            console.log(e)
        }
    })
