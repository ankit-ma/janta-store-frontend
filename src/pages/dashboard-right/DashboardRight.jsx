function DashboardRight(props) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-bold">Messages Received</h3>
          <p className="text-2xl">24</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-bold">Total Sales</h3>
          <p className="text-2xl">$12,345</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-bold">Products Getting Over Soon</h3>
          <p className="text-2xl">5</p>
        </div>
        {/* Add more cards as needed */}
      </div>
    </>
  );
}

export default DashboardRight;
