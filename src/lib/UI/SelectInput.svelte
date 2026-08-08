<script>
  let { options, value = $bindable(), changed } = $props();
</script>


<div class="wrap">
  <select bind:value onchange={changed}>
    {#each options as option}
      <option value={option.value}>{option.label}</option>
    {/each}
  </select>
  <svg class="filter-select-caret" viewBox="0 0 20 20" fill="none"><path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-tsd-source="/src/routes/index.tsx:193:9"></path></svg>
</div>


<style>
  .wrap {
    position: relative;
    width: 100%;
  }

  select {
    appearance: none;
    border-radius: 0.5rem;
    border: 2px solid #f4a5a0;
    min-width: 180px;
    width: 100%;
    color: var(--color-text);
    cursor: pointer;
    background-color: #fff;
    outline: none;
    padding: .625rem 2.5rem .625rem 1rem;
    font-weight: 600;
    font-family: var(--font-body);
    font-size: 1rem;
    transition: all .15s;
  }

  select:focus {
    border: solid 2px var(--color-primary);
    outline: none;
  }

  svg {
    pointer-events: none;
    width: 1rem;
    height: 1rem;
    color: #ef8b85;
    position: absolute;
    top: 50%;
    right: .75rem;
    transform: translateY(-50%);
  }
</style>