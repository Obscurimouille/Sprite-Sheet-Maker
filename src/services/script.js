import { ScriptSchema } from "../models/script.schema.js";
import vine, { errors } from "@vinejs/vine";
import fs from "fs";

const parseScript = async (scriptfile) => {
  if (!fs.existsSync(scriptfile)) {
    console.error("[!] Script file does not exist:", scriptfile);
    process.exit(1);
  }
  const file = fs.readFileSync(scriptfile, "utf8");
  try {
    const json = JSON.parse(file);
    const validator = vine.compile(ScriptSchema);
    return await validator.validate(json);
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      console.error("[!] Validation error in script file:", error.messages);
    } else console.error("[!] Error parsing script file:", error);
    process.exit(1);
  }
};

export { parseScript };
