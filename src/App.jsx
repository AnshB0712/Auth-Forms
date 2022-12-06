import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Login";
import Register from "./Register";

import Home from "./components/Home";
import Editor from "./components/Editor";
import Admin from "./components/Admin";
import Lounge from "./components/Lounge";
import LinkPage from "./components/LinkPage";
import Missing from "./components/Missing";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import PersistLogin from "./components/PersistLogin";

const ROLES = {
  User: 2004,
  Editor: 2000,
  Admin: 1989,
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route index element={<LinkPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* we want to protect these routes */}
          <Route element={<PersistLogin />}>
            <Route
              path="/"
              element={<RequireAuth allowedRoles={[ROLES.User]} />}
            >
              <Route path="home" element={<Home />} />
            </Route>
            <Route
              path="/"
              element={<RequireAuth allowedRoles={[ROLES.Editor]} />}
            >
              <Route path="editor" element={<Editor />} />
            </Route>
            <Route
              path="/"
              element={<RequireAuth allowedRoles={[ROLES.Admin]} />}
            >
              <Route path="admin" element={<Admin />} />
            </Route>
            <Route
              path="/"
              element={
                <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor]} />
              }
            >
              <Route path="lounge" element={<Lounge />} />
            </Route>
          </Route>

          {/* catch all */}
          <Route path="/*" element={<Missing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
