import { auth } from '@/auth';
import { NextResponse } from 'next/server';

// API GET: Lấy danh sách đơn hàng
export const GET = auth(async (req) => {

    // Check if the user is authenticated and has the 'ADMIN' role
    if (!req.auth || req.auth.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }


    const searchParams = req.nextUrl.searchParams;
    const ids = searchParams.get('ids');
    const withDetails = searchParams.get('withDetails');
    const url = new URL(process.env.BACKEND_ORDER_URL);

    if (ids) {
        url.searchParams.append('ids', ids);
    }

    if (withDetails) {
        url.searchParams.append('withDetails', withDetails);
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${req.auth.user.accessToken}`, // Gửi token xác thực nếu cần
            },
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch orders' }, { status: response.status });
        }

        if (response.status === 204) {
            return NextResponse.json([]);
        }

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
});

// API POST: Tạo đơn hàng mới
export const POST = auth(async (req) => {
    // Lấy dữ liệu đơn hàng từ body request
    const orderData = await req.json();
    console.log("Dữ liệu gửi đến backend:", orderData);

    // Kiểm tra nếu BACKEND_ORDER_URL không được cấu hình đúng
    const backendOrderUrl = process.env.BACKEND_ORDER_URL;
    if (!backendOrderUrl) {
        console.error('BACKEND_ORDER_URL is not defined in .env.local');
        return NextResponse.json({ error: 'Internal Server Error: BACKEND_ORDER_URL not defined' }, { status: 500 });
    }

    // Đảm bảo dữ liệu đầy đủ trước khi gửi đến backend
    if (!orderData.orderPersonName || !orderData.address || !orderData.phoneNumber || !orderData.email || !orderData.orderDetails || !orderData.totalPrice) {
        console.error('Thiếu thông tin đơn hàng cần thiết.');
        return NextResponse.json({ error: 'Missing required order information' }, { status: 400 });
    }

    try {
        // Gửi yêu cầu POST đến backend để tạo đơn hàng
        const response = await fetch(backendOrderUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${req?.auth?.user?.accessToken}`, // Gửi token xác thực nếu cần
            },
            body: JSON.stringify(orderData), // Gửi dữ liệu đơn hàng vào body của request
        });

        // Kiểm tra nếu phản hồi từ backend không thành công
        if (!response.ok) {
            const errorText = await response.text(); // Lấy chi tiết lỗi từ backend
            console.error("Phản hồi lỗi từ backend:", errorText);
            return NextResponse.json({ error: 'Failed to create order', details: errorText }, { status: response.status });
        }

        // Nếu phản hồi thành công, trả về dữ liệu đơn hàng đã được tạo
        const data = await response.json();
        console.log("Phản hồi thành công từ backend:", data);
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        // Xử lý lỗi nếu có sự cố khi gửi yêu cầu
        console.error('Error creating order:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
});
