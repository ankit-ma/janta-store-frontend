import "./App.css";
import Header from "./common/Header";
import Footer from "./common/Footer";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { useSelector } from "react-redux";

function App() {
  const { username, isLoggedIn } = useSelector((state) => state.session);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage login={true} />} />
        <Route path="/register" element={<HomePage login={false} />} />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard selected={"dashboard"} />
            ) : (
              <HomePage login={false} />
            )
          }
        />
        <Route
          path="/billing"
          element={
            isLoggedIn ? (
              <Dashboard selected={"billing"} />
            ) : (
              <HomePage login={false} />
            )
          }
        />
        <Route
          path="/inventory-management"
          element={
            isLoggedIn ? (
              <Dashboard selected={"inventory management"} />
            ) : (
              <HomePage login={false} />
            )
          }
        />
        <Route
          path="/customer-directory"
          element={
            isLoggedIn ? (
              <Dashboard selected={"customer directory"} />
            ) : (
              <HomePage login={false} />
            )
          }
        />
        <Route
          path="/daily-insight"
          element={
            isLoggedIn ? (
              <Dashboard selected={"daily insight"} />
            ) : (
              <HomePage login={false} />
            )
          }
        />
        <Route
          path="/due-log"
          element={
            isLoggedIn ? (
              <Dashboard selected={"due log"} />
            ) : (
              <HomePage login={false} />
            )
          }
        />
        <Route
          path="/notification"
          element={
            isLoggedIn ? (
              <Dashboard selected={"notification"} />
            ) : (
              <HomePage login={false} />
            )
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
