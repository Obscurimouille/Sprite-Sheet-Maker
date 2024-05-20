import { ConfigSchema } from "../models/config.schema.js";
import vine, { errors } from "@vinejs/vine";
import fs from "fs";

const parseConfig = async (configfile) => {
  if (!fs.existsSync(configfile)) {
    console.error("[!] Config file does not exist:", configfile);
    process.exit(1);
  }
  const file = fs.readFileSync(configfile, "utf8");
  try {
    const json = JSON.parse(file);
    const validator = vine.compile(ConfigSchema);
    return await validator.validate(json);
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      console.error("[!] Validation error in config file:", error.messages);
    } else console.error("[!] Error parsing config file:", error);
    process.exit(1);
  }
};

export { parseConfig };
