export const ApiRouter = {
  // login admin
  login: "/api/login",
  authen: "/api/login/authen",
  logout: "/api/login/logout/",
  history: "/api/login/history",

  users: "/api/users",
  register: "/api/users/register",

  project: "/api/projects/",
  updateStatus: "/api/projects/status/",
  actualDetail: "/api/actual-details/",
  actualSummary: "/api/actual-details/summary/cost",

  office: "/api/office/",

  getprojectOffice: "/api/office/get/project",
  projectOffice: "/api/office/project",
  projectOfficeDetail: "/api/office/get/detail/",
  projectOfficeDetailMonth: "/api/office/get/detail/month/",
  projectOfficeDetailDelete: "/api/office/detail",
  addMonthMaster: "/api/office/month/master",

  projectOfficeActual: "/api/office-actual/",
};
