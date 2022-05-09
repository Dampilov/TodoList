import { task } from "hardhat/config"
import "./getContract"

task("complete-task", "Complete a choosen task")
    .addParam("id", "ID of being completed task")
    .setAction(async ({ id }, hre) => {
        const contract = await hre.run("get-contract", { name: "TODO" })

        try {
            await contract.completeTask(id)
            console.log("\nTask completed")
            console.log(await hre.run("get-task", { id }))
        } catch (e) {
            console.log(e)
        }
    })
