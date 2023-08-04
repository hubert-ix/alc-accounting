<script>
  import { createEventDispatcher } from 'svelte';
  import dayjs from 'dayjs';
  import localeData from 'dayjs/plugin/localeData.js';
  import SelectInput from "$lib/SelectInput.svelte";

  dayjs.extend(localeData);

  let dispatch = createEventDispatcher();
  let currentYear = dayjs().year();
  let currentMonth = dayjs().month();

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

  let categories = [
    {value: 0, label: "All categories"},
    {value: 1, label: "ok"},
    {value: 2, label: "fantastic"},
  ];

  function change() {
    dispatch("change", {year: selectedYear, month: selectedMonth, category: selectedCategory});
  }
</script>


<div class="selection-form">

  <SelectInput options={years} bind:value={selectedYear} on:change={change} />
  <SelectInput options={months} bind:value={selectedMonth} on:change={change} />
  <SelectInput options={categories} bind:value={selectedCategory} on:change={change} />

</div>


<style>
  .selection-form {
    border: solid 2px var(--color-primary);
    padding: 2rem;
    background: var(--color-light);
    display: flex;
    grid-column-gap: 1rem;
  }
</style>