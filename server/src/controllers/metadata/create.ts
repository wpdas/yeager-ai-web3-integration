import { Request, Response } from 'express';
import { z } from 'zod';
import { pinata } from '../../services';
import { StatusCodes } from 'http-status-codes';
import { PINATA_GATEWAY_FORMATTED_URL } from '../../constants';

export const createMetadataSchema = z.object({
  name: z.string(),
  description: z.string(),
  imageCID: z.string(),
});

type Body = z.infer<typeof createMetadataSchema>;

export const createMetadata = async (
  request: Request<{}, {}, Body>,
  response: Response,
) => {
  const { name, description, imageCID } = request.body;

  try {
    // INFO: Pinata said I used my plan limits when I uploaded only two files
    // and used 67kb from 10GB from my Gateway Bandwidth
    // Using new account (wpdas@yahoo.com)
    const upload = await pinata.upload.json({
      name,
      description,
      // INFO: stores the image CID only, so that the client decides which gateway to use
      // image: `ipfs://${imageCID}`,
      image: `${PINATA_GATEWAY_FORMATTED_URL}${imageCID}`,
      preview_image: `${PINATA_GATEWAY_FORMATTED_URL}${imageCID}`,
    });

    return response.send({ tokenCID: upload.IpfsHash });
  } catch (error) {
    console.log(error);
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};
