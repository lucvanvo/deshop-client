'use client'
import { useSession } from "next-auth/react";

export default function UserBox() {
    const { data: session } = useSession();

    return (
        <div>
            {session ? (
                <p>Xin chào {session.user.name}</p>
            ) : (
                <p>Bạn chưa đăng nhập</p>
            )}
        </div>
    );
}
