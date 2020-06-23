import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import EngineeringInformation from "./views/EngineeringInformation.vue";
import ProjectReporting from "./views/ProjectReporting.vue";
import success from "./views/success.vue";
import Accept from "./views/Accept.vue";
import Information1 from "./views/Information1.vue";
import Information2 from "./views/Information2.vue";
import Details from "./views/Details.vue";
import Details1 from "./views/Details1.vue";
import Details2 from "./views/Details2.vue";
import Synergy from "./views/Synergy.vue";
import ViewCertificate from "./views/ViewCertificate.vue";
import TransferOrder from "./views/TransferOrder.vue";
import ViewTransferOrder from "./views/ViewTransferOrder.vue";
import receive from "./views/receive.vue";
import ProjectList from "./views/ProjectList.vue";
import success1 from "./views/success1.vue";
import success2 from "./views/success2.vue";
import success3 from "./views/success3.vue";
import success4 from "./views/success4.vue";
import success5 from "./views/success5.vue";
import TransferForm from "./views/TransferForm.vue";
import Supervise from "./views/Supervise.vue";
import TestResult from "./views/TestResult.vue";

import shiyan from "./views/shiyan.vue";

Vue.use(Router);
var router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      name: "Index",
      component: Index
    },
    {
      path: "/engineeringInformation",
      name: "EngineeringInformation",
      component: EngineeringInformation
    },
    {
      path: "/projectReporting",
      name: "ProjectReporting",
      component: ProjectReporting
    },
    {
      path: "/success",
      name: "success",
      component: success
    },
    {
      path: "/success1",
      name: "success1",
      component: success1
    },
    {
      path: "/success2",
      name: "success2",
      component: success2
    },
    {
      path: "/success3",
      name: "success3",
      component: success3
    },
    {
      path: "/success4",
      name: "success4",
      component: success4
    },
    {
      path: "/success5",
      name: "success5",
      component: success5
    },
    {
      path: "/accept",
      name: "Accept",
      component: Accept
    },
    {
      path: "/information1",
      name: "Information1",
      component: Information1
    },
    {
      path: "/details",
      name: "Details",
      component: Details
    },
    {
      path: "/details1",
      name: "Details1",
      component: Details1
    },
    {
      path: "/details2",
      name: "Details2",
      component: Details2
    },
    {
      path: "/information2",
      name: "Information2",
      component: Information2
    },
    {
      path: "/synergy",
      name: "Synergy",
      component: Synergy
    },
    {
      path: "/viewCertificate",
      name: "ViewCertificate",
      component: ViewCertificate
    },
    {
      path: "/transferOrder",
      name: "TransferOrder",
      component: TransferOrder
    },
    {
      path: "/viewTransferOrder",
      name: "ViewTransferOrder",
      component: ViewTransferOrder
    },
    {
      path: "/receive",
      name: "receive",
      component: receive
    },
    {
      path: "/projectList",
      name: "ProjectList",
      component: ProjectList
    },
    {
      path: "/transferForm",
      name: "TransferForm",
      component: TransferForm
    },
    {
      path: "/supervise",
      name: "Supervise",
      component: Supervise
    },
    {
      path: "/testResult",
      name: "TestResult",
      component: TestResult
    },
    {
      path: "/shiyan",
      name: "shiyan",
      component: shiyan
    }
  ]
});

// 路由守卫设置
// router.beforeEach(function(to, from, next) {
//   var token = window.sessionStorage.getItem("userId");
//   if (token === null && to.path !== "/login") {
//     if (
//       to.path.includes("/apply") ||
//       to.path.includes("/verification") ||
//       to.path.includes("/smsVerification") ||
//       to.path.includes("/modify") ||
//       to.path.includes("/complete")
//     ) {
//       next();
//     } else {
//       return next("/login");
//     }
//   }
//   next(); // 放行
// });
export default router;
