"use server";

import { auth } from '@/auth';

export async function getOrder(id) {

    const session = await auth();
    try {
        // Simulate fetching order details from an API
        const response = await fetch(`${process.env.BACKEND_ORDER_URL}?ids=${id}&withDetails=true`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${session.user.accessToken}`,
            },
        });
        console.log("Response status:", response.status); // Log the response status

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