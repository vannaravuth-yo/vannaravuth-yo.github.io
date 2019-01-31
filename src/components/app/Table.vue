<template>
  <div>
    <v-toolbar card prominent>
      <v-toolbar-title>{{ $t('crud.table.title', [name]) }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-text-field
          append-icon="md-account-search"
          :label="label.search"
          single-line
          hide-details
          @change="searchItem"
        ></v-text-field>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat slot="activator" @click="modifyItem({})">{{ label.new }}</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!--  :hide-actions="true" prev-icon="prev" next-icon="next"-->
    <v-data-table
      :headers="headers"
      :items="records"
      :loading="loading"
      :pagination.sync="pagination"
      :total-items="pagination.totalItems"
      :rows-per-page-items="pagination.rowsPerPageItems"
    >
      <template slot="headerCell" slot-scope="{ header }">
        <span
          class="subheading font-weight-light text-success text--darken-3"
          v-text="header.text"
        />
      </template>

      <template slot="items" slot-scope="{ item }">
        <td
          v-for="(header, index) in headers"
          :key="index"
          :class="header.align ? `text-xs-${header.align}` : 'text-xs-left'"
        >
          <span v-if="header.value !== 'action'" v-html="renderItem(item, header)"/>
          <span v-if="header.value === 'action'">
            <v-icon small class="mr-2" @click="modifyItem(item)">edit</v-icon>
            <v-icon small class="ml-2" @click="destroyItem(item)">delete</v-icon>
          </span>
        </td>
      </template>
      <template slot="no-data">
        <v-alert :value="true" color="error" icon="mdi-warning">
          <b>Sorry, nothing to display here :(</b>
        </v-alert>
      </template>
      <template
        slot="pageText"
        slot-scope="{ pageStart, pageStop, itemsLength }"
      >{{ pageStart }} - {{ pageStop }} / {{ itemsLength }}</template>
    </v-data-table>

    <!-- <v-card-actions class="text-xs-center">/
      <v-pagination
        v-model="pagination.page"
        :total-visible="9"
        :length="pagination.totalPages"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      ></v-pagination>
    </v-card-actions>-->
  </div>
</template>

<script>
import _ from "@/plugins/lodash";
// import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import { mapMutations } from "vuex";

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    records: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      label: {
        new: this.$t("crud.label.new", [this.name]),
        search: this.$t("crud.label.search", [""])
      }
    };
  },
  computed: {
    loading: {
      get() {
        return this.$store.state.crud.loading;
      },
      set(value) {
        this.setLoading(value);
      }
    },

    pagination: {
      get() {
        return this.$store.state.crud.pagination;
      },
      set(value) {
        this.setPagination(value);
      }
    }
  },

  methods: {
    ...mapMutations("crud", ["setLoading", "setPagination"]),

    renderItem(item, data) {
      return data.render ? data.render(item) : _.get(item, data.value);
    },

    modifyItem(item) {
      this.$emit("modifyClicked", item);
    },

    destroyItem(item) {
      this.$emit("deleteClicked", item);
    },

    searchItem(value) {
      this.$emit("searchChanged", value);
    }
  }
};
</script>