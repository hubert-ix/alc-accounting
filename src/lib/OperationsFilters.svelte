<script>
  import { createEventDispatcher } from 'svelte';
  import dayjs from 'dayjs';
  import localeData from 'dayjs/plugin/localeData.js';
  import SelectInput from "$lib/UI/SelectInput.svelte";
  import Button from "$lib/UI/Button.svelte";

  dayjs.extend(localeData);

  export let categories;

  let dispatch = createEventDispatcher();
  let currentYear = dayjs().year();
  let currentMonth = dayjs().month() + 1;

  let selectedYear = currentYear;
  let selectedMonth = currentMonth;
  let selectedCategory = 0;

  // set the years
  let years = [
    {value: 0, label: "All years"}
  ];
  for (let y = currentYear; y > currentYear - 10; y--) {
    years.push({value: y, label: y});
  }

  // set the months
  let monthsArray = dayjs.months();
  let months = [
    {value: 0, label: "All months"}
  ];
  for (let i in monthsArray) {
    months.push({value: parseInt(i) + 1, label: monthsArray[i]});
  }

  // set categories
  let categoryOptions = [
    {value: 0, label: "All categories"},
  ];
  for (let i in categories) {
    categoryOptions.push({value: categories[i].id, label: categories[i].name});
  }

  function change() {
    dispatch("change", {year: selectedYear, month: selectedMonth, categoryId: selectedCategory});
  }
</script>


<div class="selection-form">

  <div>Show</div>
  <SelectInput options={years} bind:value={selectedYear} on:change={change} />
  <SelectInput options={months} bind:value={selectedMonth} on:change={change} />
  <SelectInput options={categoryOptions} bind:value={selectedCategory} on:change={change} />
  <Button caption="+" style="small" on:click={() => dispatch("toggleInputForm")} />

</div>


<style>
  .selection-form {
    border: solid 2px var(--color-primary);
    padding: 2rem;
    background: var(--color-light);
    display: flex;
    align-items: center;
    grid-column-gap: 1rem;
    margin-bottom: 1rem;
  }
</style>