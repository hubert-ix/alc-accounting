<script>
  import * as api from '$lib/api';
    import { fade, slide } from 'svelte/transition';

  let { selectedYear, selectedMonth, categories } = $props();
  let loading = $state(true);
  let stats = $state([]);

  async function loadStats(year, month) {
    loading = true;
    const response = await api.get(fetch, '/api/operations', { year, month, category_id: 'all' });
    const operations = response.operations;
    // group by category
    const totals = {};
    for (const op of operations) {
      const catId = op.category_id;
      if (!totals[catId]) {
        totals[catId] = { amount: 0, hst: 0 };
      }
      totals[catId].amount += op.amount;
      totals[catId].hst += op.hst;
    }
    const grandTotal = Object.values(totals).reduce((sum, t) => sum + t.amount, 0);
    let rows = Object.entries(totals)
      .map(([catId, t]) => {
        const category = categories.find(c => c.id == catId);
        return {
          id: catId,
          name: category ? category.name : '- unknown -',
          amount: t.amount,
          hst: t.hst,
          percent: grandTotal > 0 ? (t.amount / grandTotal) * 100 : 0
        };
      })
      .filter(row => row.amount !== 0)
      .sort((a, b) => b.amount - a.amount);
    stats = rows;
    loading = false;
  }

  $effect(() => {
    loadStats(selectedYear, selectedMonth);
  });
</script>


<div class="stats-box" in:fade>
  {#if loading}
    <div class="loading">Loading...</div>
  {:else if stats.length === 0}
    <div class="empty">No data for this period.</div>
  {:else}
    {#each stats as row (row.id)}
      <div class="row">
        <div class="bar-bg">
          <div class="bar-fill" style="width: {row.percent}%"></div>
          <div class="label">{row.name}</div>
        </div>
        <div class="amount">${row.amount.toFixed(2)}</div>
        <div class="hst">HST ${row.hst.toFixed(2)}</div>
      </div>
    {/each}
  {/if}
</div>


<style>
  .stats-box {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .bar-bg {
    position: relative;
    flex: 1;
    height: 2.5rem;
    background: #fff;
    border: solid 2px #f4a5a0;
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .bar-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: #f4a5a0;
    transition: width 0.3s ease;
  }

  .label {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 0.75rem;
    font-weight: 600;
    color: #5a3a3a;
    white-space: nowrap;
  }

  .amount {
    width: 80px;
    text-align: right;
    font-weight: bold;
  }

  .hst {
    width: 100px;
    text-align: right;
    color: #999;
    font-size: 0.85rem;
  }

  .loading, .empty {
    padding: 1rem;
    color: #999;
    text-align: center;
  }
</style>