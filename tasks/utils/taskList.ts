import { task } from "hardhat/config"
import "./getContract"

task("task-list", "Prints the list of tasks", async (taskArgs, hre) => {
    const contract = await hre.run("get-contract", { name: "TODO" })

    try {
        const tasks = await contract.getTaskList()

        for (const { taskId, name, completed, timeLeft } of tasks) {
            await hre.run("print", {
                id: taskId.toString(),
                name,
                completed: completed.toString(),
                timeLeft: timeLeft.toString(),
            })
        }
    } catch (e) {
        console.log(e)
    }
})
