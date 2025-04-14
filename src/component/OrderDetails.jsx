import OrderItemList from "@/component/OrderItemList";
import dayjs from "dayjs";
import { getOrder } from '@/lib/OrderUtils';

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

