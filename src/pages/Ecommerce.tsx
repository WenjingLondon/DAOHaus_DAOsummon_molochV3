
// src/pages/Ecommerce.tsx
import ConnectWallet from "../components/ConnectWallet";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Green Bond Token",
    description: "Participate in eco projects. DAO-governed investment.",
    price: "0.5 ETH",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Carbon Credit NFT",
    description: "Support carbon offset projects. Join DAO treasury.",
    price: "0.2 ETH",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Sustainable Product Voucher",
    description: "Get access to eco-friendly products curated by DAO.",
    price: "0.1 ETH",
    image: "https://via.placeholder.com/150",
  },
];

export default function Ecommerce() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Hero Banner */}
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold">DAO-powered Marketplace</h1>
        <p className="mt-4 text-lg">
          Governance, treasury, and fair trading in one platform
        </p>
        <div className="mt-6">
          <ConnectWallet />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        {mockProducts.map((p) => (
          <div
            key={p.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="font-semibold mt-2">{p.name}</h3>
            <p className="text-sm mt-1">{p.description}</p>
            <p className="mt-2 font-bold">{p.price}</p>
            <button
              className="mt-3 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
              onClick={() =>
                alert("Mock purchase - DAO Treasury will receive funds")
              }
            >
              Buy / Contribute
            </button>
          </div>
        ))}
      </div>

      {/* Why DAO Section */}
      <div className="mt-16 bg-gray-100 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold">Why DAO-powered Marketplace?</h2>
        <p className="mt-4 text-gray-700">
          Every transaction contributes to the DAO treasury. Governance is in
          your hands. Users participate, invest, and vote on projects. Integrate
          DeFi strategies seamlessly.
        </p>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-gray-500">
        DAO Address: 0x4792F8872981e33b8D2B8ab0fee1062733A30295 | Powered by
        Moloch v3 + Yield Aggregator Demo
      </footer>
    </div>
  );
}

