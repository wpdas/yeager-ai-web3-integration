import { useCallback, useState } from "react";
import Files from "react-files";
import { ErrorMessage } from "@/components";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Input,
  Stack,
  Tag,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useMintNftForm } from "../hooks/use-mint-form";
import { NoImagePreview } from "./no-image-preview";

export const MintForm = () => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const { form, errors, onSubmit, submitting } = useMintNftForm({
    imageFile: selectedFile,
  });
  const formValues = form.watch();

  const onSelectImage = useCallback(
    async (files: any[]) => {
      if (files) {
        const file = files[0];
        setSelectedFile(file);
        form.setValue("imageURLPreview", file.preview.url);
        form.trigger("imageURLPreview");
      }
    },
    [form],
  );

  const onMintClick = useCallback(async () => {
    if (form.formState.isValid) {
      onSubmit();
    }
  }, [form, onSubmit]);

  const selectImageText = formValues.imageURLPreview
    ? "Select Another Image"
    : "Select Image";

  return (
    <>
      <Card maxW="md" mb="4">
        <CardBody>
          <Tag width="fit-content">NFT Preview</Tag>
          <Stack
            bg="gray.100"
            spacing="3"
            mt="2"
            border="1px solid #e2e8f0"
            padding="4"
            borderRadius="lg"
          >
            {formValues.imageURLPreview ? (
              <Image
                src={formValues.imageURLPreview}
                alt={formValues.name}
                borderRadius="lg"
              />
            ) : (
              <NoImagePreview />
            )}
            <Heading size="sm" mt="2">
              {formValues.name || "Title"}
            </Heading>
            <Text fontSize="sm">{formValues.description || "Description"}</Text>
          </Stack>
        </CardBody>

        <CardFooter>
          <Stack w="100%">
            <Heading size="md" mb="2">
              NFT Form Data
            </Heading>
            <Text mb="2">
              Select the image you want to mint, provide a name and description
              for it.
            </Text>

            <Stack>
              <Text fontWeight="medium">Name:</Text>
              <Input
                disabled={submitting}
                isInvalid={!!errors.name?.message}
                fontSize="14px"
                type="text"
                placeholder="Type the NFT name here"
                onBlur={() => form.trigger("name")}
                onChange={(e) => {
                  form.setValue("name", e.target.value);
                }}
              />
              <ErrorMessage error={errors.name?.message} />
            </Stack>

            <Stack mt="2" mb="2">
              <Text fontWeight="medium">Description:</Text>
              <Textarea
                disabled={submitting}
                isInvalid={!!errors.description?.message}
                rows={5}
                fontSize="14px"
                size="sm"
                resize="none"
                placeholder="Type the description for the NFT here."
                borderRadius="8px"
                onBlur={() => form.trigger("description")}
                onChange={(e) => {
                  form.setValue("description", e.target.value);
                }}
              />
              <ErrorMessage error={errors.description?.message} />
            </Stack>

            <Button colorScheme="purple" opacity={submitting ? 0.4 : 1}>
              <Files
                multiple={false}
                accepts={["image/*"]}
                minFileSize={1}
                clickable={!submitting}
                onChange={onSelectImage}
                style={{
                  zIndex: "1",
                  position: "absolute",
                  top: 0,
                  height: "100%",
                  width: "100%",
                }}
              />
              {selectImageText}
            </Button>
            <Button
              isLoading={submitting}
              loadingText="Minting"
              colorScheme="purple"
              spinnerPlacement="end"
              onClick={onMintClick}
            >
              Mint NFT
            </Button>
          </Stack>
        </CardFooter>
      </Card>
    </>
  );
};
