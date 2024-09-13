import { useCallback, useEffect, useState } from "react";
import { wallet, provider } from "@/blockchain";
import { dispatch, useTypedSelector } from "@/store";
import { formatEther } from "ethers";

export const useWallet = () => {
  const account = useTypedSelector((state) => state.wallet.account);
  const [connecting, setConnecting] = useState(false);
  const [ethereum] = useState(window.ethereum);
  const [balance, setBalance] = useState("--");
  const [error, setError] = useState("");

  // Detect when account is changed using MetaMask
  useEffect(() => {
    const handler = (accounts: string[]) => {
      if (accounts.length > 0) {
        dispatch.wallet.setAccount({ account: accounts[0] });
      }
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handler);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handler);
      }
    };
  }, []);

  // Check connection state
  // INFO: User can sign out using MetaMask and the app needs to verify the status
  const checkConnection = useCallback(async () => {
    try {
      const _account = await wallet.connectedAccount();
      if (_account !== account) {
        dispatch.wallet.setAccount({ account: _account });
      }
      setError("");
    } catch {
      dispatch.wallet.disconnect();
    }
  }, [account]);

  // Check if account is still connected every time user focus on the app tab
  useEffect(() => {
    window.addEventListener("focus", checkConnection);

    return () => {
      window.removeEventListener("focus", checkConnection);
    };
  }, [checkConnection]);

  // Initial wallet connection check
  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  // Connect method
  const connect = useCallback(async () => {
    if (ethereum) {
      setConnecting(true);

      try {
        const _account = await wallet.connectWallet();
        // set account
        dispatch.wallet.setAccount({ account: _account });
        setError("");
      } catch (_error) {
        console.error("Error connecting to MetaMask:", _error);
        setError("Error connecting to MetaMask");
      } finally {
        setConnecting(false);
      }
    }
  }, [ethereum]);

  // Fetch additional info when the account is available
  useEffect(() => {
    if (account) {
      (async () => {
        // Fetch account's balance
        const _balance = await provider.getProvider().getBalance(account);
        const formattedBalance = formatEther(_balance).slice(0, 5); // show like 9.999
        setBalance(formattedBalance);
      })();
    }
  }, [account]);

  return {
    isConnected: !!account,
    account,
    connect,
    connecting,
    ethereum,
    metamaskAvailable: !!ethereum,
    balance,
    error,
  };
};
