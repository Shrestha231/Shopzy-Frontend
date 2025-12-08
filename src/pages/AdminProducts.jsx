const AdminProducts = () => {
  // fetch products from /api/products (admin)
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Manage Products</h1>
        <button className="rounded-lg bg-slate-900 text-white px-4 py-2 text-sm font-medium">
          + Add Product
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Price</th>
              <th className="text-left px-4 py-3">Stock</th>
              <th className="text-left px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* map products */}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminProducts;