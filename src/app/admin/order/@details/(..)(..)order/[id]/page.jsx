import OrderDetails from "@/component/OrderDetails.jsx";
import ModalContainer from "@/component/ModalContainer.jsx";

export default async function OrderPage({ params }) {

    const { id } = await params;
    return (
        // Modal component to show order details
        <ModalContainer>
            <OrderDetails id={id} />
        </ModalContainer>
    );
}