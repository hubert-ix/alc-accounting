<script>
  import { currentUser } from '$lib/stores/currentUser';
  import '../styles.css';

  export let data;

  $currentUser = data.currentUser;
</script>


<svelte:head>
  <title>Ultra Cool Accounting++</title>
</svelte:head>

<main class="container">

  <h1>Ultra Cool Accounting++ 2.0</h1>

  {#if $currentUser}
    <a href="/logout" id="logout">Logout</a>
  {/if}

  <div class="content">
    <slot />
  </div>

</main>


<style>
  h1 {
    background: var(--color-primary);
    margin: 1rem 0 0 0;
    padding: 1rem;
    color: #fff;
    font-size: 2rem;
  }

  #logout {
    position: absolute;
    top: 10px;
    right: 1.5rem;
    text-decoration: underline;
  }
</style>