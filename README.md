# Features

- communicate over grenache-grape
- docker-compose
- cover race-condition (there isn't any)
- all data stored as in DHT
- You can add infinity clients

# How to run

run `docker-compose build` in root folder and then run `docker-compose run`

# TODO list

- implement actual order match: in this version order book generate randomly in client side and there isn't any matching just randomly generate a new list, in next version I should match orders book and in client they should deduct from actual list
