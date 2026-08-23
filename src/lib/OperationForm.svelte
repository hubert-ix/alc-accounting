<script>
  import { goto } from '$app/navigation';
  import { slide } from 'svelte/transition';
  import { createForm } from "svelte-forms-lib";
  import dayjs from "dayjs";
  import FormItem from "$lib/UI/FormItem.svelte";
  import Button from "$lib/UI/Button.svelte";
  import TextInput from "$lib/UI/TextInput.svelte";
  import SelectInput from "$lib/UI/SelectInput.svelte";
    import { onMount } from 'svelte';

  let { categories, saving, operation = null, saved, cancelled } = $props();
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

  const quickLinks = {
    internet: { company: "Bell", description: "Internet", amount: 117, hst: 15.21, category_id: 19 },
    cellphone: { company: "Bell", description: "Cell phone", amount: 45, hst: 5.85, category_id: 17 },
    hydro:{ company: "Toronto Hydro", description: "Electricity", amount: "", hst: "", category_id: 26 },
    gas: { company: "Enbridge", description: "Gas", amount: "", hst: "", category_id: 22 },
  };

  // set up the form
  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      type: (operation)?operation.type:"expense",
      date: (operation)?operation.date:today,
      company: (operation)?operation.company:"",
      description: (operation)?operation.description:"",
      amount: (operation)?operation.amount:"",
      hst: (operation)?operation.hst:"",
      tip: (operation)?operation.tip:"",
      category_id: (operation)?operation.category_id:0,
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
      if (values.category_id == 0) {
        errs.category_id = "Please select a category";
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
      saved(values);
    }
  });

  onMount(() => {
    document.getElementById("company").focus();
  });

  function quickLink(key) {
    const preset = quickLinks[key];
    if (!preset) return;
    $form.company = preset.company;
    $form.description = preset.description;
    $form.amount = preset.amount;
    $form.hst = preset.hst;
    $form.category_id = preset.category_id;
    document.getElementById("amount").focus();
  }

  function updateHST() {
    let amount = parseFloat($form.amount);
    $form.hst = isNaN(amount) ? '' : Math.round(amount * 13) / 100;
  }
</script>


<div class="input-form" transition:slide>
  <form onsubmit={handleSubmit}>

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
      <TextInput name="amount" bind:value={$form.amount} changed={updateHST} />
    </FormItem>

    <FormItem label="HST" errorMessage={$errors.hst}>
      <TextInput name="hst" bind:value={$form.hst} />
    </FormItem>

    <FormItem label="Tip" errorMessage={$errors.tip}>
      <TextInput name="tip" bind:value={$form.tip} />
    </FormItem>

    <FormItem label="Category" errorMessage={$errors.category_id}>
      <SelectInput options={categoryOptions} bind:value={$form.category_id} />
    </FormItem>

    <div class="buttons">
      <Button caption="Save" loading={saving} />
      {#if operation}
        <Button caption="Cancel" style="outlined" type="button" clicked={() => goto("/")} />
      {:else}
        <Button caption="Cancel" style="outlined" type="button" clicked={cancelled} />
      {/if}
    </div>

  </form>

  <div class="quick-links">
    <h3>Quick links</h3>
    <div onclick={() => quickLink("internet")}>Internet</div>
    <div onclick={() => quickLink("cellphone")}>Cell phone</div>
    <div onclick={() => quickLink("hydro")}>Hydro</div>
    <div onclick={() => quickLink("gas")}>Gas</div>
  </div>
</div>


<style>
  .input-form {
    border: solid 1px #fff3b0;
    border-radius: 0.5rem;
    padding: 1.5rem;
    background: #fff9d6;
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
    color: var(--color-primary);
    cursor: pointer;
  }

  .buttons {
    margin-left: 100px;
    display: flex;
    grid-column-gap: 1rem;
  }
</style>