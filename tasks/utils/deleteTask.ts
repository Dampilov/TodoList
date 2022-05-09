import { task } from "hardhat/config"
import "./getContract"

task("delete-task", "Delete a choosen task")
    .addParam("id", "ID of being deleted task")
    .setAction(async ({ id }, hre) => {
        const contract = await hre.run("get-contract", { name: "TODO" })

        try {
            await contract.deleteTask(id)
            console.log("Task deleted")
        } catch (e) {
            console.log(e)
        }
    })
