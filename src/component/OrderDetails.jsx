export default async function OrderDetails({ id }) {
    let order = await getOrder(id);

    if (!order) {
        return <div className="text-red-500">No order details available</div>;
    }

    const orderDetails = order.orderDetails;
    const productIds = orderDetails.map((item) => item.productId);

    let product = await getProduct(productIds);
    console.log(product, "product");


    return <div className="p-4 w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Order Details</h2>
        <p className="text-gray-700">Order ID: {orderDetails.id}</p>
        <p className="text-gray-700">Customer Name: {orderDetails.orderPersonName}</p>
        <p className="text-gray-700">Order Date: {new Date(orderDetails.orderDate).toLocaleDateString()}</p>
        {/* Additional order details can be displayed here */}
    </div>
}


async function getProduct(productIds) {
    try {
        // Simulate fetching product details from an API
        const response = await fetch(`${process.env.NEXT_PUBLIC_PROXY_PRODUCT_API_URL}?ids=${productIds.join(',')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }

        const data = await response.json();
        if (!data || data.length === 0) {
            return null; // No product details found
        }

        return data; // Assuming the API returns an array of product details
    } catch (error) {
        console.error('Error fetching product details:', error);
        return null; // Handle error gracefully
    }

}

async function getOrder(id) {

    try {
        // Simulate fetching order details from an API
        const response = await fetch(`${process.env.NEXT_PUBLIC_PROXY_ORDER_API_URL}?ids=${id}&withDetails=true`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

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