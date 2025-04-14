import OrderDetails from "@/component/OrderDetails";


export default async function OrderPage({ params }) {
    const { id } = await params;
    return <div className="w-3/4 mx-auto mt-10">
        <OrderDetails id={id} />
    </div>;
}