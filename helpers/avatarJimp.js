import Jimp from "jimp";

export const avatarJimp = async (imagePath) => {
  try {
    const image = await Jimp.read(imagePath);
    await image.resize(250, 250).quality(120).writeAsync(imagePath);
  } catch (err) {
    console.error(err);
    throw new Error("Bad avatar");
  }
};
