# TodoList

Контракт списка задач.
Также в корне проекта должен быть файл .env содержащий PRIVATE_KEY - приватный ключ проекта Infura, и MNEMONIC - секретные слова от кошелька(те которые никто не должен узнать).<br/>
Эти два параметра нужны при деплое контракта в тестовую сеть Ropsten.<br/>
<br/>

## Развернутый контракт в Ropsten:<br/>

transaction hash: 0xd13f6c806c9ece538784c9925a602407f1a903cc71d950305cfe85730bc132d7<br/>
Blocks: 2 Seconds: 13<br/>
contract address: 0x67C208154718e5543F294B73F8BE717974D8e728<br/>
block number: 12197487<br/>
block timestamp: 1650051745<br/>
account: 0x45C942FCe98eFf30b6002F7c2fC4860547B542c9<br/>
balance: 0.297280027484768154<br/>
gas used: 1087989 (0x1099f5)<br/>
gas price: 2.500000014 gwei<br/>
value sent: 0 ETH<br/>
total cost: 0.002719972515231846 ETH<br/>

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
