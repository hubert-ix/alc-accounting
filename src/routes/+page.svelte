<script>
  import { fade } from "svelte/transition";
  import OperationForm from "$lib/OperationForm.svelte";
  import OperationsFilters from "$lib/OperationsFilters.svelte";
  import OperationsList from "$lib/OperationsList.svelte";

  export let data;

  let { categories, operations } = data;
  let saving = false;
  let filtering = false;
  let showInputForm = false;

  // sort the categories alphabetically
  categories.sort((a, b) => a.name.localeCompare(b.name));

  async function updateList(e) {
    filtering = true;
    let data = e.detail;
    let result = await fetch("/api/operations/list", { method: "POST", body: JSON.stringify(data), headers: {'content-type': 'application/json'}});
    let response = await result.json();
    operations = response.operations;
    filtering = false;
  }

  async function createOperation(e) {
    saving = true;
    let values = e.detail.values;
    let data = { values };
    let result = await fetch("/api/operations/create", { method: "POST", body: JSON.stringify(data), headers: {'content-type': 'application/json'}});
    let response = await result.json();
    let newOperation = response.operation;
    operations = [...operations, newOperation];
    saving = false;
  }

  async function deleteOperation(e) {
    let operation = e.detail.operation;
    operations = operations.filter(obj => obj.id != operation.id);
    let data = { id: operation.id };
    await fetch("/api/operations/delete", { method: "POST", body: JSON.stringify(data), headers: {'content-type': 'application/json'}});
  }
</script>


<div in:fade>
  <Filters {categories} on:change={updateList} on:toggleInputForm={() => showInputForm = !showInputForm} />
  {#if showInputForm}
    <OperationForm {categories} {saving} on:saved={createOperation} />
  {/if}
  <OperationsList {operations} {categories} {filtering} on:delete={deleteOperation} />
</div>


<style>
</style>