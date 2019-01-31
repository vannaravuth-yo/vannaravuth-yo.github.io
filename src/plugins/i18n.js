import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const messages = {
  en: {
    $vuetify: {
      dataIterator: {
        rowsPerPageText: "Items per page:",
        pageText: "{0}-{1} of {2}"
      }
    },
    crud: {
      label: {
        new: "New {0}",
        search: "Search {0}"
      },
      modal: {
        create: "Create {0}",
        update: "Update {0}",
        delete: "Confirm Delete",
        deleteMessage: "Are you sure you want to delete this {0}?",

        button: {
          cancel: "Cancel",
          submit: "Submit"
        }
      },
      table: {
        title: "CRUD {0}",
        subTitle: "Display users per page",
        tooltip: "User Listing"
      }
    }
  }
};

const i18n = new VueI18n({
  locale: "en",
  messages
});

export default i18n;
