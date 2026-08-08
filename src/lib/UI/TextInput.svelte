<script>
  let { 
    name, 
    value = $bindable(), 
    type = "text", 
    placeholder = "", 
    disabled = false, 
    changed = () => {},
  } = $props();
</script>


{#if type == "text"}
  <input type="text" {name} id={name} {placeholder} {disabled} bind:value oninput={changed} />
{:else if type == "date"}
  <input type="date" {name} id={name} {placeholder} {disabled} bind:value oninput={changed} />
{:else if type == "password"}
  <input type="password" {name} id={name} {placeholder} {disabled} bind:value oninput={changed} />
{/if}


<style>
  input {
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--color-text);
    padding: 0.5rem;
    border: 2px solid #f4a5a0;
    border-radius: 0.5rem;
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