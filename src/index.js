import fs from "fs";
import sharp from "sharp";
import { parseConfig } from "./services/config.js";
import { parseScript } from "./services/script.js";

const config = await parseConfig("./config.json");
console.log("config", config);

const script = await parseScript(config.script);
console.log("script", script);

const globalInputFolder = script.inputFolder;
const globalOutputFolder = script.output.folder;
const globalOutputFilename = "spritesheet_{name}.png";

const imageWidth = script.output.tile.width;
const imageHeight = script.output.tile.height;
const gridWidth = script.output.sheet.columns;
const gridHeight = script.output.sheet.rows;

const getCompositeElement = async (imagePath, x, y) => {
  const originalImage = sharp(imagePath);
  const metadata = await originalImage.metadata();
  const { width, height } = metadata;
  const targetRatio = imageWidth / imageHeight;
  const ratio = width / height;

  // Calculate new dimensions based on the target ratio
  let newWidth = imageWidth;
  let newHeight = imageHeight;
  if (ratio > targetRatio) newHeight = Math.floor(imageWidth / ratio);
  else newWidth = Math.floor(imageHeight * ratio);

  const image = await originalImage.resize(newWidth, newHeight).toBuffer();
  return {
    input: image,
    top: y * imageHeight,
    left: x * imageWidth,
  };
};

const createSpriteSheet = async (imagesFolder, outputFile) => {
  if (!fs.existsSync(imagesFolder)) {
    console.error("[!] Input subfolder does not exist:", imagesFolder);
    process.exit(1);
  }

  // Create new image
  const newImage = sharp({
    create: {
      width: imageWidth * gridWidth,
      height: imageHeight * gridHeight,
      channels: 4, // 4 channels for RGBA
      background: { r: 255, g: 255, b: 255, alpha: 0 }, // Transparent background
    },
  });
  // Elements to composite
  const compositeElements = [];

  // Get all PNG files in the input folder
  const files = (await fs.readdirSync(imagesFolder)).filter((file) =>
    file.toLowerCase().endsWith(".png")
  );

  if (!files.length) {
    console.error("[!] No PNG files found in the input folder:", imagesFolder);
    process.exit(1);
  }

  // For each image, get the composite element
  for (let i = 0; i < files.length; i++) {
    const imagePath = `${imagesFolder}/${files[i]}`;
    const x = i % gridWidth;
    const y = Math.floor(i / gridWidth);
    compositeElements.push(await getCompositeElement(imagePath, x, y));
  }

  // Save the new image
  await newImage.composite(compositeElements).toFile(outputFile);

  console.log("[*] Sprite sheet created:", outputFile);
};

const createSpriteSheets = async (inputFolder, outputFolder) => {
  if (!fs.existsSync(inputFolder)) {
    console.error("[!] Input folder does not exist:", inputFolder);
    process.exit(1);
  }
  const inputFolders = fs.readdirSync(inputFolder);
  for (let i = 0; i < inputFolders.length; i++) {
    await createSpriteSheet(
      `${inputFolder}/${inputFolders[i]}`,
      `${outputFolder}/${globalOutputFilename.replace(
        "{name}",
        inputFolders[i]
      )}`
    );
  }
};

console.log("[*] Creating sprite sheets...");
createSpriteSheets(globalInputFolder, globalOutputFolder).then(() => {
  console.log("[*] All sprite sheets created.");
});
