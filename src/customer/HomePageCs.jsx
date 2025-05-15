const HomePageCs = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center bg-blue-100 py-24 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Janta Store
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Your one-stop destination for daily essentials
        </p>
        <a
          href="/store"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl text-lg font-semibold shadow-lg transition duration-300"
        >
          Register / Login
        </a>
        <p className="text-xs">For store employees</p>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 bg-gray-50 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">
                Everything You Need
              </h3>
              <p>
                We provide all household necessities under one roof to save your
                time and effort.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">
                Trust Built Over Years
              </h3>
              <p>
                Serving your family for generations with quality products and
                honest service.
              </p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-2">
                Unmatched Customer Service
              </h3>
              <p>
                Experience shopping like never before with our friendly and
                efficient team.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageCs;
