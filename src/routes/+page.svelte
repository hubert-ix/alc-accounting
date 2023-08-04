<script>
  import { fade } from "svelte/transition";
  import InputForm from "./InputForm.svelte";
  import SelectionForm from "./SelectionForm.svelte";
  import OperationsList from "./OperationsList.svelte";

  export let data;

  let { categories, operations } = data;
  let saving = false;
  let showInputForm = false;

  // sort the categories alphabetically
  categories.sort((a, b) => a.name.localeCompare(b.name));

  function updateList(e) {
    console.log(e.detail)
  }

  async function createOperation(e) {
    saving = true;
    let values = e.detail.values;
    let data = { values };
    let result = await fetch("/api/operations/create", { method: "POST", body: JSON.stringify(data), headers: {'content-type': 'application/json'}});
    let response = await result.json();
    let newOperation = {id: response.id, ...values};
    console.log(newOperation)
    saving = false;
  }
</script>


<div in:fade>
  <SelectionForm {categories} on:change={updateList} on:toggleInputForm={() => showInputForm = !showInputForm} />
  {#if showInputForm}
    <InputForm {categories} {saving} on:saved={createOperation} />
  {/if}
  <OperationsList {operations} />
</div>


<style>
</style>