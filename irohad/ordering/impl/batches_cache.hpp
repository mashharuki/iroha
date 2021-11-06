/**
 * Copyright Soramitsu Co., Ltd. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

#ifndef IROHA_BATCHES_CACHE_HPP
#define IROHA_BATCHES_CACHE_HPP

#include "ordering/on_demand_ordering_service.hpp"

#include <memory>
#include <numeric>
#include <shared_mutex>
#include <unordered_set>

#include "consensus/round.hpp"

namespace shared_model::interface {
  class TransactionBatch;
}  // namespace shared_model::interface

namespace iroha::ordering {

  /**
   * Contains additional information about batches.
   */
  class BatchesContext {
   public:
    using BatchesSetType = std::unordered_set<
        std::shared_ptr<shared_model::interface::TransactionBatch>,
        OnDemandOrderingService::BatchPointerHasher,
        shared_model::interface::BatchHashEquality>;

    BatchesContext(BatchesContext const &) = delete;
    BatchesContext &operator=(BatchesContext const &) = delete;
    BatchesContext();

   private:
    /// Save this value in additional field to avoid batches iteration on
    /// request.
    uint64_t tx_count_;
    BatchesSetType batches_;

    static uint64_t count(BatchesSetType const &src);

   public:
    uint64_t getTxsCount() const;

    BatchesSetType const &getBatchesSet() const;

    bool insert(std::shared_ptr<shared_model::interface::TransactionBatch> const
                    &batch);

    bool removeBatch(
        std::shared_ptr<shared_model::interface::TransactionBatch> const
            &batch);

    void merge(BatchesContext &from);

    template <typename _Predic>
    void remove(_Predic &&pred) {
      bool process_iteration = true;
      for (auto it = batches_.begin();
           process_iteration && it != batches_.end();)
        if (std::forward<_Predic>(pred)(*it, process_iteration)) {
          auto const erased_size = (*it)->transactions().size();
          it = batches_.erase(it);

          assert(tx_count_ >= erased_size);
          tx_count_ -= erased_size;
        } else
          ++it;

      assert(count(batches_) == tx_count_);
    }
  };

  /**
   * Contains information about all and used batches. Thread-safe.
   */
  class BatchesCache {
   public:
    using BatchesSetType = BatchesContext::BatchesSetType;

   private:
    mutable std::shared_mutex batches_cache_cs_;
    BatchesContext batches_cache_, used_batches_cache_;

   public:
    BatchesCache(BatchesCache const &) = delete;
    BatchesCache &operator=(BatchesCache const &) = delete;
    BatchesCache() = default;

    uint64_t insert(
        std::shared_ptr<shared_model::interface::TransactionBatch> const
            &batch);

    void remove(const OnDemandOrderingService::HashesSetType &hashes);

    bool isEmpty() const;

    uint64_t txsCount() const;
    uint64_t availableTxsCount() const;

    void forCachedBatches(
        std::function<void(const BatchesSetType &)> const &f) const;

    void getTransactions(
        size_t requested_tx_amount,
        std::vector<std::shared_ptr<shared_model::interface::Transaction>>
            &txs);

    void processReceivedProposal(
        OnDemandOrderingService::CollectionType batches);
  };

}  // namespace iroha::ordering

#endif  // IROHA_BATCHES_CACHE_HPP
