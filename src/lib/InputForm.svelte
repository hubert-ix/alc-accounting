<script>
  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';
  import { createForm } from "svelte-forms-lib";
  import dayjs from "dayjs";
  import FormItem from "$lib/UI/FormItem.svelte";
  import Button from "$lib/UI/Button.svelte";
  import TextInput from "$lib/UI/TextInput.svelte";
  import SelectInput from "$lib/UI/SelectInput.svelte";

  export let categories;
  export let saving;

  let dispatch = createEventDispatcher();
  let today = dayjs().format("YYYY-MM-DD");
  let categoryOptions = [
    {value: 0, label: "- Select -"}
  ];
  let typeOptions = [
    {value: "expense", label: "Expense"},
    {value: "income", label: "Income"}
  ];

  for (let i in categories) {
    categoryOptions.push({value: categories[i].id, label: categories[i].name});
  }

  // set up the form
  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      type: "expense",
      date: today,
      company: "",
      description: "",
      amount: "",
      hst: "",
      tip: "",
      category: 0,
    },
    validate: values => {
      let errs = {};
      if (values.company == "") {
        errs.company = "Please enter a company";
      }
      if (values.description == "") {
        errs.description = "Please enter a description";
      }
      if (values.amount == "") {
        errs.amount = "Please enter an amount";
      }
      if (values.category == 0) {
        errs.category = "Please select a category";
      }
      if (values.hst == "") {
        values.hst = 0;
      }
      if (values.tip == "") {
        values.tip = 0;
      }
      return errs;
    },
    onSubmit: async values => {
      dispatch("saved", {values});
    }
  });

  $: if (saving == false) {
    $form.type = "expense";
    $form.date = today;
    $form.company = "";
    $form.description = "";
    $form.amount = "";
    $form.hst = "";
    $form.tip = "";
    $form.category = 0;
  }

  function quickLinks() {

  }
</script>


<div class="input-form" transition:slide>
  <form on:submit={handleSubmit}>

    <FormItem label="Type" errorMessage={$errors.type}>
      <SelectInput options={typeOptions} bind:value={$form.type} />
    </FormItem>

    <FormItem label="Date" errorMessage={$errors.date}>
      <TextInput name="date" type="date" bind:value={$form.date} />
    </FormItem>

    <FormItem label="Company" errorMessage={$errors.company}>
      <TextInput name="company" bind:value={$form.company} />
    </FormItem>

    <FormItem label="Description" errorMessage={$errors.description}>
      <TextInput name="description" bind:value={$form.description} />
    </FormItem>

    <FormItem label="Amount" errorMessage={$errors.amount}>
      <TextInput name="amount" bind:value={$form.amount} />
    </FormItem>

    <FormItem label="HST" errorMessage={$errors.hst}>
      <TextInput name="hst" bind:value={$form.hst} />
    </FormItem>

    <FormItem label="Tip" errorMessage={$errors.tip}>
      <TextInput name="tip" bind:value={$form.tip} />
    </FormItem>

    <FormItem label="Category" errorMessage={$errors.category}>
      <SelectInput options={categoryOptions} bind:value={$form.category} />
    </FormItem>

    <div class="button">
      <Button caption="Save" loading={saving} />
    </div>

  </form>

  <div class="quick-links">
    <h3>Quick links</h3>
    <div on:click={() => quickLink("roger")}>Rogers</div>
    <div on:click={() => quickLink("bell")}>Bell</div>
    <div on:click={() => quickLink("hydro")}>Hydro</div>
    <div on:click={() => quickLink("gas")}>Gas</div>
  </div>
</div>


<style>
  .input-form {
    border: solid 2px var(--color-primary);
    padding: 2rem;
    background: var(--color-light);
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
  }

  form {
    max-width: 400px;
  }

  .quick-links {
    width: 400px;
  }

  .quick-links div {
    color: var(--color-secondary);
    cursor: pointer;
  }

  .button {
    margin-left: 100px;
  }
</style>