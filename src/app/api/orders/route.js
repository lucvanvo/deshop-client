import { auth } from '@/auth';
import { NextResponse } from 'next/server';


export const GET = auth(async (req) => {
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
            },
        });
        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch orders' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
});