import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Quiz from "./views/Quiz.vue";
import Results from "./views/Results.vue";
import Rules from "./views/Rules.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/quiz/:type", component: Quiz },
  { path: "/results", component: Results },
  { path: "/rules", component: Rules },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
