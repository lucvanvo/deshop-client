"use client"

import HeaderSearch from "@/component/HeaderSearch"
import ProductSearch from "@/component/ProductSearch"

export default function SearchPage() {
    return (
        <div className="bg-[#FFF7EB] min-h-screen">
            <HeaderSearch />
            <div className="flex flex-wrap gap-4 justify-center p-4">
                <ProductSearch name="Catsrang 5kg" price="465.000 vnd" />
                <ProductSearch name="Catsrang 5kg" price="465.000 vnd" />
                <ProductSearch name="Catsrang 5kg" price="465.000 vnd" />
                <ProductSearch name="Catsrang 5kg" price="465.000 vnd" />
                <ProductSearch name="Catsrang 5kg" price="465.000 vnd" />
                <ProductSearch name="Catsrang 5kg" price="465.000 vnd" />
                <ProductSearch name="Catsrang 5kg" price="465.000 vnd" />
                <ProductSearch name="Catsrang 5kg" price="465.000 vnd" />
                <ProductSearch name="Catsrang 5kg" price="465.000 vnd" />
                <ProductSearch name="Catsrang 5kg" price="465.000 vnd" />
                <ProductSearch name="Catsrang 5kg" price="465.000 vnd" />
                <ProductSearch name="Catsrang 5kg" price="465.000 vnd" />
            </div>

        </div>
    )
}