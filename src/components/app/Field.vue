<template>
  <ValidationProvider :name="name" :rules="rule">
    <v-text-field
      slot-scope="{ errors, valid }"
      v-model="inputValue"
      :success="valid"
      :error-messages="errors"
      :label="getLabel"
      @input="handleInput"
    />
  </ValidationProvider>
</template>


<script>
import { ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationProvider
  },
  props: {
    name: {
      type: String,
      required: true
    },
    rule: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: false
    },
    value: {
      required: true
    }
  },
  data() {
    return {
      inputValue: this.value
    };
  },
  methods: {
    handleInput(e) {
      console.log("this.errors: ", this.errors);
      this.$emit("input", this.value);
    }
  },
  computed: {
    getRule() {
      return this.rule[this.name];
    },
    getLabel() {
      return this.label || _.capitalize(this.name);
    }
  }
};
</script>

