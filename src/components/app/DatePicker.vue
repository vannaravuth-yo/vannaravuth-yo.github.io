<template>
  <span>
    <v-menu
      ref="menu"
      :close-on-content-click="false"
      v-model="menu"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      max-width="290px"
      min-width="290px"
    >
      <v-text-field
        slot="activator"
        v-model="dateFormatted"
        label="Date"
        hint="MM/DD/YYYY format"
        persistent-hint
        prepend-icon="event"
        @input="handleInput"
      ></v-text-field>
      <v-date-picker v-model="date" no-title @input="menu = false"></v-date-picker>
    </v-menu>
  </span>
</template>

<script>
import moment from "moment";

export default {
  props: ["value"],
  data() {
    return {
      menu: false,
      date: this.parseDate(moment()),
      dateFormatted: this.value
    };
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      return moment(date).format("MM/DD/YYYY");
    },
    parseDate(date) {
      if (!date) return null;
      return moment(date).format("YYYY-MM-DD");
    },
    handleInput(e) {
      this.date = this.parseDate(this.dateFormatted);
      this.$emit("input", this.date);
    }
  }
};
</script>

