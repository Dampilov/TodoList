import { task } from "hardhat/config"
import "./getContract"

task("get-statistic", "Prints the percentage of compelted in deadline tasks by owner")
    .addParam("owner", "Address by owner, whos statistic you checking")
    .setAction(async ({ owner }, hre) => {
        const contract = await hre.run("get-contract", { name: "TODO" })

        try {
            const task = await contract.getStatisticByAddress(owner)
            console.log(`Completed in deadline tasks: ${task}%`)
        } catch (e) {
            console.log(e)
        }
    })
