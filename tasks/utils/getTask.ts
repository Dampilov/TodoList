import { task } from "hardhat/config"
import "./getContract"

task("get-task", "Prints the task with the indicated number")
    .addParam("id", "ID of being checked task")
    .setAction(async ({ id }, hre) => {
        const contract = await hre.run("get-contract", { name: "TODO" })

        try {
            const { taskId, name, completed, timeLeft } = await contract.tasks(id)
            console.log(`\nTask ID: ${taskId}`)
            console.log(`Task name: ${name}`)
            console.log(`Task is completed: ${completed}`)
            console.log(`Deadline: ${new Date(timeLeft * 1000)}\n`)
        } catch (e) {
            console.log(e)
        }
    })
