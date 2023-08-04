<script>
  import { fade, slide } from 'svelte/transition';

  export let label;
  export let errorMessage = "";
</script>


<div class="wrap">

  <div class="content">
    <label>{label}</label>
    <div class="input">
      <slot />
    </div>
  </div>

  {#if errorMessage}
    <div class="error" in:slide out:fade>{errorMessage}</div>
  {/if}

</div>


<style>
  .wrap {
    margin-bottom: 1rem;
  }

  .content {
    display: flex;
    align-items: center;
  }

  label {
    width: 100px;
  }

  .input {
    flex: 1;
  }

  .error {
    color: #f00;
    margin-left: 100px;
    margin-top: 0.5rem;
  }
</style>