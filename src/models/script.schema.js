import vine from "@vinejs/vine";

const schema = vine.object({
  inputFolder: vine.string(),
  output: vine.object({
    folder: vine.string(),
    sheet: vine.object({
      columns: vine.number().min(1),
      rows: vine.number().min(1),
    }),
    tile: vine.object({
      width: vine.number().min(1),
      height: vine.number().min(1),
    }),
  }),
});

export { schema as ScriptSchema };
