import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createNFTmetadata } from "@/api";
import { PINATA_GATEWAY_FORMATTED_URL } from "@/constants";
import { uploadImageToIPFS } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { mintNftSchema } from "../models/schemas";
import { MintNftInputs } from "../models/types";

export const useMintNftForm = ({ imageFile }: { imageFile?: File }) => {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<MintNftInputs>({
    resolver: zodResolver(mintNftSchema),
    mode: "onChange",
  });

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
          const imageUpload = await uploadImageToIPFS(imageFile);
          const imageCID = imageUpload.IpfsHash;
          console.log(imageCID);

          // Generate the tokenURI (JSON metadata) for this NFT (image)
          const tokenURIupload = await createNFTmetadata({
            name: formData.name,
            description: formData.description,
            imageCID,
          });

          // Create the full link for the tokenURI
          const tokenURI = `${PINATA_GATEWAY_FORMATTED_URL}${tokenURIupload.data.tokenCID}`;
          console.log("Token URI:", tokenURI);
        } catch (error) {
          console.log(error);
        } finally {
          setSubmitting(false);
        }
      }
    },
    [imageFile],
  );

  return {
    form,
    errors: form.formState.errors,
    onSubmit: form.handleSubmit(onSubmit),
    submitting,
  };
};
