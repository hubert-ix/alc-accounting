<script>
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import { goto, invalidate } from "$app/navigation";
  import dayjs from "dayjs";
  import Modal from "$lib/UI/Modal.svelte";
  import Button from "$lib/UI/Button.svelte";
  import LoadingSpinner from "$lib/UI/LoadingSpinner.svelte";
  import OperationForm from "$lib/OperationForm.svelte";
  import Filters from "$lib/Filters.svelte";
  import * as api from '$lib/api';

  let { data } = $props();
  let saving = $state(false);
  let filtering = $state(false);
  let showInputForm = $state(false);
  let showPopup = $state(false);
  let deleting = $state(false);
  let selectedOperation;
  let totalAmount = $derived(data.operations.reduce((sum, o) => sum + o.amount, 0));
  let totalHST = $derived(data.operations.reduce((sum, o) => sum + o.hst, 0));
  let totalTip = $derived(data.operations.reduce((sum, o) => sum + o.tip, 0));

  async function filterList(year, month, categoryId) {
    const params = new URLSearchParams();
    if (year) params.set('year', year);
    if (month) params.set('month', month);
    if (categoryId) params.set('category_id', categoryId);
    goto(`?${params}`, { keepFocus: true, noScroll: true })
  }

  async function createOperation(values) {
    saving = true;
    await api.post(fetch, "/api/operations", values);
    await invalidate('main');
    saving = false;
    showInputForm = false;
  }

  async function deleteOperation(id) {
    deleting = true;
    await api.del(fetch, "/api/operations/" + id);
    await invalidate('main');
    showPopup = false;
    deleting = false;
  }

  function displayCategory(categoryId) {
    let category = data.categories.find(obj => obj.id == categoryId);
    if (typeof category !== "undefined") {
      return category.name;
    }
    else {
      return "- unknown -"
    }
  }

  function openPopup(operation) {
    selectedOperation = operation;
    showPopup = true;
  }

  function handleKeydown(e) {
    if (e.key === 'Escape' && showInputForm) {
      showInputForm = false;
      return;
    }
    if (showInputForm) return; // form open — let native Enter-to-submit behavior handle it
    if (e.key !== 'Enter') return;
    const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName);
    if (isTyping) return; // don't hijack Enter if focus is in a filter dropdown, etc.
    e.preventDefault();
    showInputForm = true;
  }
</script>


<div in:fade>

  <Filters categories={data.categories} filter={filterList} year={data.year} month={data.month} categoryId={data.categoryId} toggleInputForm={() => showInputForm = !showInputForm} />
  
  {#if showInputForm}
    <OperationForm categories={data.categories} {saving} saved={createOperation} cancelled={() => showInputForm = !showInputForm} />
  {/if}
  
  <div class="wrap">
    <table class:masked={filtering}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Company</th>
          <th>Description</th>
          <th>Category</th>
          <th class="price">Amount</th>
          <th class="price">HST</th>
          <th class="price">Tip</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {#each data.operations as operation (operation.id)}
          <tr class="row" animate:flip={{duration: 400}}>
            <td>{dayjs(operation.date).format("DD/MM/YYYY")}</td>
            <td>{operation.company}</td>
            <td>{operation.description}</td>
            <td>{displayCategory(operation.category_id)}</td>
            <td class="price">{operation.amount.toFixed(2)}</td>
            <td class="price">{operation.hst.toFixed(2)}</td>
            <td class="price">{operation.tip.toFixed(2)}</td>
            <td class="small edit"><a href="/operations/{operation.id}"><img src="/images/icon-edit.svg" alt="edit" width="20" /></a></td>
            <td class="small"><a onclick={() => openPopup(operation)}><img src="/images/icon-delete.svg" alt="delete" width="12" /></a></td>
          </tr>
        {/each}
        <tr class="total">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td class="price">{totalAmount.toFixed(2)}</td>
          <td class="price">{totalHST.toFixed(2)}</td>
          <td class="price">{totalTip.toFixed(2)}</td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>

    {#if filtering}
      <div class="loading" transition:fade>
        <LoadingSpinner />
      </div>
    {/if}
    
  </div>
</div>

{#if showPopup}
  <Modal on:close={() => showPopup = false}>
    <p>Are you sure you want to delete this operation?</p>
    <div class="buttons">
      <Button caption="Delete" loading={deleting} clicked={() => deleteOperation(selectedOperation.id)} />
      <Button caption="Cancel" style="outlined" clicked={() => showPopup = false} />
    </div>
  </Modal>
{/if}

<svelte:window onkeydown={handleKeydown} />


<style>
  .wrap {
    position: relative;
    background-color: #ffffffb3;
    border-radius: 0.5rem;
    overflow: hidden;
    border: solid 2px #fff3b0;
  }

  table.masked {
    opacity: 0.3;
  }

  td.price, th.price {
    text-align: right;
  }

  td.small {
    width: 60px;
    padding: 0;
    text-align: center;
  }

  td.edit {
    text-align: right;
  }

  tr.total {
    background: #fff3b0;
    border-top: 1px solid color-mix(in oklab, #f4a5a0 40%, transparent);
  }

  tr.total td {
    font-weight: 800;
  }

  img {
    color: var(--color-secondary);
  }

  .loading {
    position: absolute;
    top: 6rem;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
  }

  .buttons {
    display: flex;
    grid-column-gap: 1rem;
  }
</style>