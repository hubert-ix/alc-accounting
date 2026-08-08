<script>
  import LoadingSpinner from "./LoadingSpinner.svelte";

  let { caption, disabled, loading, style = "", type = "submit", clicked } = $props();
  //disabled = $derived(loading);
</script>


<button {type} class={style} {disabled} onclick={clicked}>
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
    padding: .625rem 1.25rem;
    background: #f27b7b;
    border: 0;
    border-radius: 0.5rem;
    color: #fff;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
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
    color: var(--color-primary);
    border: solid 1px var(--color-primary);
  }
</style>