import { Suspense } from "react";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "Dashboard — RBDeveloper",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#050505]">
      <Suspense>
        <Sidebar />
      </Suspense>
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
