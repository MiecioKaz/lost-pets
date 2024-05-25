import crypto from "crypto";

export const imageUpload = async (petImage: string | Blob) => {
  try {
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`;

    const data = new FormData();

    data.append("file", petImage);
    data.append("upload_preset", "my-uploads");

    const response = await fetch(cloudinaryUrl, {
      method: "POST",
      body: data,
    });
    const image = await response.json();

    return image;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const imageDelete = async (publicId: string) => {
  const generateSHA1 = (timestamp: Number) => {
    const hash = crypto.createHash("sha1");
    hash.update(
      `public_id=${publicId}&timestamp=${timestamp}${process.env.NEXT_PUBLIC_API_SECRET}`
    );
    return hash.digest("hex");
  };

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/destroy`;
  const timestamp = new Date().getTime();

  const data = new FormData();

  data.append("public_id", publicId);
  data.append("api_key", process.env.NEXT_PUBLIC_API_KEY!);
  data.append("timestamp", timestamp.toString());
  data.append("signature", generateSHA1(timestamp));

  try {
    const response = await fetch(cloudinaryUrl, {
      method: "POST",
      body: data,
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (e) {
    if (e instanceof Error) {
      return new Error(e.message);
    }
  }
};
