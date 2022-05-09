import { task } from "hardhat/config"
import "./getContract"

task("task-list", "Prints the list of tasks", async (taskArgs, hre) => {
    const contract = await hre.run("get-contract", { name: "TODO" })

    try {
        const tasks = await contract.getTaskList()

        for (const { name, completed, timeLeft } of tasks) {
            console.log(`Task name: ${name}`)
            console.log(`Task is completed: ${completed}`)
            console.log(`Time left: ${timeLeft}\n`)
        }
    } catch (e) {
        console.log(e)
    }
})
