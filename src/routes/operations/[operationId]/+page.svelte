<script>
  import { goto } from '$app/navigation';
  import InputForm from '$lib/InputForm.svelte';

  export let data;

  let { categories, operation } = data;
  let saving = false;

  async function updateOperation(e) {
    saving = true;
    let values = e.detail.values;
    let data = { values, operationId: operation.id };
    await fetch("/api/operations/update", { method: "POST", body: JSON.stringify(data), headers: {'content-type': 'application/json'}});
    goto("/")
  }
</script>


<InputForm {operation} {categories} {saving} on:saved={updateOperation} />
