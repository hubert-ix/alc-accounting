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
    const cats = await sql`SELECT * FROM categories;`;
    console.log("success")
  }
</script>

{process.env.POSTGRES_URL}
<Button caption="Import categories" on:click={importCategories} />

