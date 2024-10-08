import Vue from "vue";
import Vuex from "vuex";
import * as user from "@/store/modules/user.js";
import * as events from "@/store/modules/events.js";
import * as notification from "@/store/modules/notification.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community",
    ],
  },
  modules: {
    user,
    events,
    notification,
  },
});
