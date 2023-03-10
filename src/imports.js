export {
  SessionContext,
  SessionProvider,
} from "./common/context/SessionProvider";
export { ThemeContext, ThemeProvider } from "./common/context/ThemeProvider";
export {
  LanguajeProvider,
  LanguajeContext,
} from "./common/context/LanguajeProvider";
export { ListProvider, ListContext } from "./common/context/ListProvider";
export { default as HomePage } from "./pages/home/home";
export { default as LogInPage } from "./pages/sign-in-up/sign-in-up";
export { default as UserList } from "./pages/users/list/users-list";
export { default as DoctorList } from "./pages/doctors/list/doctors-list";
export { default as DoctorPage } from "./pages/doctors/main/doctor";

export { default as PatientList } from "./pages/patients/list/patients-list";
export { default as SpecializationList } from "./pages/specializations/list/specializations-list";
export { default as SpecializationPage } from "./pages/specializations/main/specialization";
export { default as CreateAppointment } from "./pages/appointments/create/create-appointment";
export { default as AppointmentPage } from "./pages/appointments/main/appointment-main";
export { default as DiseasesPage } from "./pages/patients/diseases/diseases";

export { default as Header } from "./common/header/navbar";
export { default as ModalForm } from "./common/components/modal/modalWindow";
export { default as RoleColor } from "./common/components/role-color/roleColor";
export { default as Pagination } from "./common/components/pagination/pagination";
export { default as Loading } from "./common/components/loading/loading";
