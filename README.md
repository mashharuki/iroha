# iroha
Hyperledger Irohaを学習するためのリポジトリです。

## Hyperledger Iroha
   hyperledgerプロジェクトで4番目に採択されたブロックチェーン
   オリジナルコードについては、ソラミツ株式会社が開発した。

### Hyperledger Irohaのブロック構造の例

~~~

{"blockV1":
   {"payload":
      {"transactions":
         [
            {"payload":
               {"reducedPayload":
                  {"commands":
                     [
                        {"addPeer":
                           {"peer":
                              {"address":"127.0.0.1:10001","peerKey":"bddd58404d1315e0eb27902c5d7c8eb0602c16238f005773df406bc191308929"}
                           }
                        },{"createRole":
                           {"roleName":"admin","permissions":
                              ["can_add_peer","can_add_signatory","can_create_account","can_create_domain","can_get_all_acc_ast","can_get_all_acc_ast_txs","can_get_all_acc_detail","can_get_all_acc_txs","can_get_all_accounts","can_get_all_signatories","can_get_all_txs","can_get_blocks","can_get_roles","can_read_assets","can_remove_signatory","can_set_quorum"]
                           }
                        },{"createRole":
                           {"roleName":"user","permissions":
                              ["can_add_signatory","can_get_my_acc_ast","can_get_my_acc_ast_txs","can_get_my_acc_detail","can_get_my_acc_txs","can_get_my_account","can_get_my_signatories","can_get_my_txs","can_grant_can_add_my_signatory","can_grant_can_remove_my_signatory","can_grant_can_set_my_account_detail","can_grant_can_set_my_quorum","can_grant_can_transfer_my_assets","can_receive","can_remove_signatory","can_set_quorum","can_transfer"]
                           }
                        },{"createRole":
                           {"roleName":"money_creator","permissions":
                              ["can_add_asset_qty","can_create_asset","can_receive","can_transfer"]
                           }
                        },{"createDomain":
                           {"domainId":"test","defaultRole":"user"}
                        },{"createAsset":
                           {"assetName":"coin","domainId":"test","precision":2}
                        },{"createAccount":
                           {"accountName":"admin","domainId":"test","publicKey":"313a07e6384776ed95447710d15e59148473ccfc052a681317a72a69f2a49910"}
                        },{"createAccount":
                           {"accountName":"test","domainId":"test","publicKey":"716fe505f69f18511a1b083915aa9ff73ef36e6688199f3959750db38b8f4bfc"}
                        },{"appendRole":
                           {"accountId":"admin@test","roleName":"admin"}
                        },{"appendRole":
                           {"accountId":"admin@test","roleName":"money_creator"}
                        }
                     ],"quorum":1
                  }
               }
            }
         ],"txNumber":1,"height":"1","prevBlockHash":"0000000000000000000000000000000000000000000000000000000000000000"
      }
   }
}

~~~

### DBコンテナ作成コマンド
    docker run -it -d --name some-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=***** -p 5432:5432 --network iroha-network postgres:9.5

### node用コンテナ作成コマンド
    docker run -it -d --name iroha -p 50051:50051 -v ~/iroha/example:/opt/iroha_data -v blockstore:/tmp/block_store --network=iroha-network --entrypoint=/bin/bash hyperledger/iroha:develop
    
### コンテナへのアクセスコマンド
    docker exec -it iroha /bin/bash 
    
### Dockerホストからコンテナへディレクトリをコピーするコマンド
    docker cp ~/git/iroha/example/ 601126ae851d:/opt/iroha_data
    
### irohaプロセス起動コマンド
    irohad --config config.docker --genesis_block genesis.block --keypair_name node0
