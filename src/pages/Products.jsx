import ProductManager from "./ProductManager";
import { Pencil, Trash2, PlusCircle, X } from "lucide-react";
import Sidebar from "../compontes/common/Sidebar";
import StatCardGroup from "../compontes/stats/StatCardGroup ";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const ProductPage = () => {
  const { token } = useContext(AuthContext);
  const {
    orders,
    isDeleteModalOpen,
    selectedOrder,
    isFormOpen,
    editMode,
    formData,
    categories,
    imagePreviews,
    deleteImage,
    handleDeleteClick,
    confirmDelete,
    cancelDelete,
    handleAddClick,
    handleEditClick,
    handleFormClose,
    handleChange,
    handleImageChange,
    handleSubmit,
    setOrders,
  } = ProductManager();

  useEffect(() => {
    const fetchOrders = async () => {
      const responce = await axios.get("http://localhost:3000/admin/products", {
        headers: {
          Authorization: `${token}`,
        },
      });
      const data = await responce.data;
      console.log(data);
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="ml-16 p-6 font-inter">
        <div className="max-w-7xl mx-auto">
          <StatCardGroup stats={["revenue", "orders", "visitors"]} />

          <div className="mt-8">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Products
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">
                        Products
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">
                        Main Category
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">
                        Sub Category
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">
                        Price
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">
                        QTY
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-500 flex justify-end">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={order.image}
                              alt={order.product}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <span className="text-sm text-gray-700">
                              {order.product}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {order.mainCategory}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {order.subCategory}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {order.price} DA
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {order.qty}
                        </td>
                        <td className="py-4 px-4 flex justify-end">
                          <div className="flex items-center gap-2">
                            <button
                              className="p-1 hover:bg-gray-100 rounded"
                              onClick={() => handleEditClick(order)}
                            >
                              <Pencil className="w-4 h-4 text-gray-500" />
                            </button>
                            <button
                              className="p-1 hover:bg-gray-100 rounded"
                              onClick={() => handleDeleteClick(order)}
                            >
                              <Trash2 className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-[#FCC5DC] text-white rounded hover:bg-pink-300"
                  onClick={handleAddClick}
                >
                  <PlusCircle className="w-5 h-5" />
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Confirm Deletion</h3>
            <p className="mt-2">
              Are you sure you want to delete {selectedOrder?.product}?
            </p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">
                {editMode ? "Edit Product" : "Add Product"}
              </h2>
              <button onClick={handleFormClose}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Main Category
                  </label>
                  <select
                    name="mainCategory"
                    value={formData.mainCategory}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  >
                    {Object.keys(categories).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Sub Category
                  </label>
                  <select
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                    disabled={!categories[formData.mainCategory]?.length}
                  >
                    {categories[formData.mainCategory]?.map((subCategory) => (
                      <option key={subCategory} value={subCategory}>
                        {subCategory}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded w-full min-h-[100px]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*\.?\d*$/.test(value)) {
                        handleChange(e);
                      }
                    }}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="qty"
                    value={formData.qty}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="mt-1 p-2 border border-gray-300 rounded w-full"
                  />
                </div>
                {imagePreviews.length > 0 && (
                  <div className="mt-4 flex items-center flex-wrap gap-4">
                    {imagePreviews.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`Preview ${index + 1}`}
                          className="rounded-lg h-20 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => deleteImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="sticky bottom-0 bg-white pt-4 mt-6 border-t">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleFormClose}
                      className="px-4 py-2 mr-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      {editMode ? "Update Product" : "Add Product"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
