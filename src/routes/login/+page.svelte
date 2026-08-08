<script>
  import { onMount } from "svelte";
  import { createForm } from "svelte-forms-lib";
  import FormItem from "$lib/UI/FormItem.svelte";
  import Button from "$lib/UI/Button.svelte";
  import TextInput from "$lib/UI/TextInput.svelte";
  import * as api from '$lib/api';

  let loading = $state(false);

  // enable the enter key
  const onKeyPress = e => {
    if (e.charCode === 13) login();
  };

  // set up the form
  const { form, errors, handleChange, handleSubmit } = createForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: values => {
      let errs = {};
      if (values.email == "") {
        errs.email = "Please enter your email";
      }
      if (values.password == "") {
        errs.password = "Please enter your password";
      }
      return errs;
    },
    onSubmit: async values => {
      loading = true;
      let response = await api.post(fetch, "/api/login", values)
      // this is usually because the credentials were incorrect
      if (response.error) {
        $errors.email = response.error;
        loading = false;
        return;
      }
      location.href = "/"; // we do this force refresh so that +layout.server.js is called
    }
  });

  onMount(() => {
    document.getElementById("email").focus();
  });
</script>


<div class="login">
  <form onsubmit={handleSubmit}>

    <FormItem label="Email" errorMessage={$errors.email}>
      <TextInput name="email" bind:value={$form.email} />
    </FormItem>

    <FormItem label="Password" errorMessage={$errors.password}>
      <TextInput name="password" type="password" bind:value={$form.password} />
    </FormItem>

    <div class="button">
      <Button caption="Login" {loading} />
    </div>

  </form>
</div>


<style>
  .login {
    background: var(--color-light);
    border: solid 2px #f4a5a0;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    padding: 2rem;
  }
  
  form {
    max-width: 500px;
  }

  .button {
    margin-left: 100px;
  }
</style>