<script>
  import { createEventDispatcher } from "svelte";
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import dayjs from "dayjs";
  import Modal from "$lib/UI/Modal.svelte";
  import Button from "$lib/UI/Button.svelte";
  import LoadingSpinner from "$lib/UI/LoadingSpinner.svelte";

  export let operations;
  export let categories;
  export let filtering;

  let dispatch = createEventDispatcher();
  let showPopup = false;
  let selectedOperation;

  let totalAmount = 0;
  let totalHST = 0;
  let totalTip = 0;

  for (let i in operations) {
    totalAmount += operations[i].amount;
    totalHST += operations[i].hst;
    totalTip += operations[i].tip;
  }

  function displayCategory(categoryId) {
    let category = categories.find(obj => obj.id == categoryId);
    return category.name;
  }

  function openPopup(operation) {
    selectedOperation = operation;
    showPopup = true;
  }

  function deleteOperation() {
    showPopup = false;
    dispatch("delete", {operation: selectedOperation});
  }
</script>


<div class="wrap">
  <table class:masked={filtering}>
    <tr>
      <th>Date</th>
      <th>Company</th>
      <th>Description</th>
      <th>Category</th>
      <th>Amount</th>
      <th>HST</th>
      <th>Tip</th>
      <th></th>
      <th></th>
    </tr>
    {#each operations as operation (operation.id)}
      <tr animate:flip={{duration: 400}}>
        <td>{dayjs(operation.date).format("DD/MM/YYYY")}</td>
        <td>{operation.company}</td>
        <td>{operation.description}</td>
        <td>{displayCategory(operation.category)}</td>
        <td class="price">{operation.amount.toFixed(2)}</td>
        <td class="price">{operation.hst.toFixed(2)}</td>
        <td class="price">{operation.tip.toFixed(2)}</td>
        <td class="small edit"><a href="/"><img src="/images/icon-edit.svg" alt="edit" width="20" /></a></td>
        <td class="small"><a on:click={() => openPopup(operation)}><img src="/images/icon-delete.svg" alt="delete" width="12" /></a></td>
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
  </table>

  {#if filtering}
    <div class="loading" transition:fade>
      <LoadingSpinner />
    </div>
  {/if}
</div>


{#if showPopup}
  <Modal on:close={() => showPopup = false}>
    <p>Are you sure you want to delete this operation?</p>
    <Button caption="Delete" on:click={deleteOperation} />
    <Button caption="Cancel" style="outlined" on:click={() => showPopup = false} />
  </Modal>
{/if}


<style>
  .wrap {
    position: relative;
  }

  table.masked {
    opacity: 0.3;
  }

  td.price {
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

  tr.total td {
    border-top: 2px solid var(--color-primary);
    background: #ffffd7;
    font-weight: bold;
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
</style>