import EventService from "@/services/EventService.js";

export const namespaced = true;

export const state = {
  events: [],
  eventsTotal: 0,
  event: {},
  eventsNum: 1,
};
export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal;
  },
  SET_EVENT(state, event) {
    state.event = event;
  },
};
export const actions = {
  createEvent({ commit, rootState, dispatch }, event) {
    console.log("User creating Event is " + rootState.user.user.name);
    // dispatch('actionToCall')
    // dispatch('moduleName/actionToCall', null, { root: true })
    return EventService.postEvent(event)
      .then(() => {
        commit("ADD_EVENT", event);
        const notification = {
          type: "success",
          message: "Your event has been created!",
        };
        dispatch("notification/add", notification, { root: true });
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a problem creating your event: " + error.message,
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then((response) => {
        commit("SET_EVENTS_TOTAL", parseInt(response.headers["x-total-count"]));
        commit("SET_EVENTS", response.data);
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a problem fetching events: " + error.message,
        };
        /*
        { root: true }, is important. 
         This tells dispatch to look for a notification/add action at the root of our store, 
         instead of just looking for it inside the module we’re currently in
        */
        dispatch("notification/add", notification, { root: true });
      });
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    let event = getters.getEventById(id);
    if (event) {
      commit("SET_EVENT", event);
    } else {
      EventService.getEvent(id)
        .then((response) => {
          commit("SET_EVENT", response.data);
        })
        .catch((error) => {
          const notification = {
            type: "error",
            message: "There was a problem fetching an event: " + error.message,
          };
          dispatch("notification/add", notification, {
            root: true,
          });
        });
    }
  },
};
export const getters = {
  getEventById: (state) => (id) => {
    return state.events.find((event) => event.id === id);
  },
};
