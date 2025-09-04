Add product api/route.js

// Next.js ka built-in response object jo API route mein response bhejne ke kaam aata hai
import { NextResponse } from "next/server";

// Axios ka custom instance jo aapne configure kiya hoga (baseURL waghera)
import axiosClient from "@/config/axiosClient";

// API endpoints ka config object, jisme `productForm.create` URL hoga
import { apiConfig } from "@/config/apiConfig";

// Next.js ke liye config jisme bodyParser ko disable kiya gaya hai
// Kyun ke hum manually binary data (e.g. file uploads) handle karna chah rahe hain
export const config = {
api: {
bodyParser: false, // Disable automatic parsing of body
},
};

// POST method handler jo client ki request ko receive karta hai
export async function POST(req) {
try {
// Request body ko as a raw arrayBuffer read karo
const buffer = Buffer.from(await req.arrayBuffer());

    // Original Content-Type header client se le lo (e.g., multipart/form-data)
    const contentType = req.headers.get("content-type");

    // Axios ke through external API ko request bhejo
    const response = await axiosClient.post(
      apiConfig.productForm.create, // API endpoint (e.g., /api/products)
      buffer, // Binary buffer data bhejna hai (image/file/form-data)
      {
        headers: {
          "Content-Type": contentType, // Wahi content-type jo client ne diya
        },
      }
    );

    // External API se jo response aya usko Next.js ke response ke through return karo
    return NextResponse.json(response.data, { status: response.status });

} catch (error) {
// Agar koi error aaye to console mein show karo
console.error("Route API Error:", error);

    // Error ka response client ko bhejna (status aur message ke sath)
    return NextResponse.json(
      {
        message:
          error?.response?.data?.message || "Server Error", // Custom message ya default
      },
      {
        status: error?.response?.status || 500, // Status code (external API ka ya default 500)
      }
    );

}
}

Update Product api/route.js

import { NextResponse } from "next/server";
import axiosClient from "@/config/axiosClient";
import { apiConfig } from "@/config/apiConfig";

// Body parser disable karna zaroori hai jab hum manually file ya form data handle kar rahe hoon
export const config = {
api: {
bodyParser: false,
},
};

export async function PUT(req, { params }) {
try {
// 1. URL se product ka ID nikalna (e.g., /api/products/[id])
const { id } = params;

        // 2. Client se aaya content-type le lena (e.g., multipart/form-data)
        const contentType = req.headers.get("content-type");

        // 3. Raw request body ko as a buffer read karna
        const buffer = Buffer.from(await req.arrayBuffer());

        // 4. Axios ke zariye backend update API ko request bhejna
        const response = await axiosClient.put(
            `${apiConfig.productForm.update}/${id}`, // e.g., /api/products/update/123
            buffer, // Raw binary data (image/form fields)
            {
                headers: {
                    "Content-Type": contentType, // Original content type
                },
            }
        );

        // 5. Backend se response aane ke baad client ko wohi response return kar dena
        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        // 6. Agar koi error aaye to usko handle karna
        console.error("Update Route API Error:", error);

        return NextResponse.json(
            {
                message: error?.response?.data?.message || "Server Error",
            },
            {
                status: error?.response?.status || 500,
            }
        );
    }

}
