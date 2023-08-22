<script>
  import dayjs from "dayjs";
  import utc from 'dayjs/plugin/utc.js';
  import Button from "$lib/UI/Button.svelte";

  let message = "";

  dayjs.extend(utc);

  async function importCategories() {
    //let categories = ['Movie / concert','CD & DVD','Computer software','Bank fees','Restaurant','Restaurant (single)','Photography costs','Advertising & promotion','Courier & postage','Office furniture','Music equipment','TTC','Travel','Office supplies','Computer / print supplies','Legal & accounting','Cell phone','Computer hardware','Internet','Donation','Coaching and courses','Something','Books','Landline','Hydro','Gifts'];
    let categories = ['Venue rental','Music production','Car','Stage clothes','Taxi','Car - gas','Car - insurance','Car - parking','Car - wash','Car - repairs','Car - toll fees','Medical','Streaming'];
    for (let i in categories) {
      message = "importing category " + categories[i];
      let data = {name: categories[i]}
      await fetch("/api/categories/create", { method: "POST", body: JSON.stringify(data), headers: {'content-type': 'application/json'}});
    }
    console.log("success")
  }

  async function importOperations() {
    fetch('/operations.json').then((response) => response.json()).then(async (operations) => {
      for (let i in operations) {
        //if (i > 2) return;
        let op = operations[i];
        message = "importing operation " + op.id;
        let data = {};
        data.values = {
          //id: op.id,
          category_id: op.category_id,
          type: op.type,
          company: op.company,
          description: op.description,
          amount: op.amount,
          hst: op.hst,
          tip: op.tip,
          date: dayjs.unix(op.date).utcOffset().format("YYYY-MM-DD")
        };
        await fetch("/api/operations/create", { method: "POST", body: JSON.stringify(data), headers: {'content-type': 'application/json'}});
      }
      message = "success!";
    });
  }
</script>


<div class="wrap">
  <!--
  <Button caption="Import categories" on:click={importCategories} />
  -->
  <Button caption="Import operations" on:click={importOperations} />

  <div class="console">
    {message}
  </div>
</div>


<style>
  .wrap {
    margin-top: 4rem;
  }

  .console {
    margin-top: 2rem;
  }
</style>