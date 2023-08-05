<script>
  import LoadingSpinner from "./LoadingSpinner.svelte";

  export let caption;
  export let disabled = false;
  export let loading = false;
  export let style = "";

  if (loading) {
    disabled = true;
  }
</script>


<button class={style} {disabled} on:click>
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
    border: solid 2px var(--color-secondary);
    color: #fff;
  }

  button:disabled {
    opacity: 0.6;
    cursor: default;
  }

  button.small {
    height: 41px;
    min-width: 41px;
    padding: 0;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button.outlined {
    background: #fff;
    color: var(--color-secondary);
  }
</style>