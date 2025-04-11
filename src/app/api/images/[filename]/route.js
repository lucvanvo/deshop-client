import fs from "fs/promises";
import path from "path";

const BASE_DIR = "D:/images"; // Thư mục chứa hình ảnh

export async function GET(req, { params }) {
    try {
        const { filename } = params;

        if (!filename) {
            return new Response("Missing filename", { status: 400 });
        }

        // Bảo mật đường dẫn: Loại bỏ các ký tự không hợp lệ
        const sanitizedFileName = path.basename(filename);
        const filePath = path.join(BASE_DIR, sanitizedFileName);

        // Đọc tệp
        const fileBuffer = await fs.readFile(filePath);

        // Xác định MIME type
        const ext = path.extname(filePath).toLowerCase();
        const mimeType = {
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
            ".gif": "image/gif",
        }[ext] || "application/octet-stream";

        return new Response(fileBuffer, {
            status: 200,
            headers: {
                "Content-Type": mimeType,
            },
        });
    } catch (error) {
        console.error("❌ Lỗi khi xử lý hình ảnh:", error);

        if (error.code === "ENOENT") {
            return new Response("File not found", { status: 404 });
        }

        return new Response("Internal Server Error", { status: 500 });
    }
}