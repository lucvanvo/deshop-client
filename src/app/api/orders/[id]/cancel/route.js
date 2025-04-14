import { NextResponse } from 'next/server';
import { auth } from '@/auth';


export const POST = auth(async (req, { params }) => {
    // Check if the user is authenticated and has the 'ADMIN' role
    if (!req.auth || req.auth.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    try {
        const response = await fetch(`${process.env.BACKEND_ORDER_URL}/${id}/cancel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${req.auth.user.accessToken}`,
            },
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to cancel order' }, { status: response.status });
        }

        return NextResponse.json({ message: 'Order cancelled successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to cancel order' }, { status: 500 });
    }
});