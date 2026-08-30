"use client";

import { useParams } from "next/navigation";
import { BACKEND_URL } from "@/keyword";
import { useState, useEffect } from "react";
import ProductDetails from "../../../Components/SingleProduct/ProductDetails";

export default function SingleProductPage() {
    const params = useParams();

    const [singlePageData, setSinglePageData] = useState(null);

    useEffect(() => {
        if (!params.singlepageslug) return;

        const fetchSinglePage = async () => {
            try {
                const response = await fetch(
                    `${BACKEND_URL}/api/products/singleProduct/${params.singlepageslug}`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                setSinglePageData(data);
            } catch (error) {
                console.error("Error fetching single page:", error);
            }
        };

        fetchSinglePage();
    }, [params.singlepageslug]);


    if (!singlePageData) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    if (!singlePageData.success || !singlePageData.product) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p>Tour not found.</p>
            </div>
        );
    }

    return (
        <ProductDetails product={singlePageData.product} />
    );
}