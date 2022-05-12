import { task } from "hardhat/config"
import "./getContract"

task("task-list", "Prints the list of tasks", async (taskArgs, hre) => {
    const contract = await hre.run("get-contract", { name: "TODO" })

    try {
        const tasks = await contract.getTaskList()

        for (const { taskId, name, completed, timeLeft } of tasks) {
            console.log(`Task ID: ${taskId}`)
            console.log(`Task name: ${name}`)
            console.log(`Task is completed: ${completed}`)
            console.log(`Deadline: ${new Date(timeLeft * 1000)}\n`)
        }
    } catch (e) {
        console.log(e)
    }
})
