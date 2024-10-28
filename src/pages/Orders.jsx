import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import StatCardGroup from "../compontes/stats/StatCardGroup ";
import Sidebar from "../compontes/common/Sidebar";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import OrderLine from "../compontes/orderRow";

// Utility function to determine status color

const Orders = () => {
	const { token } = useContext(AuthContext);
	const [orders, setOrders] = useState([]);
	
	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const { data } = await axios.get(
					"http://localhost:8080/admin/allorders",
					{
						headers: { Authorization: `${token}` },
					}
				);
				console.log(data);
				console.log(data.orders);
				setOrders(data.orders);
			} catch (error) {
				console.error(error);
			}
		};

		fetchOrders();
	}, []);

	return (
		<div className="min-h-screen bg-gray-100">
			<Sidebar />
			<div className="ml-16 p-6 font-inter pl-20">
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
												Status
											</th>
											<th className="text-left py-4 px-4 text-sm font-medium text-gray-500">
												Actions
											</th>
										</tr>
									</thead>
									<tbody>
										{orders?.map(
											(order) => (
												<OrderLine order={order} key={order.id}  setOrders={setOrders}  />
											)
										)}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
			
		</div>
	);
};

export default Orders;
