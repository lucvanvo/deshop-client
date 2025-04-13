'use client';

import { useRouter } from 'next/navigation'
import Button from '@/component/Button';

export default function ModalContainer({ children }) {
    const router = useRouter();
    return (
        <div className="w-full h-full flex justify-center items-center backdrop-blur-md bg-opacity-50 fixed top-0 left-0 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[70%] ">
                {children}
                <div className="mt-4 flex justify-end">
                    <Button text="Close" onClick={() => router.back()} className="bg-blue-500 text-white px-4 py-2 rounded" />
                </div>
            </div>
        </div>
    );
}