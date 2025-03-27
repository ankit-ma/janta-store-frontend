import AuthOverlay from "./AuthOverlay";
import RegisterForm from "./RegisterForm";
import bgImage from "../resources/background.webp";
function HomePage(props) {
  return (
    <>
      <main className="relative bg-white from-[#6366fcd0] to-[#e5f1ed] h-[90vh] flex items-center justify-center font-mono">
        {/* Main content */}

        <div className="ml-10 p-8 text-center text-[#1e22f9d0]">
          <h2 className="text-4xl mb-4 font-mono">
            Welcome to <b>Janta Store</b>
          </h2>
          <p className="text-xl">Grow Your business with us 😊</p>
        </div>

        {/* Auth Overlay */}
        {props.login && <AuthOverlay />}
        {!props.login && <RegisterForm />}
      </main>
    </>
  );
}

export default HomePage;
