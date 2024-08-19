import AuthOverlay from "./AuthOverlay";
import RegisterForm from "./RegisterForm";
function HomePage(props) {
  return (
    <>
      <main className="relative bg-gradient-to-r from-[#03045e] to-[#0077b6] h-[90vh] flex items-center justify-center ">
        {/* Main content */}

        <div className="p-8 text-center text-white">
          <h2 className="text-4xl mb-4">
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
