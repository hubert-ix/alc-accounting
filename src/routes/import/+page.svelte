<script>
  import { sql } from '@vercel/postgres';
  import Button from "$lib/UI/Button.svelte";

  async function importCategories() {
    let categories = [
      'Movie / concert',
      'CD & DVD',
      'Computer software',
      'Bank fees',
      'Restaurant',
      'Restaurant (single)',
      'Photography costs',
      'Advertising & promotion',
      'Courier & postage',
      'Office furniture',
      'Music equipment',
      'TTC',
      'Travel',
      'Office supplies',
      'Computer / print supplies',
      'Legal & accounting',
      'Cell phone',
      'Computer hardware',
      'Internet',
      'Donation',
      'Coaching and courses',
      'Something',
      'Books',
      'Landline',
      'Hydro',
      'Gifts'
    ];
    for (let i in categories) {
      let data = {name: categories[i]}
      await fetch("/api/categories/create", { method: "POST", body: JSON.stringify(data), headers: {'content-type': 'application/json'}});
    }
    console.log("success")
  }

  export let data;
  console.log("DATA", data)
</script>

<!--
<Button caption="Import categories" on:click={importCategories} />
-->
