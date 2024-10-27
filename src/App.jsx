import { Routes, Route, Navigate } from "react-router-dom";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import LoginPage from "./pages/LoginPage";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthProvider";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated } = useContext(AuthContext);

	if (!isAuthenticated) {
		return <Navigate to="/" replace />;
	}

	return children;
};
const App = () => {
	const { isAuthenticated } = useContext(AuthContext);
	return (
		<Routes>
			<Route
				path="/"
				element={
					isAuthenticated ? <Navigate to={"/orders"} replace /> : <LoginPage />
				}
			/>
			<Route
				path="/orders"
				element={isAuthenticated ? <Orders /> : <Navigate to="/" replace />}
			/>
			<Route
				path="/products"
				element={isAuthenticated ? <Products /> : <Navigate to="/" replace />}
			/>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
};

export default App;
