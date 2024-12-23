import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { set } from "@cloudinary/url-gen/actions/variable";

const categories = {
	"Tech Accessories": [
		"Headphones & Earbuds",
		"Phone Cases & Chargers",
		"Smart Watches & Bands",
		"Cables & Adapters",
	],
	"Gaming Gear": [
		"Gaming Headsets",
		"Controllers",
		"Gaming Chairs & Accessories",
		"Mousepads & Keyboards",
	],
	"Home Decor & Lifestyle": [
		"LED Lights & Lamps",
		"Wall Art & Posters",
		"Desk Organizers",
	],
	"Gifts & Special Offers": [
		"Gift Sets",
		"Limited Edition Items",
		"Sales & Discounts",
	],
	"Best Sellers / Trending": [],
};

const ProductManager = () => {
	const { token } = useContext(AuthContext);
	const [orders, setOrders] = useState([]);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState(null);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [formData, setFormData] = useState({
		id: null,
		product: "",
		mainCategory: Object.keys(categories)[0],
		subCategory: categories[Object.keys(categories)[0]][0] || "",
		description: "",
		price: "",
		qty: "1",
		images: [],
	});
	const [imagePreviews, setImagePreviews] = useState([]);

	const handleDeleteClick = (order) => {
		setSelectedOrder(order);
		setIsDeleteModalOpen(true);
	};

	const confirmDelete = () => {
		const responce = axios.delete(
			`http://localhost:8080/admin/products/${selectedOrder.id}`,
			{
				headers: { Authorization: `${token}` },
			}
		);

		if (responce.status == 200) {
			alert("Product Deleted Successfully");
		}
		console.log("Deleted");
		setOrders(orders.filter((order) => order.id !== selectedOrder.id));
		setIsDeleteModalOpen(false);
		setSelectedOrder(null);
	};

	const updateProduct = async (product, imgs) => {
		console.log(imgs);
		const responce = await axios.put(
			`http://localhost:8080/admin/products/${product.id}`,
			{
				title: product.product,
				category: product.mainCategory,
				subcategory: product.subCategory,
				description: product.description,
				price: product.price,
				stock: product.qty,
				pictures: imgs,
			},
			{ headers: { Authorization: `${token}` } }
		);

		if (responce.status == 200) {
			alert("Product Updated Successfully");
		}
		const data = await responce.data;
		setIsFormOpen(false);
	
		console.log(data);
	};

	const cancelDelete = () => {
		setIsDeleteModalOpen(false);
		setSelectedOrder(null);
	};

	const handleAddClick = () => {
		const firstCategory = Object.keys(categories)[0];
		setFormData({
			id: null,
			product: "",
			mainCategory: firstCategory,
			subCategory: categories[firstCategory][0] || "",
			description: "",
			price: "",
			qty: "1",
			images: [],
		});
		setEditMode(false);
		setIsFormOpen(true);
		setImagePreviews([]);
	};

	const handleEditClick = (order) => {
		const pictures = order.Pictures.map((pic) => pic.url);
		setFormData({
			id: order.id,
			product: order.title,
			mainCategory: order.category,
			subCategory: order.subCategory,
			description: order.description,
			price: order.price,
			qty: order.quantity,
			images: pictures || [],
		});
		setEditMode(true);
		setIsFormOpen(true);
		setImagePreviews(pictures || []);
	};

	const handleFormClose = () => {
		setIsFormOpen(false);
		const firstCategory = Object.keys(categories)[0];
		setFormData({
			id: null,
			product: "",
			mainCategory: firstCategory,
			subCategory: categories[firstCategory][0] || "",
			description: "",
			price: "",
			qty: "1",
			images: [],
		});
		setImagePreviews([]);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === "mainCategory") {
			setFormData((prev) => ({
				...prev,
				[name]: value,
				subCategory: categories[value][0] || "",
			}));
		} else {
			setFormData((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleImageChange = (e) => {
		const files = Array.from(e.target.files);
		const imageUrls = files.map((file) => URL.createObjectURL(file));
		setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
		setImagePreviews((prev) => [...prev, ...imageUrls]);
	};

	const deleteImage = (index) => {
		const newImages = formData.images.filter((_, i) => i !== index);
		const newPreviews = imagePreviews.filter((_, i) => i !== index);
		setFormData((prev) => ({ ...prev, images: newImages }));
		setImagePreviews(newPreviews);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		let uploadedImageUrls = [];

		const uploadPromises = formData.images.map(async (image) => {
			const formDataImg = new FormData();
			formDataImg.append("file", image);
			formDataImg.append("upload_preset", "y4kjiphq");

			try {
				const response = await axios.post(
					`https://api.cloudinary.com/v1_1/defkusfga/image/upload`,
					formDataImg
				);
				return response.data.secure_url;
			} catch (error) {
				console.error("Image upload failed", error);
				return null;
			}
		});

		uploadedImageUrls = await Promise.all(uploadPromises);
		const firstImageUrl = uploadedImageUrls[0];

		console.log(uploadedImageUrls);

		if (editMode) {
			console.log("Editing");
			setOrders((prev) =>
				prev.map((order) =>
					order.id === formData.id
						? {
								...formData,
								images: uploadedImageUrls.filter(Boolean),
								image: uploadedImageUrls[0] || order.image,
						  }
						: order
				)
			);
			updateProduct(formData, uploadedImageUrls);
			return;
		}

		const responce = await axios.post(
			"http://localhost:8080/admin/products",
			{
				title: formData.product,
				category: formData.mainCategory,
				subcategory: formData.subCategory,
				description: formData.description,
				price: formData.price,
				stock: formData.qty,
				pictures: uploadedImageUrls,
			},
			{ headers: { Authorization: `${token}` } }
		);
		console.log(" .........................................");
		console.log(responce.data);
		console.log(" .........................................");

		handleFormClose();

		if (responce.status == 200) {
			alert("Product Added Successfully");
			setOrders((prev) => [...prev, responce.data]);
		}
	};

	return {
		orders,
		setOrders,
		isDeleteModalOpen,
		selectedOrder,
		isFormOpen,
		editMode,
		formData,
		categories,
		imagePreviews,
		deleteImage,
		setIsDeleteModalOpen,
		handleDeleteClick,
		confirmDelete,
		cancelDelete,
		handleAddClick,
		handleEditClick,
		handleFormClose,
		handleChange,
		handleImageChange,
		handleSubmit,
	};
};

export default ProductManager;
