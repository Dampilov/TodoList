import { expect, use } from "chai"
import { ethers, waffle } from "hardhat"
import { prepareTODOTokens, prepareSigners } from "./utils/prepare"
import { duration, increase } from "./utils/time"

use(waffle.solidity)

describe("Todo list contract", function () {
    beforeEach(async function () {
        await prepareSigners(this)
        await prepareTODOTokens(this, this.bob)
    })

    describe("Deployment", function () {
        it("Should be deployed", async function () {
            expect(await this.token1.address).to.be.properAddress
        })
    })

    describe("Task creation", function () {
        it("Should create task", async function () {
            const taskName = "Write module for contract"
            await this.token1.connect(this.bob).createTask(taskName, 0, 1)

            const bobTask = await this.token1.tasks(0)

            expect(bobTask.name).to.equal(taskName)
            expect(bobTask.completed).to.equal(false)
            expect(bobTask.timeLeft).to.above(0)
        })

        it("Should fail if name is empty", async function () {
            const taskName = ""

            await expect(this.token1.connect(this.misha).createTask(taskName, 0, 1)).to.be.revertedWith("Empty name")
            // Shouldn't create a task
            const bobTask = await this.token1.tasks(0)

            expect(bobTask.name).to.equal("")
            expect(bobTask.completed).to.equal(false)
            expect(bobTask.timeLeft).to.equal(0)
        })

        it("Should fail if remaining time is empty", async function () {
            const taskName = "Write module for contract"

            await expect(this.token1.connect(this.misha).createTask(taskName, 0, 0)).to.be.revertedWith("Empty time")

            // Shouldn't create a task
            const bobTask = await this.token1.tasks(0)

            expect(bobTask.name).to.equal("")
            expect(bobTask.completed).to.equal(false)
            expect(bobTask.timeLeft).to.equal(0)
        })
    })

    describe("Task complition", function () {
        it("Should complete task", async function () {
            const taskId = 0

            // Task creation
            const taskName = "Write module for contract"
            await this.token1.connect(this.bob).createTask(taskName, 0, 1)

            let bobTask = await this.token1.tasks(taskId)

            expect(bobTask.name).to.equal(taskName)
            expect(bobTask.completed).to.equal(false)
            expect(bobTask.timeLeft).to.above(0)

            // Task complition
            await this.token1.connect(this.bob).completeTask(taskId)

            bobTask = await this.token1.tasks(taskId)

            // Task's status should have changed
            expect(bobTask.completed).to.equal(true)
        })

        it("Should complete task only owner", async function () {
            const taskId = 0
            const taskOwner = this.bob

            // Task creation
            const taskName = "Write module for contract"
            await this.token1.connect(taskOwner).createTask(taskName, 0, 1)

            const bobTask = await this.token1.tasks(taskId)

            expect(bobTask.name).to.equal(taskName)
            expect(bobTask.completed).to.equal(false)
            expect(bobTask.timeLeft).to.above(0)

            // Task complition by a non-owner
            await expect(this.token1.connect(this.misha).completeTask(taskId)).to.be.revertedWith("Not task owner")

            // Task shouldn't have changed
            expect(await this.token1.tasks(taskId)).to.deep.equal(bobTask)
        })

        it("Should fail if task with this id is not exist", async function () {
            const taskId = 10
            const taskOwner = this.bob

            // Task complition by a non-owner
            await expect(this.token1.connect(this.misha).completeTask(taskId)).to.be.revertedWith("No such task")

            // Task with this id shouldn't exist
            let bobTask = await this.token1.tasks(taskId)

            expect(bobTask.name).to.equal("")
            expect(bobTask.completed).to.equal(false)
            expect(bobTask.timeLeft).to.equal(0)
        })

        it("Should complete task and if completed not in deadline, should mark it", async function () {
            const taskId = 0

            // Create a task with a 1 hour timer
            const taskName = "Write module for contract"
            await this.token1.connect(this.bob).createTask(taskName, 0, 1)

            let bobTask = await this.token1.tasks(taskId)

            expect(bobTask.name).to.equal(taskName)
            expect(bobTask.completed).to.equal(false)
            expect(bobTask.timeLeft).to.above(0)

            // Time skip 1 hours
            increase(duration.hours("1"))

            // Task complition
            await this.token1.connect(this.bob).completeTask(taskId)

            bobTask = await this.token1.tasks(taskId)

            expect(bobTask.completed).to.equal(true)
            expect(await this.token1.notInDeadline(taskId)).to.equal(true)
        })
    })

    describe("Task deletion", function () {
        it("Should delete task", async function () {
            const taskId = 0

            // Task creation
            const taskName = "Write module for contract"
            await this.token1.connect(this.bob).createTask(taskName, 0, 1)

            let bobTask = await this.token1.tasks(taskId)

            expect(bobTask.name).to.equal(taskName)
            expect(bobTask.completed).to.equal(false)
            expect(bobTask.timeLeft).to.above(0)

            // Task deletion
            await this.token1.connect(this.bob).deleteTask(taskId)

            // Check tasks mapping
            bobTask = await this.token1.tasks(taskId)

            expect(bobTask.name).to.equal("")
            expect(bobTask.completed).to.equal(false)
            expect(bobTask.timeLeft).to.equal(0)
        })

        it("Should delete task only owner", async function () {
            const taskId = 0
            const taskOwner = this.bob

            // Task creation
            const taskName = "Write module for contract"
            await this.token1.connect(taskOwner).createTask(taskName, 0, 1)

            const bobTask = await this.token1.tasks(taskId)

            expect(bobTask.name).to.equal(taskName)
            expect(bobTask.completed).to.equal(false)
            expect(bobTask.timeLeft).to.above(0)

            // Task complition by a non-owner
            await expect(this.token1.connect(this.misha).deleteTask(taskId)).to.be.revertedWith("Not task owner")

            // Task shouldn't have changed
            expect(await this.token1.tasks(taskId)).to.deep.equal(bobTask)
        })

        it("Should fail if task with this id is not exist", async function () {
            const taskId = 10
            const taskOwner = this.bob

            // Task deletion by a non-owner
            await expect(this.token1.connect(this.misha).deleteTask(taskId)).to.be.revertedWith("No such task")

            // Task with this id shouldn't exist
            let bobTask = await this.token1.tasks(taskId)

            expect(bobTask.name).to.equal("")
            expect(bobTask.completed).to.equal(false)
            expect(bobTask.timeLeft).to.equal(0)
        })
    })

    describe("Task list", function () {
        it("Should get an array of tasks", async function () {
            const taskId = 0

            // Task creation
            const taskName = "Write module for contract"
            await this.token1.connect(this.bob).createTask(taskName, 0, 1)

            let bobTask = await this.token1.tasks(taskId)

            expect(bobTask.name).to.equal(taskName)
            expect(bobTask.completed).to.equal(false)
            expect(bobTask.timeLeft).to.above(0)

            // Task list
            const taskList = await this.token1.connect(this.bob).getTaskList()
            expect(taskList).to.deep.equal([bobTask])
        })
    })

    describe("Tasks statistic", function () {
        it("Should get percentage of completed not in deadline tasks", async function () {
            const taskId = 0
            const taskOwner = this.bob

            // Task creation
            const taskName = "Write module for contract"
            await this.token1.connect(taskOwner).createTask(taskName, 0, 1)

            let bobTask = await this.token1.tasks(taskId)

            expect(bobTask.name).to.equal(taskName)
            expect(bobTask.completed).to.equal(false)
            expect(bobTask.timeLeft).to.above(0)

            // Task complition
            await this.token1.connect(taskOwner).completeTask(taskId)

            bobTask = await this.token1.tasks(taskId)

            // Task's status should have changed
            expect(bobTask.completed).to.equal(true)

            // Tasks percentage
            const percentage = await this.token1.connect(taskOwner).getStatisticByAddress(taskOwner.address)
            expect(percentage).to.equal(100)
        })

        it("Should get 0 if owner don't have any completed tasks", async function () {
            const taskId = 0
            const taskOwner = this.bob

            // Task creation
            const taskName = "Write module for contract"
            await this.token1.connect(taskOwner).createTask(taskName, 0, 1)

            let bobTask = await this.token1.tasks(taskId)

            expect(bobTask.name).to.equal(taskName)
            expect(bobTask.completed).to.equal(false)
            expect(bobTask.timeLeft).to.above(0)

            // Tasks percentage
            const percentage = await this.token1.connect(taskOwner).getStatisticByAddress(taskOwner.address)
            expect(percentage).to.equal(0)
        })
    })
})
