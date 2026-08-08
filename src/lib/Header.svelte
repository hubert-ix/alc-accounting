<script>
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  let { user } = $props();
  let segment = $derived($page.url.pathname.split("/")[1]);
</script>


<div class="wrap" class:round={segment == "settings"}>

  <h1>Happy Bookkeeping</h1>

  <div class="buttons">
    
    {#if segment == "settings"}
      <button aria-label="Back" class="reset" onclick={() => goto("/")}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left h-4 w-4" aria-hidden="true" data-tsd-source="/src/routes/settings.tsx:61:15"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
        Back
      </button>
    {:else}
      <button aria-label="Settings" class="reset" onclick={() => goto("/settings")}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings h-4 w-4" aria-hidden="true" data-tsd-source="/src/routes/index.tsx:105:15"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle></svg>
        Settings
      </button>

      <button aria-label="Reset" class="reset" onclick={() => location.href="/"}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw h-4 w-4" aria-hidden="true" data-tsd-source="/src/routes/index.tsx:91:15"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
        Reset
      </button>

      {#if user}
        <form method="POST" action="/logout" use:enhance id="logout">
          <button type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out h-4 w-4" aria-hidden="true" data-tsd-source="/src/routes/index.tsx:95:15"><path d="m16 17 5-5-5-5"></path><path d="M21 12H9"></path><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path></svg>
            Log out
          </button>
        </form>
      {/if}
    {/if}
  </div>
</div>


<style>
  .wrap {
    background-color: #f4a5a0;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    padding: 1.75rem 2rem;
    display: flex;
    justify-content: space-between;
  }

  .wrap.round {
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2.25rem;
    color: #fff;
    letter-spacing: -.025em;
    font-weight: 800;
    margin: 0;
  }

  .buttons {
    display: flex;
    gap: 1rem;
  }

  button {
    background-color: #f27b7b;
    color: #fff;
    border-radius: 0.75rem;
    align-items: center;
    gap: .5rem;
    padding: .625rem 1.125rem;
    font-weight: 700;
    transition: all .15s;
    display: inline-flex;
    border: 0;
    cursor: pointer;
  }

  button svg {
    width: 16px;
  }

  button.reset {
    background-color: #ffffffeb;
    color: var(--color-text);
  }

  button.reset svg {
    width: 20px;
  }
</style>