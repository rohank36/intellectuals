'use client'
import { useRouter } from 'next/navigation';
import NavBar from "./NavBar";

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const router = useRouter()
    return(
        <div>
            <NavBar/>
            <section className="mt-10">{children}</section>
        </div>
    )
  }