<script>
  import { sql } from '@vercel/postgres';
  import Button from "$lib/Button.svelte";

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
      'Books',
      'Landline',
      'Hydro',
      'Gifts'
    ];
    /*
    for (let i in categories) {
      await sql`
        INSERT INTO categories (name) VALUES (${categories[i]})
      `;
    }*/
    
    let data = {ok: "cool"};
    let result = await fetch("/api/categories/list", {method: "POST", body: JSON.stringify(data)});
    let response = await result.json();
    console.log(response)
    //console.log("success")
  }
</script>

<Button caption="Import categories" on:click={importCategories} />

