import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ListProvider } from "./common/context/ListProvider";
import {
  HomePage,
  LogInPage,
  LanguajeProvider,
  SessionProvider,
  ThemeProvider,
  Header,
  UserList,
} from "./imports";
import DoctorList from "./pages/doctors/list/doctors-list";

function App() {
  return (
    <Router>
      <LanguajeProvider>
        <SessionProvider>
          <ThemeProvider>
            <ListProvider>
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path={"/login"} element={<LogInPage />} />
                <Route path={"/register"} element={<LogInPage />} />
                <Route path={"/users"} element={<UserList />} />
                <Route path={"/doctors"} element={<DoctorList />} />
              </Routes>
            </ListProvider>
          </ThemeProvider>
        </SessionProvider>
      </LanguajeProvider>
    </Router>
  );
}

export default App;
