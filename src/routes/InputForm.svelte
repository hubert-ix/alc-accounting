<script>
  import { createForm } from "svelte-forms-lib";
  import dayjs from "dayjs";
  import FormItem from "$lib/FormItem.svelte";
  import Button from "$lib/Button.svelte";
  import TextInput from "$lib/TextInput.svelte";
  import SelectInput from "$lib/SelectInput.svelte";

  let today = dayjs().format("YYYY-MM-DD");
  let categories = [
    {value: 0, label: "- Select -"},
    {value: 1, label: "ok"},
    {value: 2, label: "fantastic"},
  ];

  // set up the form
  const { form, errors, state, handleChange, handleSubmit } = createForm({
    initialValues: {
      date: today,
      company: "",
      description: "",
      amount: "",
      hst: "",
      tip: "",
      category: "",
    },
    validate: values => {
      let errs = {};
      if (values.company == "") {
        errs.company = "One needs a company";
      }
      if (values.description == "") {
        errs.description = "A good description is like a good mole";
      }
      if (values.amount == "") {
        errs.amount = "Nothing amounts to nothing";
      }
      if (values.category == 0) {
        errs.amount = "Categories are awesome";
      }
      return errs;
    },
    onSubmit: async values => {
      console.log(values);
    }
  });
</script>


<div class="input-form">
  <form on:submit={handleSubmit}>

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
      <SelectInput options={categories} bind:value={$form.category} />
    </FormItem>

    <div class="button">
      <Button caption="Save" />
    </div>

  </form>
</div>


<style>
  .input-form {
    border: solid 2px var(--color-primary);
    padding: 2rem;
    background: var(--color-light);
    margin-bottom: 1rem;
  }

  form {
    max-width: 400px;
  }

  .button {
    margin-left: 100px;
  }
</style>