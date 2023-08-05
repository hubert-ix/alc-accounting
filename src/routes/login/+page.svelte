<script>
  import { onMount } from "svelte";
  import { createForm } from "svelte-forms-lib";
  import FormItem from "$lib/UI/FormItem.svelte";
  import Button from "$lib/UI/Button.svelte";
  import TextInput from "$lib/UI/TextInput.svelte";

  let loading = false;

  // enable the enter key
  const onKeyPress = e => {
    if (e.charCode === 13) login();
  };

  // set up the form
  const { form, errors, state, handleChange, handleSubmit } = createForm({
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
      login();
    }
  });

  onMount(() => {
    document.getElementById("email").focus();
  });

  // check the credentials and log the user in
  async function login() {
    loading = true;
    let body = {email: $form.email, password: $form.password};
    let result = await fetch("/api/login", { method: "POST", body: JSON.stringify(body), headers: {'content-type': 'application/json'}});
    const data = await result.json();
    // this is usually because the credentials were incorrect
    if (data.error) {
      $errors.email = data.error;
      loading = false;
      return;
    }
    console.log("LOGGED IN, redirecting", data.currentUser)
    location.href = "/"; // we do this force refresh so that +layout.server.js is called
  }
</script>


<div class="login">
  <form on:submit={handleSubmit}>

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
    border: solid 2px var(--color-primary);
    padding: 2rem;
  }
  
  form {
    max-width: 500px;
  }

  .button {
    margin-left: 100px;
  }
</style>