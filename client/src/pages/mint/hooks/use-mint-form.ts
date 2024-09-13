import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createNFTmetadata } from "@/api";
import { contract } from "@/blockchain";
import { PINATA_GATEWAY_FORMATTED_URL } from "@/constants";
import { routePaths } from "@/routes";
import { uploadImageToIPFS } from "@/services";
import { dispatch, useTypedSelector } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { mintNftSchema } from "../models/schemas";
import { MintNftInputs } from "../models/types";

export const useMintNftForm = ({ imageFile }: { imageFile?: File }) => {
  const [submitting, setSubmitting] = useState(false);
  // INFO: This is used to avoid uploading the image and tokenURI (JSON) files again.
  // When the mint process is complete, the mintStatus props are going to be cleared.
  const { imageCID: previousImageCID, tokenURI: previousTokenURI } =
    useTypedSelector((state) => state.mintStatus);

  const form = useForm<MintNftInputs>({
    resolver: zodResolver(mintNftSchema),
    mode: "onChange",
  });

  // Clear the mintStatus when custom hook is firstly ready
  useEffect(() => {
    dispatch.mintStatus.clear();
  }, []);

  const onSubmit: SubmitHandler<MintNftInputs> = useCallback(
    async (formData) => {
      if (imageFile) {
        console.log(formData, imageFile);
        setSubmitting(true);

        // Upload image to IPFS (using Pinata) and get its CID
        try {
          // INFO: This is using NEAR IPFS
          // const upload = await uploadFileToNearIPFS(imageFile);
          // const data = await upload.json();
          // console.log(data);
          // const imageCID = data.cid;

          // INFO: This is using Pinata IPFS
          // Upload file to IPFS - Pinata
          let imageCID = previousImageCID || "";
          if (!previousImageCID) {
            const imageUpload = await uploadImageToIPFS(imageFile);
            imageCID = imageUpload.IpfsHash;
          }

          // Store the imageCID info
          dispatch.mintStatus.setImageCID(imageCID);
          console.log(imageCID);

          // Generate the tokenURI (JSON metadata) for this NFT (image)
          let tokenURI = previousTokenURI || "";
          if (!previousTokenURI) {
            const tokenURIupload = await createNFTmetadata({
              name: formData.name,
              description: formData.description,
              imageCID,
            });

            // Create the full link for the tokenURI
            tokenURI = `${PINATA_GATEWAY_FORMATTED_URL}${tokenURIupload.data.tokenCID}`;
          }

          // Store the tokenURI address
          dispatch.mintStatus.setTokenURI(tokenURI);
          console.log("Token URI:", tokenURI);

          console.log("Starting Minting process...");

          // Mint NFT
          await contract.mintNFT({ tokenURI });

          // Success
          dispatch.globalDialog.setMessage({
            message: "NFT minted successfully!",
            goTo: routePaths.userAssets, // take user to its NFT galley
          });
        } catch (error) {
          console.log(error);
          dispatch.error.setError({
            message:
              "There was an error while minting the NFT. Please, try again!",
          });
        } finally {
          setSubmitting(false);
          // Clear mintStatus
          dispatch.mintStatus.clear();
        }
      }
    },
    [imageFile, previousImageCID, previousTokenURI],
  );

  return {
    form,
    errors: form.formState.errors,
    onSubmit: form.handleSubmit(onSubmit),
    submitting,
  };
};
