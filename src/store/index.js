import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: { id: "abc123", name: "Adam Jahr" },
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community",
    ],
    events: [],
    eventsNum: 1,
    event: {},
  },
  getters: {
    getEventById: (state) => (id) => {
      return state.events.find((event) => event.id === id);
    },
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_EVENTS_NUM(state, eventsNum) {
      state.eventsNum = eventsNum;
    },
    SET_EVENT(state, event) {
      state.event = event;
    },
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit("ADD_EVENT", event.data);
      });
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then((response) => {
          commit("SET_EVENTS_NUM", response.headers["x-total-count"]);
          commit("SET_EVENTS", response.data);
        })
        .catch((error) => {
          console.log("There was an error:", error.response);
        });
    },
    fetchEvent({ commit, getters }, id) {
      let event = getters.getEventById(id); // See if we already have this event
      if (event) {
        commit("SET_EVENT", event);
      } else {
        EventService.getEvent(id)
          .then((res) => {
            commit("SET_EVENT", res.data);
          })
          .catch((err) => {
            console.log("There was an error:", err.response);
          });
      }
    },
  },
  modules: {},
});
