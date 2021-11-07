#!/bin/sh

# Hyperledger Irohaのコンテナ環境を構築するコマンド
echo "create&start Hyperledger Iroha Program!!"
# docker 起動
docker-compose up -d
# 起動中のコンテナを確認する。
docker ps 