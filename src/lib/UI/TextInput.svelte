<script>
  export let name;
  export let value;
  export let type = "text";
  export let placeholder = "";
  export let disabled = false;
</script>


{#if type == "text"}
  <input type="text" {name} id={name} {placeholder} {disabled} bind:value />
{:else if type == "date"}
  <input type="date" {name} id={name} {placeholder} {disabled} bind:value />
{:else if type == "password"}
  <input type="password" {name} id={name} {placeholder} {disabled} bind:value />
{/if}

<style>
  input {
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--color-text);
    padding: 0.5rem;
    border: solid 2px var(--color-primary);
    border-radius: 0;
    width: 100%;
  }

  input::placeholder {
    color: #bdbdbd;
  }

  input:disabled {
    border-color: #e0e0e0;
    background-color: #eee;
  }

  input:focus {
    border-color: var(--color-primary); 
    outline: none;
  }
</style>