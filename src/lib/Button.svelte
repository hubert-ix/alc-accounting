<script>
  import LoadingSpinner from "./LoadingSpinner.svelte";

  export let caption;
  export let disabled = false;
  export let loading = false;

  if (loading) {
    disabled = true;
  }
</script>


<button {disabled}>
  {#if !loading}
    {caption}
  {:else}
    <div class="loading">
      <LoadingSpinner size="small" style="white" />
    </div>
  {/if}
</button>


<style>
  button {
    font-family: var(--font-body);
    font-size: 1rem;
    cursor: pointer;
    padding: 1rem 2rem;
    background: var(--color-secondary);
    border: none;
    color: #fff;
  }

  button:disabled {
    opacity: 0.6;
  }
</style>