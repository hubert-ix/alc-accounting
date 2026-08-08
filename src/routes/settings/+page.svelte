<script>
  import { flip } from "svelte/animate";
  import { invalidate } from "$app/navigation";
  import * as api from '$lib/api';
    import TextInput from "$lib/UI/TextInput.svelte";
    import { tick } from "svelte";

  let { data } = $props();
  let editingId = $state(null);
  let editingName = $state("");

  async function togglePublish(category) {
    let status = (category.status == "published")?"unpublished":"published";
    await api.patch(fetch, "/api/categories/" + category.id, {status});
    await invalidate('main');
  }

  async function startEdit(category) {
    editingId = category.id;
    editingName = category.name;
    await tick();
    document.getElementById("category-name").focus();
  }

  function cancelEdit() {
    editingId = null;
    editingName = "";
  }

  async function saveEdit(category) {
    if (editingId !== category.id) return; // already closed (e.g. via Escape)
    const name = editingName.trim();
    if (!name || name === category.name) {
      cancelEdit();
      return;
    }
    await api.patch(fetch, "/api/categories/" + category.id, { name });
    await invalidate('main');
    cancelEdit();
  }

  function handleKeydown(e, category) {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveEdit(category);
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit();
    }
  }
</script>


<div class="table-wrap">
  <table>
    <thead>
      <tr>
        <th>Category</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {#each data.categories as category (category.id)}
        <tr class="row" animate:flip={{duration: 400}}>
          <td>
            {#if editingId === category.id}
              <div class="edit-wrap" onkeydown={(e) => handleKeydown(e, category)} onfocusout={() => saveEdit(category)}>
                <TextInput name="category-name" bind:value={editingName} />
              </div>
            {:else}
              {category.name}
            {/if}
          </td>
          <td>
            <div class="badge" class:unpublished={category.status == 'unpublished'}>
              {category.status}
            </div>
          </td>
          <td class="small">
            <div class="row-actions">
              <button aria-label="Edit" onclick={() => startEdit(category)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil h-4 w-4" aria-hidden="true"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path><path d="m15 5 4 4"></path></svg>
              </button>
              <button aria-label="Unpublish" onclick={() => togglePublish(category)}>
                {#if category.status == "published"}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off h-4 w-4" aria-hidden="true"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"></path><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"></path><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"></path><path d="m2 2 20 20"></path></svg>
                {:else}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye h-4 w-4" aria-hidden="true" data-tsd-source="/src/routes/settings.tsx:139:93"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>
                {/if}
              </button>
              <button aria-label="Remove" class="delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x h-5 w-5" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
              </button>
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  
</div>


<style>
  .row-actions {
    display: flex;
    align-items: center;
    gap: 0rem;
  }

  button {
    border: 0;
    background: none;
  }

  .row-actions button {
    color: #f27b7b;
    display: flex;
    cursor: pointer;
  }

  .row-actions button svg {
    width: 16px;
  }

  .row-actions button.delete svg {
    width: 20px;
  }

  .badge {
    background-color: #fde0dd;
    border-radius: 9999px;
    align-items: center;
    padding: .25rem .75rem;
    font-size: .8rem;
    font-weight: 700;
    display: inline-flex;
  }

  .badge.unpublished {
    background-color: #fff;
    color: #2c2c2c;
    border: solid 1px #f4a5a0;
    opacity: 0.6;
  }

  td.small {
    width: 10rem;
  }
</style>