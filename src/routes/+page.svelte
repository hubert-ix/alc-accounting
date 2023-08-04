<script>
  import { fade } from "svelte/transition";
  import { createForm } from "svelte-forms-lib";
  import FormItem from "$lib/FormItem.svelte";
  import Button from "$lib/Button.svelte";
  import TextInput from "$lib/TextInput.svelte";
  import SelectInput from "$lib/SelectInput.svelte";
  import InputForm from "./InputForm.svelte";
  import SelectionForm from "./SelectionForm.svelte";

  function updateList(e) {
    console.log(e.detail)
  }
</script>


<div in:fade>
  <InputForm />
  <SelectionForm on:change={updateList} />
</div>


<style>
</style>