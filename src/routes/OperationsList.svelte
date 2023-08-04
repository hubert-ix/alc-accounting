<script>
  import dayjs from "dayjs";

  export let operations;
</script>


<table>
  <tr>
    <th>Date</th>
    <th>Company</th>
    <th>Description</th>
    <th>Category</th>
    <th>Amount</th>
    <th>HST</th>
    <th>Tip</th>
    <th></th>
    <th></th>
  </tr>
  {#each operations as operation}
    <tr>
      <td>{dayjs(operation.date).format("DD/MM/YYYY")}</td>
      <td>{operation.company}</td>
      <td>{operation.description}</td>
      <td>{operation.category}</td>
      <td>{operation.amount}</td>
      <td>{operation.hst}</td>
      <td>{operation.tip}</td>
      <td><a href="/">Edit</a></td>
      <td><a href="/">X</a></td>
    </tr>
  {/each}
</table>


<style>
  .wrap {
    border: solid 2px var(--color-primary);
    padding: 2rem;
    background: var(--color-light);
    margin-bottom: 1rem;
  }
</style>