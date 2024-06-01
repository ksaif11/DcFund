"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";
import { Appwrapper } from "context/index";
import { EthersProvider } from "@/context/EthersContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />

      <body className="bg-black">
        <Appwrapper>
          <EthersProvider>
            <Providers>
              <Header />
              {children}
              <Footer />
              <ScrollToTop />
            </Providers>
          </EthersProvider>
        </Appwrapper>
      </body>
    </html>
  );
}

import { Providers } from "./providers";
import Home from "./afterlogin/page";
