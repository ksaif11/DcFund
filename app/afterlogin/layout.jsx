import { Epilogue } from "next/font/google";

import "./globals.css";
import { Layout, Providers } from "@/components/afterlogin/index";

const epilogue = Epilogue({ subsets: ["latin"] });

export const metadata = {
  title: "DC Fund",
  description:
    "DC Fund is your one-stop destination for bringing your boldest ideas to life. Our platform is designed to make crowdfunding seamless, engaging, and successful for creators and backers alike. Join the DC Fund community and start sowing the seeds of innovation today.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${epilogue.className} dark:bg-black`}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
