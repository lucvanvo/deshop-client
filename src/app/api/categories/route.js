import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export const GET = auth(async (req) => {
    // Check if the user is authenticated and has the 'ADMIN' role
    if (!req.auth || req.auth.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const response = await fetch(process.env.BACKEND_CATEGORY_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${req.auth.user.accessToken}`,
            },
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch categories' }, { status: response.status });
        }

        // Assuming the API returns a JSON response with a list of categories
        const categories = await response.json();
        // Check if the response contains the expected data structure
        if (!Array.isArray(categories)) {
            return NextResponse.json({ error: 'Invalid response format' }, { status: 500 });
        }
        // Return the categories as a JSON response
        return NextResponse.json(categories);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
    }
});

export const POST = auth(async (req) => {
    // Check if the user is authenticated and has the 'ADMIN' role
    if (!req.auth || req.auth.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const response = await fetch(process.env.BACKEND_CATEGORY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${req.auth.user.accessToken}`,
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to create category' }, { status: response.status });
        }

        const newCategory = await response.json();
        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
    }
});