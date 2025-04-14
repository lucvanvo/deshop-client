import Link from "next/link";

export default async function OrderLayout({ children, details }) {
    return <>
        {children}
        {details}
    </>
}