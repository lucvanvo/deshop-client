import OrderItemList from "@/component/OrderItemList";
import dayjs from "dayjs";

const StatusText = {
    NEW: "Mới",
    PROCESSING: "Đang xử lý",
    COMPLETED: "Đã hoàn thành",
    CANCELLED: "Đã hủy"
}


export default async function OrderDetails({ id }) {
    let order = await getOrder(id);

    if (!order) {
        return <div className="text-red-500">No order details available</div>;
    }
    console.log(order.orderDate);

    const orderDetails = order.orderDetails;

    return <div className="p-4 bg-white rounded-lg text-gray-800 ">
        <h2 className="text-2xl font-bold mb-4">Đơn hàng #{order.id}</h2>
        <div>
            <p className="text-gray-600">Người nhận: <b>{order.orderPersonName}</b></p>
            <p className="text-gray-600">Ngày đặt hàng: <b>{dayjs(order.orderDate).format("HH:mm DD/MM/YYYY")}</b> </p>
            <p className="text-gray-600">Trạng thái: <b>{StatusText[order.status]}</b> </p>
            <p className="text-gray-600">Địa chỉ giao hàng: <b>{order.address}</b> </p>
            <p className="text-gray-600">Số điện thoại: <b>{order.phoneNumber}</b> </p>
            <p className="text-gray-600">Ghi chú: <b>{order.notes}</b></p>
        </div>
        <div>
            <h3 className="text-lg font-semibold mt-4">Chi tiết đơn hàng:</h3>
            <OrderItemList orderDetails={orderDetails} />
        </div>
        <div className="mt-4">
            <p className="text-gray-600">Tổng tiền: <b>{order.totalPrice.toLocaleString()} VND</b> </p>
        </div>
    </div>
}

async function getOrder(id) {
    'server only'
    try {
        // Simulate fetching order details from an API
        const response = await fetch(`${process.env.NEXT_PUBLIC_PROXY_ORDER_API_URL}?ids=${id}&withDetails=true`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch order details');
        }

        const data = await response.json();
        if (!data || data.length === 0) {
            return null; // No order details found
        }

        return data[0]; // Assuming the API returns an array of order details
    } catch (error) {
        console.error('Error fetching order details:', error);
        return null; // Handle error gracefully
    }
}