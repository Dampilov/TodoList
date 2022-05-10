# TodoList

Контракт списка задач.
Также в корне проекта должен быть файл .env содержащий PRIVATE_KEY - приватный ключ проекта Infura, и MNEMONIC - секретные слова от кошелька(те которые никто не должен узнать).<br/>
Эти два параметра нужны при деплое контракта в тестовую сеть Ropsten.<br/>
<br/>

## Развернутый контракт в Ropsten:<br/>

Contract address: 0x028506C9E75552D19D0836F5260c5F8283C1eB0a<br>
Deployer: 0x45C942FCe98eFf30b6002F7c2fC4860547B542c9<br>
deploying "TODO" (tx: 0x159cd9ec543663f3e2dc5fb6a2adb0ed7a5531f6b39cbd4a712a3830596e184c)...:<br>
ChainId: 3<br>
gas used: 904681<br>

## Hardhat tasks:

Создать задачу

```bash
$ npx hardhat create-task --name --days --hours
```

Звершить задачу

```bash
$ npx hardhat complete-task --id
```

Удалить задачу

```bash
$ npx hardhat delete-task --id
```

Посмотреть одну задачу

```bash
$ npx hardhat get-task --id
```

Посмотреть все задачи

```bash
$ npx hardhat task-list
```

Посмотреть процент не простроченных задач

```bash
$ npx hardhat get-statistic --owner
```
