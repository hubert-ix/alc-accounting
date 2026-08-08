<script>
  import { goto, invalidate } from '$app/navigation';
  import OperationForm from '$lib/OperationForm.svelte';
  import * as api from '$lib/api';

  let { data } = $props()
  let saving = $state(false);

  async function updateOperation(values) {
    saving = true;
    await api.patch(fetch, "/api/operations/" + data.operation.id, values);
    await goto("/", { invalidateAll: true });
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') {
      goto("/");
    }
  }
</script>


<OperationForm operation={data.operation} categories={data.categories} {saving} saved={updateOperation} />

<svelte:window onkeydown={handleKeydown} />
