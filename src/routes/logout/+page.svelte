<script>
  import { onMount } from 'svelte';
  import { currentUser } from '$lib/stores/currentUser.js';

  onMount(async () => {
    console.log("Loggin out");
    $currentUser = null;
    location.href = "/login"; // we do this force refresh so that +layout.server.js is called
  });
</script>