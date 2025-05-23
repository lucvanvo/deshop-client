'use client'
import FooterUI from "@/component/FooterUI"
import Header from "@/component/HeaderUI"
import PetCarServices from "@/component/PetCareServices"
import PetHappiness from "@/component/PetHappiness"
import PetHavent from "@/component/PetHavent"
import PromoBanner from "@/component/PromoBanner"
import { metadata } from "./layout"
import { title } from "process"

export default function Home() {
    return (
        <div>
            <Header />
            <PetHavent />
            <PetHappiness />
            <PetCarServices />
            <PromoBanner />
            <FooterUI />
        </div>
    )
}