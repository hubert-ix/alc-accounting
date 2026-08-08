<script>
  import { goto } from '$app/navigation';
  import dayjs from 'dayjs';
  import localeData from 'dayjs/plugin/localeData.js';
  import SelectInput from "$lib/UI/SelectInput.svelte";
  import Button from "$lib/UI/Button.svelte";
  import Stats from './Stats.svelte';

  dayjs.extend(localeData);

  let { categories, toggleInputForm, filter, year, month, categoryId } = $props();
  let currentYear = dayjs().year();
  let selectedYear = $state(year === 'all' ? 'all' : parseInt(year));
  let selectedMonth = $state(month === 'all' ? 'all' : parseInt(month));
  let selectedCategory = $state(categoryId === 'all' ? 'all' : parseInt(categoryId));
  let showStats = $state(false);

  // set the years
  let years = [
    {value: "all", label: "All years"}
  ];
  for (let y = currentYear; y > currentYear - 10; y--) {
    years.push({value: y, label: y});
  }

  // set the months
  let monthsArray = dayjs.months();
  let months = [
    {value: "all", label: "All months"}
  ];
  for (let i in monthsArray) {
    months.push({value: parseInt(i) + 1, label: monthsArray[i]});
  }

  // set categories
  let categoryOptions = [
    {value: "all", label: "All categories"},
  ];
  for (let i in categories) {
    categoryOptions.push({value: categories[i].id, label: categories[i].name});
  }

  function change() {
    filter(selectedYear, selectedMonth, selectedCategory);
  }
</script>


<div class="wrap">

  <div class="filter-row">

    <SelectInput options={years} bind:value={selectedYear} changed={change} />
    <SelectInput options={months} bind:value={selectedMonth} changed={change} />
    <SelectInput options={categoryOptions} bind:value={selectedCategory} changed={change} />

    <button aria-label="Add expense" onclick={toggleInputForm}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus h-5 w-5" aria-hidden="true" data-tsd-source="/src/routes/index.tsx:96:15"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
    </button>

    <button aria-label="Stats" class="stats" onclick={() => showStats = !showStats}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-column h-5 w-5" aria-hidden="true" data-tsd-source="/src/routes/index.tsx:139:17"><path d="M3 3v16a2 2 0 0 0 2 2h16"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg>
    </button>

  </div>
  
  {#if showStats}
    <Stats {selectedYear} {selectedMonth} {categories} />
  {/if}
</div>


<style>
  .wrap {
    padding: 1.25rem 1.5rem;
    background: #fff3b0;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    margin-bottom: 1rem;
  }

  .filter-row {
    display: flex;
    align-items: center;
    grid-column-gap: 1rem;
  }

  button {
    border-radius: 0.75rem;
    background-color: #f27b7b;
    color: #fff;
    min-width: 2.75rem;
    width: 2.75rem;
    height: 2.75rem;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    transition: all .15s;
    display: inline-flex;
    border: 0;
    cursor: pointer;
  }

  button.stats {
    border: solid 2px #f4a5a0;
    color: #ef8b85;
    background: #fff;
  }

  button.stats svg {
    width: 20px;
  }
</style>