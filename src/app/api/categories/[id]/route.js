import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export const PUT = auth(async (req, { params }) => {
    // Check if the user is authenticated and has the 'ADMIN' role
    if (!req.auth || req.auth.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const response = await fetch(`${process.env.BACKEND_CATEGORY_URL}/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${req.auth.user.accessToken}`,
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to update category' }, { status: response.status });
        }

        const updatedCategory = await response.json();
        return NextResponse.json(updatedCategory);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
    }
});


export const DELETE = auth(async (req, { params }) => {
    // Check if the user is authenticated and has the 'ADMIN' role
    if (!req.auth || req.auth.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const response = await fetch(`${process.env.BACKEND_CATEGORY_URL}/${params.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${req.auth.user.accessToken}`,
            },
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to delete category' }, { status: response.status });
        }

        return NextResponse.json({ message: 'Category deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
});