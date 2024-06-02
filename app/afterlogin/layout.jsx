// import { Epilogue } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";

import "./globals.css";
import { Layout, Providers } from "@/components/afterlogin/index";

import { Suspense } from "react";
import Loading from "./loading";

// const epilogue = Epilogue({ subsets: ["latin"] });

export const metadata = {
  title: "DC Fund",
  description:
    "DC Fund is your one-stop destination for bringing your boldest ideas to life. Our platform is designed to make crowdfunding seamless, engaging, and successful for creators and backers alike. Join the DC Fund community and start sowing the seeds of innovation today.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`bg-[#081232]`}>
        <Suspense fallback={<Loading />}>
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
