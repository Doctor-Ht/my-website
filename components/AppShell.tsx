"use client";

import ThemeProvider from "@/components/ThemeProvider";
import CursorGlow from "@/components/CursorGlow";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import SearchDialog from "@/components/SearchDialog";
import type { ReactNode } from "react";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">{children}</main>
      <BackToTop />
      <Footer />
      <SearchDialog />
    </ThemeProvider>
  );
}
