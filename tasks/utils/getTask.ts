import { task } from "hardhat/config"
import "./getContract"

task("get-task", "Prints the task with the indicated number")
    .addParam("id", "ID of being checked task")
    .setAction(async ({ id }, hre) => {
        const contract = await hre.run("get-contract", { name: "TODO" })

        try {
            const { taskId, name, completed, timeLeft } = await contract.tasks(id)
            await hre.run("print", {
                id: taskId.toString(),
                name,
                completed: completed.toString(),
                timeLeft: timeLeft.toString(),
            })
        } catch (e) {
            console.log(e)
        }
    })
