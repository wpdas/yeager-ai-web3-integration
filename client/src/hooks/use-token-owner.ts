import { useEffect, useState } from "react";
import { contract } from "@/blockchain";

export const useTokenOwner = (tokenId?: string) => {
  const [owner, setOwner] = useState("");

  useEffect(() => {
    (async () => {
      if (tokenId) {
        const _owner = await contract.ownerOf(tokenId);
        setOwner(_owner);
      }
    })();
  }, [tokenId]);

  return owner;
};
