import { task } from "hardhat/config"
import "./getContract"

task("get-task", "Prints the task with the indicated number")
    .addParam("id", "ID of being checked task")
    .setAction(async ({ id }, hre) => {
        const contract = await hre.run("get-contract", { name: "TODO" })

        try {
            const { name, completed, timeLeft } = await contract.tasks(id)
            console.log(`\nTask name: ${name}`)
            console.log(`Task is completed: ${completed}`)
            console.log(`Time left: ${timeLeft}\n`)
            /*
            const blockNumber = await hre.ethers.provider.getBlockNumber()
            const block = await hre.ethers.provider.getBlock(blockNumber)
            const left = timeLeft - block.timestamp
            const minutes = 60
            const hours = 60 * minutes
            const days = 24 * hours
            const minutesLeft = ~~(left / 60)
            const hoursLeft = ~~(minutesLeft / 60)
            const daysLeft = ~~(hoursLeft / 24)
            console.log(`Time left:`)
            console.log(`\tdays: ${daysLeft}`)
            console.log(`\thours: ${hoursLeft}`)
            console.log(`\tminutes: ${minutesLeft}`)
            */
        } catch (e) {
            console.log(e)
        }
    })
