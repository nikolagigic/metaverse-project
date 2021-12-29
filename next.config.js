/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    MONGO_URI: "mongodb+srv://nikolag:Nindzata96@cluster0.xwrxt.mongodb.net/accounts?retryWrites=true&w=majority",
  },
  reactStrictMode: true,
  images: {
    domains: ["ipfs.infura.io"],
  },
};
