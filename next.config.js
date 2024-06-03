/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [

      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "dfstudio-d420.kxcdn.com",
      },
      {
        protocol: "https",
        hostname: "www.simplilearn.com",
      },
      {
        protocol: "https",
        hostname: "a.cdn-hotels.com",
      },
      {
        protocol: "https",
        hostname: "www.savethechildren.org",
      },
      {
        protocol: "https",
        hostname: "cdn.thewirecutter.com",
      },
      {
        protocol: "https",
        hostname: "www.childrenwithcancer.org.uk",
      },
      {
        protocol: "https",
        hostname: "cdn.squaremeal.co.uk",
      },
    ],
  },
};

module.exports = nextConfig;

