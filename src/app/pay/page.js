"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/component/Button";

export default function PayPage() {
    const router = useRouter();
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [form, setForm] = useState({
        name: "",
        phone: "",
        address: "",
        email: "",
        notes: "",
    });
    const [orderInfo, setOrderInfo] = useState(null);

    useEffect(() => {
        const products = JSON.parse(localStorage.getItem("selectedProducts")) || [];
        setSelectedProducts(products);

        //Lấy thông tin người nhận từ localStorage
        const savedOrderInfo = JSON.parse(localStorage.getItem("orderInfo"));
        if (savedOrderInfo) {
            setOrderInfo(savedOrderInfo);

        }
    }, []);

    const totalPrice = selectedProducts.reduce((sum, p) => sum + p.price * p.quantity, 0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleConfirmInfo = () => {
        if (!form.name || !form.phone || !form.address || !form.email) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }
        setOrderInfo(form);
        localStorage.setItem("orderInfo", JSON.stringify(form)); // Lưu thông tin vào localStorage
        setShowPopup(false);
    };

    const handleEditInfo = () => {
        // Hiển thị popup và điền lại thông tin đã nhập vào form
        setForm(orderInfo);
        setShowPopup(true);
    };

    const handleOrder = async () => {
        if (!orderInfo) {
            setShowPopup(true);
            return;
        }

        try {
            const orderData = {
                orderPersonName: orderInfo.name,
                phoneNumber: orderInfo.phone,
                email: orderInfo.email,
                address: orderInfo.address,
                notes: orderInfo.notes || "",
                status: "NEW",
                totalPrice,
                orderDetails: selectedProducts.map((product) => ({
                    productId: product.id,
                    quantity: product.quantity,
                })),
            };

            console.log("Dữ liệu đơn hàng:", orderData);

            const res = await fetch(process.env.NEXT_PUBLIC_PROXY_ORDER_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            const responseText = await res.text();
            console.log("Phản hồi từ backend:", res.status, responseText);

            if (!res.ok) {
                try {
                    const errorData = JSON.parse(responseText);
                    throw new Error(errorData.error || "Lỗi khi tạo đơn hàng");
                } catch {
                    throw new Error(responseText || "Lỗi không xác định từ backend");
                }
            }

            // Lọc các sản phẩm chưa được chọn
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const remainingProducts = cart.filter(
                (product) => !selectedProducts.some((selected) => selected.id === product.id)
            );

            // Cập nhật lại giỏ hàng trong localStorage
            localStorage.setItem("cart", JSON.stringify(remainingProducts));

            alert("Đặt hàng thành công!");
            router.push("/shopping");
        } catch (err) {
            console.error("Lỗi khi đặt hàng:", err);
            alert(err.message || "Đã xảy ra lỗi khi đặt hàng.");
        }
    };

    return (
        <div className="flex flex-col items-center bg-[#f9f9f9] min-h-screen py-6 text-black">
            <div className="w-full max-w-[700px] bg-white p-4 rounded-lg shadow-md relative">
                <Button text="Hủy"
                    onClick={() => router.push("/Cart")}
                    className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition" />

                <h2 className="text-xl font-bold text-center mb-4">Thanh toán</h2>

                {orderInfo ? (
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Tên: {orderInfo.name}</h3>
                        <p className="text-sm">SDT: {orderInfo.phone}</p>
                        <p className="text-sm">Địa chỉ: {orderInfo.address}</p>
                        <p className="text-sm">Email: {orderInfo.email}</p>
                        {orderInfo.notes && <p className="text-sm italic">Ghi chú: {orderInfo.notes}</p>}
                        <Button text="Chỉnh sửa thông tin"
                            onClick={handleEditInfo}
                            className="mt-2 text-sm text-blue-500 underline hover:text-blue-700" />
                    </div>
                ) : (
                    <div
                        onClick={() => setShowPopup(true)}
                        className="mb-4 text-sm italic text-gray-500 underline cursor-pointer hover:text-gray-700"
                    >
                        Chưa có thông tin người nhận – ấn vào để thêm
                    </div>
                )}

                {selectedProducts.map((product) => (
                    <div key={product.id} className="flex items-center gap-4 mb-4">
                        <img
                            src={`/api/images/${encodeURIComponent(product.imageUrl || product.image)}`}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-red-500 text-sm">{product.price.toLocaleString()} vnd</p>
                        </div>
                        <span className="text-sm">x{product.quantity}</span>
                    </div>
                ))}

                <div className="flex justify-between items-center border-t pt-4">
                    <span className="text-lg font-semibold">Tổng thanh toán</span>
                    <span className="text-red-500 text-xl font-bold">{totalPrice.toLocaleString()} vnd</span>
                </div>
                <Button text="Đặt hàng"
                    onClick={handleOrder}
                    className="w-full bg-red-500 text-white py-2 mt-4 rounded-md hover:bg-red-600 transition"
                />
            </div>

            {showPopup && (
                <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md">
                        <h3 className="text-lg font-bold mb-4">Nhập thông tin nhận hàng</h3>
                        <input
                            type="text"
                            name="name"
                            placeholder="Họ tên"
                            value={form.name}
                            onChange={handleInputChange}
                            className="w-full mb-2 p-2 border rounded"
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Số điện thoại"
                            value={form.phone}
                            onChange={handleInputChange}
                            className="w-full mb-2 p-2 border rounded"
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Địa chỉ"
                            value={form.address}
                            onChange={handleInputChange}
                            className="w-full mb-2 p-2 border rounded"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleInputChange}
                            className="w-full mb-2 p-2 border rounded"
                        />
                        <textarea
                            name="notes"
                            placeholder="Ghi chú (tuỳ chọn)"
                            value={form.notes}
                            onChange={handleInputChange}
                            className="w-full mb-2 p-2 border rounded"
                        />
                        <div className="flex justify-end gap-2">
                            <Button
                                text="Hủy"
                                onClick={() => setShowPopup(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            />
                            <Button
                                text="Xác nhận"
                                onClick={handleConfirmInfo}
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}