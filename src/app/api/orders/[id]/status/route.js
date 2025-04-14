import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const PATCH = auth(async (req, { params }) => {

    // Check if the user is authenticated and has the 'ADMIN' role
    if (!req.auth || req.auth.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const data = await req.json();
    console.log(data);

    try {
        const response = await fetch(`${process.env.BACKEND_ORDER_URL}/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${req.auth.user.accessToken}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to update order' }, { status: response.status });
        }

        return NextResponse.json({ message: 'Order updated successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
    }
});