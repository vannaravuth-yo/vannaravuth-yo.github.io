<template>
  <v-flex xs12 sm8 md4>
    <v-card class="elevation-12">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Login form</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            prepend-icon="person"
            type="text"
            name="username"
            v-model="login.username"
            v-validate="'required'"
            label="Username"
          ></v-text-field>
          <v-text-field
            prepend-icon="lock"
            type="password"
            name="password"
            v-model="login.password"
            v-validate="'required'"
            label="Password"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="onSubmit" type="submit" color="primary">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  $_veeValidate: {
    validator: "new"
  },
  data: () => ({
    login: {
      username: "",
      password: ""
    }
  }),
  methods: {
    async onSubmit() {
      console.log("Login onSubmit");
      const validated = await this.$validator.validateAll();

      if (validated) {
        this.$store
          .dispatch("auth/login", this.login)
          .then(() => this.$router.push("/"))
          .catch(err => console.log(err));
      }
    }
  }
};
</script>