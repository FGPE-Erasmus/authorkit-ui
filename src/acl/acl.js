import Vue from "vue";
import { AclInstaller, AclCreate, AclRule } from "vue-acl";
import router from "@/router";

Vue.use(AclInstaller);

let initialRole = "admin";
if (localStorage.getItem("userRole")) {
  initialRole = localStorage.getItem("userRole");
}

export default new AclCreate({
  initial: initialRole,
  notfound: "/401",
  router,
  acceptLocalRules: true,
  globalRules: {
    admin: new AclRule("admin").generate(),
    user: new AclRule("user").or("admin").generate()
  }
});
