<script>
  import './styles.css';

  let { data, children } = $props();
</script>


<svelte:head>
  <title>Happy BookKeeping</title>
</svelte:head>

<main class="container">

  <div class="content">
    {@render children?.()}
  </div>

</main>

