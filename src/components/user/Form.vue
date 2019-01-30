<template>
  <div>
    <form @submit.prevent="onSubmit">
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12 sm6 md6 lg6 xl6>
            <v-text-field
              name="username"
              v-model="item.username"
              v-validate="rules.username"
              :error-messages="errors.collect('username')"
              label="Username"
            />
          </v-flex>

          <v-flex xs12 sm6 md6 lg6 xl6>
            <v-select
              name="profile"
              v-model="item.profile"
              v-validate="rules.profile"
              :error-messages="errors.collect('profile')"
              label="Default Profile"
              :items="listProfiles"
            />
          </v-flex>

          <v-flex xs12 sm6 md6 lg6 xl6>
            <v-text-field
              name="firstName"
              v-model="item.firstName"
              v-validate="rules.firstName"
              :error-messages="errors.collect('firstName')"
              label="First Name"
            />
          </v-flex>

          <v-flex xs12 sm6 md6 lg6 xl6>
            <v-text-field
              name="lastName"
              v-model="item.lastName"
              v-validate="rules.lastName"
              :error-messages="errors.collect('lastName')"
              label="Last Name"
            />
          </v-flex>

          <v-flex xs12 sm6 md6 lg6 xl6>
            <v-text-field
              name="email"
              v-model="item.email"
              v-validate="rules.email"
              :error-messages="errors.collect('email')"
              label="Email"
            />
          </v-flex>

          <v-flex xs12 sm6 md6 lg6 xl6>
            <app-date-picker v-model="item.expirationDate"></app-date-picker>
          </v-flex>

          <v-flex xs12 sm6 md6 lg6 xl6>
            <v-text-field
              name="phone1"
              v-model="item.phone1"
              v-validate="rules.phone1"
              :error-messages="errors.collect('phone1')"
              label="Phone Line 1"
            />
          </v-flex>

          <v-flex xs12 sm6 md6 lg6 xl6>
            <v-text-field
              name="phone2"
              v-model="item.phone2"
              v-validate="rules.phone2"
              :error-messages="errors.collect('phone2')"
              label="Phone Line 2"
            />
          </v-flex>

          <v-flex xs12 sm6 md6 lg6 xl6>
            <v-text-field
              name="commissionRateCode"
              v-model="item.commissionRateCode"
              v-validate="rules.commissionRateCode"
              :error-messages="errors.collect('commissionRateCode')"
              label="Commission Rate Code"
            />
          </v-flex>

          <v-flex xs12 sm6 md6 lg6 xl6>
            <v-text-field
              name="commissionRateValue"
              v-model="item.commissionRateValue"
              v-validate="rules.commissionRateValue"
              :error-messages="errors.collect('commissionRateValue')"
              label="Commission Rate Value"
            />
          </v-flex>

          <v-flex xs12 sm12 md12>
            <v-textarea
              name="userDes"
              v-model="item.userDes"
              v-validate="rules.userDes"
              :error-messages="errors.collect('userDes')"
              label="Description"
            />
          </v-flex>

          <v-flex xs12 sm6 md6 lg6 xl6>
            <v-text-field
              type="password"
              name="password"
              v-model="item.password"
              v-validate="rules.password"
              :error-messages="errors.collect('password')"
              label="Password"
            />
          </v-flex>

          <v-flex xs12 sm6 md6 lg6 xl6>
            <v-text-field
              type="password"
              name="confirmPassword"
              v-model="item.confirmPassword"
              v-validate="rules.confirmPassword"
              :error-messages="errors.collect('confirmPassword')"
              label="Confirm Password"
            />
          </v-flex>

          <v-flex xs12 sm6 md6 lg6 xl6>
            <v-select
              name="branch"
              v-model="item.branch"
              v-validate="rules.branch"
              :error-messages="errors.collect('branch')"
              label="Branch"
              :items="listBranches"
            />
          </v-flex>

          <v-btn type="reset" @click="onClear">Clear</v-btn>
          <v-btn type="submit">Submit</v-btn>
        </v-layout>
      </v-container>
    </form>
  </div>
  <!-- </v-form> -->
</template>

<script>
import _ from "lodash";
import moment from "moment";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";

const defaultItem = {
  username: "",
  profile: [],
  firstName: "",
  lastName: "",
  email: "",
  phone1: "",
  phone2: "",
  defaultProfile: "",
  commissionRateCode: "",
  commissionRateValue: "",
  userDes: "",
  password: "",
  confirmPassword: "",
  expirationDate: moment().format("YYYY-MM-DD"),
  branch: []
};

export default {
  $_veeValidate: {
    validator: "new"
  },

  props: {
    form: {
      type: Object,
      required: true
    }
  },

  data() {
    const expirationDate = moment().format("YYYY-MM-DD");
    return {
      message: "",
      listBranches: [],
      listProfiles: [],
      item: {
        username: "ravuthz",
        profile: [1],
        firstName: "ravurthz",
        lastName: "mr",
        email: "ravuthz@gmail.com",
        phone1: "0964577770",
        phone2: "0964577777",
        commissionRateCode: "CODE",
        commissionRateValue: "1230",
        userDes: "Just test",
        password: "123123",
        confirmPassword: "123123",
        expirationDate,
        branch: [1]
      },
      rules: {
        username: "required",
        profile: "required",
        firstName: "required",
        lastName: "required",
        email: "required",
        phone1: "required",
        phone2: "required",
        commissionRateCode: "required",
        commissionRateValue: "required",
        userDes: "required",
        password: "required",
        confirmPassword: "required",
        expirationDate: "required",
        branch: "required"
      }
    };
  },

  created() {
    this.getListBranches().then(res => {
      this.listBranches = _.map(res, item => ({
        text: item.description,
        value: item.id
      }));
    });
    this.getListProfiles().then(res => {
      this.listProfiles = _.map(res, item => ({
        text: item.description,
        value: item.id
      }));
    });

    this.item = _.get(this.form, "id") ? this.form : defaultItem;
  },

  watch: {},

  methods: {
    ...mapActions("api", ["saveUser", "getListBranches", "getListProfiles"]),
    ...mapActions("crud", ["showAlert", "hideAlert"]),

    onClear() {
      this.item = defaultItem;
      this.$validator.reset();
    },

    onSubmit() {
      this.$validator
        .validateAll()
        .then(result => {
          console.log("result: ", result);
          if (result) {
            this.saveUser(this.item)
              .then(res => {
                console.log("res: ", res);
                this.showAlert("User was created successfully", "danger");
              })
              .catch(err => {
                console.log("err: ", err.response.data.errors.message);
                this.showAlert("Error while creating user", "danger");
              });
          } else {
            this.showAlert("User can not create cause of validation", "danger");
          }
        })
        .catch(err => {
          console.log("err: ", err);
          this.showAlert("Error while creating user", "danger");
        });
    }
  }
};
</script>