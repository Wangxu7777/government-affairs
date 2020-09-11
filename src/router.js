import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";
import EngineeringInformation from "./views/EngineeringInformation.vue";
import ProjectReporting from "./views/ProjectReporting.vue";
import ProjectReporting1 from "./views/ProjectReporting1.vue";
import success from "./views/success.vue";
import Accept from "./views/Accept.vue";
import Information1 from "./views/Information1.vue";
import Information2 from "./views/Information2.vue";
import Details from "./views/Details.vue";
import Details1 from "./views/Details1.vue";
import Details2 from "./views/Details2.vue";
import Details3 from "./views/Details3.vue";
import Synergy from "./views/Synergy.vue";
import ViewCertificate from "./views/ViewCertificate.vue";
import TransferOrder from "./views/TransferOrder.vue";
import ViewTransferOrder from "./views/ViewTransferOrder.vue";
import receive from "./views/receive.vue";
import ProjectList from "./views/ProjectList.vue";
import ProjectDetails from "./views/ProjectDetails.vue";

import success1 from "./views/success1.vue";
import success2 from "./views/success2.vue";
import success3 from "./views/success3.vue";
import success4 from "./views/success4.vue";
import success5 from "./views/success5.vue";
import success6 from "./views/success6.vue";
import TransferForm from "./views/TransferForm.vue";
import Supervise from "./views/Supervise.vue";
import TestResult from "./views/TestResult.vue";
import InspectorList from "./views/InspectorList.vue";
import User from "./views/User.vue";
import Accept1 from "./views/Accept1.vue";
import CompletionList from "./views/CompletionList.vue";
import TestResultDetails from "./views/TestResultDetails.vue";
import RejectForm from "./views/RejectForm.vue";

Vue.use(Router);
var router = new Router({
  // mode: "history",
  // base: "/gongdi/",
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
      path: "/projectReporting1",
      name: "ProjectReporting1",
      component: ProjectReporting1
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
      path: "/success6",
      name: "success6",
      component: success6
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
      path: "/details3",
      name: "Details3",
      component: Details3
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
      component: ProjectList,
      meta: {
        pageTitle: "列表页",
        keepAlive: true
      }
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
      path: "/inspectorList",
      name: "InspectorList",
      component: InspectorList
    },
    {
      path: "/user",
      name: "User",
      component: User
    },
    {
      path: "/accept1",
      name: "Accept1",
      component: Accept1
    },
    {
      path: "/completionList",
      name: "CompletionList",
      component: CompletionList
    },
    {
      path: "/projectDetails",
      name: "ProjectDetails",
      component: ProjectDetails
    },
    {
      path: "/testResultDetails",
      name: "TestResultDetails",
      component: TestResultDetails
    },
    {
      path: "/rejectForm",
      name: "RejectForm",
      component: RejectForm
    }
  ]
});

// 路由守卫设置
// router.beforeEach(function(to, from, next) {
//   var token = window.sessionStorage.getItem("userId");
//   if (token === null && to.path !== "/login") {
//     if (

//     ) {
//       next();
//     } else {
//       return next("/login");
//     }
//   }
//   next(); // 放行
// });
export default router;
