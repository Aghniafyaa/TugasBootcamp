export const registerUserSchema = {
  type: "object",
  properties: {
    id: { type: "number" },
    token: { type: "string" }
  },
  required: ["id", "token"],
  additionalProperties: true
};