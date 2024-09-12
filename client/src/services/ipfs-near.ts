export const uploadFileToNearIPFS = async (body: BodyInit) =>
  fetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  });
