import "./App.css";
import Header from "./common/Header";
import Footer from "./common/Footer";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { useSelector } from "react-redux";
import HomePageCs from "./customer/HomePageCs";

function App() {
  const { username, isLoggedIn } = useSelector((state) => state.session);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePageCs />} />
        <Route path="/store" element={<HomePage login={true} />} />
        <Route path="/store/register" element={<HomePage login={false} />} />
        <Route
          path="/store/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard selected={"dashboard"} />
            ) : (
              <HomePage login={false} />
            )
          }
        />
        <Route
          path="/store/billing"
          element={
            isLoggedIn ? (
              <Dashboard selected={"billing"} />
            ) : (
              <HomePage login={false} />
            )
          }
        />
        <Route
          path="/store/inventory-management"
          element={
            isLoggedIn ? (
              <Dashboard selected={"inventory management"} />
            ) : (
              <HomePage login={false} />
            )
          }
        />
        <Route
          path="/store/customer-directory"
          element={
            isLoggedIn ? (
              <Dashboard selected={"customer directory"} />
            ) : (
              <HomePage login={false} />
            )
          }
        />

        <Route
          path="/store/due-log"
          element={
            isLoggedIn ? (
              <Dashboard selected={"due log"} />
            ) : (
              <HomePage login={false} />
            )
          }
        />
        <Route
          path="/store/notification"
          element={
            isLoggedIn ? (
              <Dashboard selected={"notification"} />
            ) : (
              <HomePage login={false} />
            )
          }
        />
        <Route
          path="/store/staff-management"
          element={
            isLoggedIn ? (
              <Dashboard selected={"staff management"} />
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
