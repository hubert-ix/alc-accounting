<script>
  import { enhance } from '$app/forms';

  let { user } = $props();
</script>


<div class="wrap">

  <h1>Happy Bookkeeping</h1>

  <div class="buttons">
    {#if user}
      <form method="POST" action="/logout" use:enhance id="logout">
        <button type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out h-4 w-4" aria-hidden="true" data-tsd-source="/src/routes/index.tsx:95:15"><path d="m16 17 5-5-5-5"></path><path d="M21 12H9"></path><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path></svg>
          Log out
        </button>
      </form>
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