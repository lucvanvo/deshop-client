import { NextResponse } from 'next/server';
import { auth } from '@/auth';


export const POST = auth(async (req) => {
    // Check if the user is authenticated and has the 'ADMIN' role
    if (!req.auth || req.auth.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const response = await fetch(process.env.BACKEND_PRODUCT_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${req.auth.user.accessToken}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json({ error: errorText }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
});

export const GET = auth(async (req) => {
    const searchParams = req.nextUrl.searchParams; // Get the search parameters from the request URL
    const ids = searchParams.get('ids');
    const url = new URL(process.env.BACKEND_PRODUCT_URL);
    if (ids) {
        url.searchParams.append('ids', ids);
    };

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json({ error: errorText }, { status: response.status });
        }

        if (response.status === 204) {
            return NextResponse.json({ message: 'No products found' }, { status: 204 });
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
});



