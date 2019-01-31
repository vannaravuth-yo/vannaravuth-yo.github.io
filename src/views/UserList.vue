<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout row justify-space-between>
      <v-flex xs12>
        <v-card
          color="green"
          :title="$t('crud.table.tooltip', [resource])"
          :text="$t('crud.table.subTitle', [resource])"
        >
          <app-table
            :name="resource"
            :headers="headers"
            :records="records"
            @searchChanged="searchChanged"
            @modifyClicked="modifyClicked"
            @deleteClicked="deleteClicked"
          ></app-table>
        </v-card>
        <app-dialog @cancelClicked="closeDialog">
          <template slot="title">
            <span>{{ formTitle }}</span>
          </template>
          <template slot="content">
            <span v-if="destory">
              <p>{{ $t('crud.modal.deleteMessage', [name]) }}</p>
            </span>
            <span v-else>
              <user-form :form="form"></user-form>
            </span>
          </template>
        </app-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import _ from "lodash";
import moment from "moment";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      name: "User",
      resource: "User",
      form: {},
      dialog: false,
      destory: false,
      headers: [
        {
          sortable: true,
          text: "Id",
          value: "id"
        },
        {
          sortable: true,
          text: "Username",
          value: "username",
          render: ({ username }) => `<b>${username}</b>`
        },
        {
          sortable: true,
          text: "First Name",
          value: "firstName",
          align: "right"
        },
        {
          sortable: true,
          text: "Last Name",
          value: "lastName",
          align: "right"
        },
        {
          sortable: true,
          text: "Email",
          value: "email"
        },
        {
          sortable: false,
          text: "Actions",
          value: "action",
          align: "center"
        }
      ],
      records: []
    };
  },
  created() {
    this.loadItems();
  },
  watch: {
    pagination: {
      handler() {
        this.loadItems();
      },
      deep: true
    }
  },
  computed: {
    ...mapState("crud", ["search", "pagination"]),

    formTitle() {
      if (this.destory) {
        return this.$t("crud.modal.delete");
      }
      return _.get(this.item, "id")
        ? this.$t("crud.modal.update", [this.name])
        : this.$t("crud.modal.create", [this.name]);
    }
  },
  methods: {
    ...mapActions("api", ["getUsers", "deleteUser"]),
    ...mapMutations("crud", [
      "closeAllDialogs",
      "setSearch",
      "toggleDialog",
      "setTotalPages",
      "setTotalItems"
    ]),

    loadItems() {
      this.getUsers(this.pagination).then(res => {
        this.records = res.content;
        this.setTotalPages(res.totalPages);
        this.setTotalItems(res.totalElements);
      });
    },

    searchChanged(value) {
      console.log("handle searchChanged", value);
      this.loadItems();
    },

    deleteClicked(item) {
      this.destory = true;
      this.form = item;
      this.toggleDialog();
    },

    modifyClicked(item) {
      this.destory = false;
      this.form = item;
      this.toggleDialog();
    },

    closeDialog() {
      this.form = {};
      this.toggleDialog();
    }
  }
};
</script>
