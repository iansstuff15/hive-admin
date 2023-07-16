"use client"
import AppLayout from "@/components/appLayout";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathName = usePathname()
  return (
    <AppLayout>
      <h1>{pathName.split('/').toString().toUpperCase().split(',')}</h1>
    </AppLayout>
  )
}
