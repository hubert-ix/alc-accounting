<script>
  import { createEventDispatcher } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  
  const dispatch = createEventDispatcher();

  export let showCloseButton = true;
  
  function close() {
    dispatch("close");
  }
  
  function sendShowEvent() {
    dispatch("show");
  }
</script>


<div class="modal-backdrop" transition:fade on:introend={sendShowEvent}>

  <div class="modal" transition:fly={{y: 300}}>
  
    <slot />
    
    {#if showCloseButton}
      <button on:click|preventDefault={close} class="close">X</button>
    {/if}

  </div>

</div>


<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.75);
    z-index: 10;
    display: grid;
    place-items: center;
  }

  .modal {
    position: relative;
    width: 80%;
    max-width: 600px;
    max-height: 80vh;
    background: #fff;
    border-radius: 5px;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 32px;
    /*overflow-y: auto;*/
  }
  
  .close {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 0;
    border: none;
    outline: none;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
</style>