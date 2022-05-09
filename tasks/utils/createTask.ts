import { task } from "hardhat/config"

task("create-task", "Create a new task")
    .addParam("name", "The name of being created task")
    .setAction(async ({ name }, hre) => {
        console.log(name)
    })
