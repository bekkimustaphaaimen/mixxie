import { useState } from "react";
import axios from "axios";
import { Trash2, ChevronDown } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const OrderRow = ({ order, setOrders }) => {
	const [dropDownValue, setDropDownValue] = useState(order.status);
	const [isExpanded, setIsExpanded] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { token } = useContext(AuthContext);
	const [orderDetails, setOrderDetails] = useState(null);
	const handleDeleteClick = () => {
		setIsModalOpen(true);
	};

	const confirmDelete = () => {
		const responce = axios.delete(
			`http://localhost:8080/admin/orders/${order.id}`,
			{
				headers: { Authorization: `${token}` },
			}
		);
		if (responce.status == 200) {
			alert("Order Deleted Successfully");
		}
		setOrders((orders) => orders.filter((orderi) => orderi.id !== order.id));
		setIsModalOpen(false);
	};

	const cancelDelete = () => {
		setIsModalOpen(false);
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "Pending":
				return "text-red-500";
			case "Processing":
				return "text-blue-500";
			case "Completed":
				return "text-green-500";
			default:
				return "text-gray-500";
		}
	};

	const updateOrderStatus = async (id, status) => {
		try {
			const response = await axios.put(
				`http://localhost:8080/admin/orders/${id}`,
				{ status },
				{ headers: { Authorization: `${token}` } }
			);
			if (response.status === 200) {
				setDropDownValue(status);
				alert("Order Status Updated Successfully");
			}
		} catch (error) {
			console.error("Error updating order status:", error);
		}
	};
	const expandHandler = async () => {
		const orderDetails = await axios.get(
			`http://localhost:8080/admin/orders/${order.id}`,
			{
				headers: { Authorization: `${token}` },
			}
		);
		setOrderDetails(orderDetails.data.order);
		setIsExpanded(!isExpanded);
	};

	return (
		<>
			<tr
				key={order.id}
				className="border-b hover:bg-gray-50 transition-colors"
			>
				<td className="py-4 px-4">
					<div className="flex items-center gap-3">
						<img
							src={order.subOrders[0].picture}
							alt={`Order #${order.id}`}
							className="w-10 h-10 rounded-lg object-cover"
						/>
						<span className="text-sm text-gray-700">{order.title}</span>
					</div>
				</td>
				<td className="py-4 px-4 text-sm text-gray-600">{order.quantity}</td>
				<td className="py-4 px-4 text-sm text-gray-600">{order.createdAt}</td>
				<td className="py-4 px-4 text-sm text-gray-600">{order.orderPrice}</td>

				<td className="py-4 px-4">
					<select
						className={`text-sm ${getStatusColor(dropDownValue)} p-1 rounded`}
						value={dropDownValue}
						onChange={(e) => updateOrderStatus(order.id, e.target.value)}
					>
						<option value="Pending">Pending</option>
						<option value="Processing">Call Confirmed</option>
						<option value="Completed">Completed</option>
					</select>
				</td>

				<td className="py-4 px-4">
					<div className="flex items-center gap-2">
						<button
							className="p-1 hover:bg-gray-100 rounded"
							onClick={() => handleDeleteClick(order)}
						>
							<Trash2 className="w-4 h-4 text-gray-500" />
						</button>
						<button
							className="p-1 hover:bg-gray-100 rounded"
							onClick={() => expandHandler()}
						>
							{isExpanded ? "▲" : "▼"}
						</button>
					</div>
				</td>
			</tr>

			{isExpanded && (
				<tr className="bg-gray-100">
					<td colSpan="6" className="p-4 text-sm text-gray-700">
						<div className="flex flex-col gap-4">
							{/* Order Date and Delivery Date */}
							<div className="flex justify-between text-gray-500 text-xs">
								<p>Order date: {orderDetails.createdAt}</p>
								<p className="text-green-500 pl-10">Total Order Price: {orderDetails.orderPrice} DZD </p>
							</div>

							{/* Order Items */}
							<div className="border-t border-gray-300 pt-4">
								{orderDetails.subOrders.map((item, index) => (
									<div
										key={index}
										className="flex justify-between items-center py-2"
									>
										<div className="flex items-center gap-4">
											<img
												src={item.picture}
												alt={item.title}
												className="w-12 h-12 rounded-lg object-cover"
											/>
											<div>
												<p className="font-semibold text-gray-800">
													{item.title}
												</p>
												<p className="text-xs text-gray-500">test</p>
											</div>
										</div>
										<div className="text-right">
											<p className="font-semibold text-gray-800">
												${item.price.toFixed(2)}
											</p>
											<p className="text-xs text-gray-500">
												Qty: {item.quantity}
											</p>
										</div>
									</div>
								))}
							</div>

							{/* Payment and Delivery Information */}
							<div className="flex justify-between gap-4 border-t border-gray-300 pt-4 text-xs text-gray-600">
								<div>
									<p className="font-semibold text-gray-800 mb-1">Client Name</p>
									<p>{orderDetails.name}</p>
                                    <p className="font-semibold text-gray-800 mb-1">
										Phone Number :
									</p>
									<p>{order.phone}</p>
                                    
								</div>
								<div>
									<p className="font-semibold text-gray-800 mb-1">
										Delivery Address :
									</p>
									<p>{orderDetails.address}</p> , {orderDetails.wilaya}
									<p className="font-semibold text-gray-800 mb-1">
										Delivery Type :
									</p>
									<p>{orderDetails.delivery}</p>
								</div>
                                <div>
                                    <p className="font-semibold text-gray-800 mb-1">Total number of orderred Products :</p>
                                    <p>{orderDetails.quantity}</p>
                                     <p className="font-semibold text-gray-800 mb-1">Order Status :</p>
                                    <p>{orderDetails.status}</p>
                                </div>

							</div>
						</div>
					</td>
				</tr>
			)}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-6 rounded-lg shadow-lg">
						<h3 className="text-lg font-semibold">Confirm Deletion</h3>
						<p className="mt-2">
							Are you sure you want to delete {order?.title}?
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
		</>
	);
};

export default OrderRow;
