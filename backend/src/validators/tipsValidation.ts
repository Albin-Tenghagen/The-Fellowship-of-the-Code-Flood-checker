import Joi from "joi";
import { userTipObject } from "types/types";

const userTipsSchema = Joi.object({
  id: Joi.number(),
  timestamp: Joi.alternatives().try(
    Joi.string().pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/),
    Joi.date()
  ),
  location: Joi.string().min(1).max(50).required(),
  description: Joi.string().min(8).max(150).required(),
}).options({ abortEarly: false });

export async function validateUserTips(tips: userTipObject) {
  return await userTipsSchema.validateAsync(tips);
}
