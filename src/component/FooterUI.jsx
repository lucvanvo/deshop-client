"use client"

export default function FooterUI() {
    return (
        <footer className="w-full bg-orange-100 p-6 flex justify-between items-center">
            <div className="flex flex-col items-start">
                <img src="/image/logo.png" alt="Dẻ's Shop Logo" className="w-24 h-auto" />
            </div>

            <p className="text-red-500 text-sm text-center">© 2024. All Rights Reserved.</p>
        </footer>
    )
}