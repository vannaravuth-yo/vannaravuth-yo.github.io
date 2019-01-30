<template>
  <v-dialog v-model="dialog" max-width="80%">
    <v-card>
      <v-card-title>
        <span class="headline">
          <slot name="title"/>
        </span>
      </v-card-title>

      <v-card-text>
        <slot name="content"/>
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <v-btn color="blue darken-1" flat @click="cancelClicked">{{ btnCancelText }}</v-btn>
        <v-btn color="blue darken-1" flat @click="submitClicked">{{ btnSubmitText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: {
    btnCancelText: {
      type: String,
      default: "Cancel" // $t("Crud.modal.button.cancel")
    },
    btnSubmitText: {
      type: String,
      default: "Submit" // $t("Crud.modal.button.submit")
    }
  },
  computed: {
    dialog: {
      get() {
        return this.$store.state.crud.dialog;
      },
      set(value) {
        this.setDialog(value);
      }
    }
  },
  methods: {
    ...mapMutations("crud", ["setDialog"]),

    cancelClicked() {
      this.$emit("cancelClicked");
    },
    submitClicked() {
      this.$emit("submitClicked");
    },
    closeDialog() {
      this.dialog = false;
    }
  }
};
</script>

