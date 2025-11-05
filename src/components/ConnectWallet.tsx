
//src/components/ConnectWallet.tsx
import useWallet from "../hooks/useWallet";

export default function ConnectWallet() {
  const { 
    account, 
    connectWallet, 
    disconnectWallet 
  }: { 
    account: string | null; 
    connectWallet: () => Promise<void>; 
    disconnectWallet: () => void; 
  } = useWallet();

  return (
    <div>
      {!account ? (
        <button 
          onClick={connectWallet} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm">Connected: {account}</span>
          <button 
            onClick={disconnectWallet} 
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
