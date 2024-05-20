import vine from "@vinejs/vine";

const schema = vine.object({
  script: vine.string(),
});

export { schema as ConfigSchema };
