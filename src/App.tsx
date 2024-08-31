import { ConnectButton, useActiveWalletChain } from "thirdweb/react";
import { useState, useEffect } from "react";
import { client } from "./client";
import { ethereum, polygon } from "thirdweb/chains";
import { createWallet } from "thirdweb/wallets";

export function App() {
  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.trustwallet.app"),
    createWallet("walletConnect"),
  ];
  
  const activeChain = useActiveWalletChain();
  
  // State to keep track of the connection status
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (activeChain) {
      console.log(`Connected to chain: ${activeChain.chainName} (ID: ${activeChain.chainId})`);
      setIsConnected(true);
    } else {
      console.log("Not connected to any chain.");
      setIsConnected(false);
    }
  }, [activeChain]); // Run this effect whenever activeChain changes

  const chainId = activeChain?.id || "Not connected";
  

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20">
        <p>Active Chain:  (ID: {chainId})</p>
        <div className="flex justify-center mb-20">
          <ConnectButton
		  	chain={polygon}
            client={client}
            wallets={wallets}
            connectModal={{ size: "wide" }}
          />
        </div>
        {isConnected ? <p>Wallet is connected.</p> : <p>Wallet is not connected.</p>}
      </div>
    </main>
  );
}
