<script>
  export let options; // each with value and label
  export let value;
</script>


<select bind:value on:change>
  {#each options as option}
    <option value={option.value}>{option.label}</option>
  {/each}
</select>


<style>
  select {
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--color-text);
    padding: 0.5rem;
    border: solid 2px var(--color-primary);
    border-radius: 0;
    width: 100%;
  }
</style>