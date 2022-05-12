import { subtask } from "hardhat/config"

subtask("print", "Prints the one task")
    .addParam("id", "ID of task whitch being printed")
    .addParam("name", "The name of task whitch being printed")
    .addParam("completed", "Status of task whitch being printed")
    .addParam("timeLeft", "The time left of task whitch being printed")
    .setAction(async ({ id, name, completed, timeLeft }, hre) => {
        console.log(`\nTask ID: ${id}`)
        console.log(`Task name: ${name}`)
        console.log(`Task is completed: ${completed}`)
        console.log(`Deadline: ${new Date(+timeLeft * 1000)}`)
    })
