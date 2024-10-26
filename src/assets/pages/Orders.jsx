import { useState } from "react";
import { Trash2 } from "lucide-react";
import StatCardGroup from "../compontes/stats/StatCardGroup ";
import Sidebar from "../compontes/common/Sidebar";

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "text-red-500";
    case "Shipping":
      return "text-blue-500";
    case "Refund":
      return "text-yellow-500";
    case "Completed":
      return "text-green-500";
    default:
      return "text-gray-500";
  }
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleDeleteClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    setOrders(orders.filter((order) => order.id !== selectedOrder.id));
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

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
                  Latest Orders
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
                        QTY
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">
                        Date
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">
                        Revenue
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">
                        Net Profit
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">
                        Status
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-medium text-gray-500">
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
                          {order.qty}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {order.date}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {order.revenue}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {order.netProfit}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`text-sm ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
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
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
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
    </div>
  );
};

export default Orders;
