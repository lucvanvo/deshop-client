import OrderDetails from "@/components/OrderDetails";


export default async function OrderPage({ params }) {
    const { id } = await params;
    return <OrderDetails id={id} />;
}