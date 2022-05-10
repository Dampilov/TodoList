import { task } from "hardhat/config"
import "./getContract"
import "./getTask"

task("complete-task", "Complete a choosen task")
    .addParam("id", "ID of being completed task")
    .setAction(async ({ id }, hre) => {
        const contract = await hre.run("get-contract", { name: "TODO" })

        try {
            await contract.completeTask(id)
            console.log("\nTask completed")

            const { taskId, name, completed, timeLeft } = await contract.tasks(id)
            console.log(`\nTask ID: ${taskId}`)
            console.log(`Task name: ${name}`)
            console.log(`Task is completed: ${completed}`)
            console.log(`Time left: ${timeLeft}\n`)
        } catch (e) {
            console.log(e)
        }
    })
