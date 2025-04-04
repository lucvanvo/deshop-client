"use client"

export default function PetCarServices() {
    return (
        <div className="w-full bg-orange-100 p-8 flex justify-center items-center">
            <div className="flex w-3/4 justify-between">
                <ServiceItem
                    icon="/image/petcare1.svg"
                    title="Phụ Kiện"
                    description="   Các phụ kiện cần thiết được thiết kế cho những chuyến phiêu lưu vui vẻ cùng thú cưng của bạn."
                />
                <ServiceItem
                    icon="/image/petcare2.svg"
                    title="Chăm Sóc"
                    description="   Kiểm soát bộ lông của thú cưng và giữ vệ sinh tốt."
                />
                <ServiceItem
                    icon="/image/petcare3.svg"
                    title="Chế độ ăn uống"
                    description="   Tìm chế độ ăn uống hoàn hảo để đáp ứng các yêu cầu cụ thể của người bạn lông xù của bạn."
                />
            </div>
        </div>
    )
}

function ServiceItem({ icon, title, description }) {
    return (
        <div className="flex items-center w-1/3 px-4 text-left">
            <img src={icon} alt={title} className="w-16 h-16 mr-4" />
            <div>
                <h3 className="text-red-500 text-xl font-bold mb-2 text-[26px]">{title}</h3>
                <p className="text-gray-700 text-sm text-[22px]">{description}</p>
            </div>
        </div>
    )
}