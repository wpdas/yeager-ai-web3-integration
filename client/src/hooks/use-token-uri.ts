import { useEffect, useState } from "react";

interface TokenURIBody {
  image: string;
  name: string;
  description: string;
  preview_image: string;
}

export const useTokenURI = (tokenURI?: string) => {
  const [tokenInfo, setTokenInfo] = useState<TokenURIBody>();

  useEffect(() => {
    (async () => {
      if (tokenURI) {
        const tokenUriResponse = await fetch(tokenURI);
        const tokenUriData = await tokenUriResponse.json();
        setTokenInfo(tokenUriData);
      }
    })();
  }, [tokenURI]);

  return tokenInfo;
};
