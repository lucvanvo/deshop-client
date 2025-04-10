import { NextResponse } from 'next/server';
import { auth } from '@/auth';


export const DELETE = auth(async (req, { params }) => {
    // Check if the user is authenticated and has the 'ADMIN' role
    if (!req.auth || req.auth.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    try {
        const response = await fetch(`${process.env.BACKEND_PRODUCT_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${req.auth.user.accessToken}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json({ error: errorText }, { status: response.status });
        }

        return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
});