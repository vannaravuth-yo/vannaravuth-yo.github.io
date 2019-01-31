<template>
  <!-- v-html="message" -->
  <v-snackbar
    v-model="show"
    :multi-line="false"
    :color="null"
    :timeout="timeout"
    :vertical="false"
    :top="true"
  >
    {{ message }}
    <v-btn color="pink" flat @click="hideAlert()">Close</v-btn>
  </v-snackbar>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      y: "top",
      x: null,
      mode: "vertical",
      timeout: 5000
    };
  },
  mounted() {
    console.log("AppAlert mounted");
  },
  computed: {
    show: {
      get() {
        return this.$store.state.crud.alert.show;
      }
    },
    type: {
      get() {
        return this.$store.state.crud.alert.type;
      }
    },
    message: {
      get() {
        return this.$store.state.crud.alert.message;
      }
    }
  },
  methods: {
    ...mapActions("crud", ["hideAlert"])
  }
};
</script>

