### DBコンテナ作成コマンド
    docker run -it -d --name some-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 --network=iroha-network postgres:9.5
    docker run -it -d --name some-postgres1 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=mysecretpassword -p 25432:5432 --network=iroha-network postgres:9.5
    docker run -it -d --name some-postgres2 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=mysecretpassword -p 35432:5432 --network=iroha-network postgres:9.5

### node用コンテナ作成コマンド
    docker run -it -d --name iroha -p 50051:50051 -v ~/git/iroha/example:/opt/iroha_data -v blockstore:/tmp/block_store --network=iroha-network --entrypoint=/bin/bash hyperledger/iroha:develop

    docker run -it -d --name iroha1 -p 52051:50051 -v ~/git/iroha/example1:/opt/iroha_data -v blockstore1:/tmp/block_store --network=iroha-network --entrypoint=/bin/bash hyperledger/iroha:develop

    docker run -it -d --name iroha2 -p 53051:50051 -v ~/git/iroha/example2:/opt/iroha_data -v blockstore2:/tmp/block_store --network=iroha-network --entrypoint=/bin/bash hyperledger/iroha:develop