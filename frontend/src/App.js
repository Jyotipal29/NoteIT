import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./screen/Home";
import NoteList from "./screen/NoteList";
import Register from "./screen/Register";
import Login from "./screen/Login";
import Single from "./screen/Single";
import PrivateRoutes from "./utils/PrivateRoutes";
import PageNotFound from "./screen/PageNotFound";
import Profile from "./screen/Profile";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/notelist" element={<NoteList />} />
            <Route exact path="/note/:id" element={<Single />} />
            <Route exact path="/profile" element={<Profile />} />
          </Route>

          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      ;
    </Router>
  );
}

export default App;
