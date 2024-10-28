import PropTypes from "prop-types";
import StatCard from "./StatCard";
import { useEffect , useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import axios from "axios";
import { set } from "@cloudinary/url-gen/actions/variable";



const StatCardGroup = () => {
  const [revenue , setRevenue] = useState(0);
  const [pendingOrders , setPendingOrders] = useState(0);
  const { token } = useContext(AuthContext);
  useEffect(() => {
    const fetchRevenue = async () => {
      try {

        const { data } = await axios.get(
          "http://localhost:8080/admin/revenue/month",
          {
            headers: { Authorization: `${token}` },
          }
        );
        console.log(data);
        console.log(data.total);
        setRevenue(data.total);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchPendingOrders = async () => {
      console.log("fetching pending orders");
      try {
        const { data } = await axios.get(
          "http://localhost:8080/admin/pending-orders",
          {
            headers: { Authorization: `${token}` },
          }
        );
        console.log(data);
        setPendingOrders(data.ordersNumber);
      } catch (error) {
        console.error(error);
      }
    }

    fetchRevenue();
    fetchPendingOrders();


  }, []);


	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-9 mt-6">
 {console.log(revenue)}
 {console.log(pendingOrders)}       
					<StatCard
						title={"This Month Revenue"}
						value={revenue}
						change={"+65%"}
					/>
          <StatCard
            title={"Pending Orders"}
            value={pendingOrders}
            change={"-15%"}
          />
			
		</div>
	);
};

StatCardGroup.propTypes = {
	stats: PropTypes.arrayOf(PropTypes.string),
};

export default StatCardGroup;
