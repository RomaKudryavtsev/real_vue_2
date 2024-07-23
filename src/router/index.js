import Vue from "vue";
import VueRouter from "vue-router";
import EventList from "@/views/EventList.vue";
import EventShow from "@/views/EventShow.vue";
import EventCreate from "@/views/EventCreate.vue";
import AppUser from "@/views/AppUser.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
  },
  {
    path: "/event/create",
    name: "event-create",
    component: EventCreate,
  },
  {
    path: "/event/:id",
    name: "event-show",
    component: EventShow,
    props: true,
  },
  {
    path: "/user/:username",
    name: "user",
    component: AppUser,
    props: true,
  },
];

const mode = "history";

const router = new VueRouter({
  mode,
  routes,
});

export default router;
