// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract TodoList {

   struct Task {
        string name;
        bool completed;
        bool inDeadline;
        uint timeLeft;
    }

    Task[] public tasks;

    mapping(uint => address) taskToOwner;

    modifier onlyOwner(uint _taskId) {
        require(msg.sender == taskToOwner[_taskId]);
        _;
    }

    function createTask(string memory _name, uint _days, uint _hours, uint _seconds) public {
        tasks.push(Task(
            _name,
            false,
            true,
            block.timestamp + (_days * 1 days) + (_hours * 1 hours) + (_seconds * 1 seconds)));
        taskToOwner[tasks.length - 1] = msg.sender;
    }

    function deleteTask(uint _taskId) public onlyOwner(_taskId) {
        delete tasks[_taskId];
        delete taskToOwner[_taskId];
    }

    function completeTask(uint _taskId) public onlyOwner(_taskId) {
        require(!tasks[_taskId].completed);
        tasks[_taskId].completed = true;
        if (block.timestamp > tasks[_taskId].timeLeft)
            tasks[_taskId].inDeadline = false;
    }

    function taskList() public view returns(Task[] memory) {
        return tasks;
    }

    function oneTask(uint _taskId) public view returns(Task memory) {
        return tasks[_taskId];
    }

    function myStatistic() public view returns(uint) {
        uint taskCounter = 0;
        uint completedInDeadlineCounter = 0;
        for (uint i = 0; i < tasks.length; i++) {
            if (tasks[i].completed && taskToOwner[i] == msg.sender) {
                taskCounter++;
                if (tasks[i].inDeadline)
                    completedInDeadlineCounter++;
            }
        }
        return (completedInDeadlineCounter * 100) / taskCounter;
    }
}
