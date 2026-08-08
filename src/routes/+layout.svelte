<script>
  import Header from "$lib/Header.svelte";
  import './styles.css';

  let { data, children } = $props();
</script>


<svelte:head>
  <title>Happy BookKeeping</title>
</svelte:head>

<main class="container">

  <Header user={data.user} />

  <div class="content">
    {@render children?.()}
  </div>

</main>

