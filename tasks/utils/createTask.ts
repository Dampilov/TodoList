import { task } from "hardhat/config"
import "./getContract"

task("create-task", "Create a new task")
    .addParam("name", "Name of being created task")
    .addParam("days", "The number of days given to complete this task")
    .addParam("hours", "The number of hours given to complete this task")
    .setAction(async ({ name, days, hours }, hre) => {
        const contract = await hre.run("get-contract", { name: "TODO" })

        try {
            await contract.createTask(name, days, hours)
            console.log(`Task created`)
        } catch (e) {
            console.log(e)
        }
    })
