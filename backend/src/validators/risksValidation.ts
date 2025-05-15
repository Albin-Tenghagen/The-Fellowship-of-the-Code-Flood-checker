import Joi from "joi";
import { userTipObject } from "types/types";

const userRisksSchema = Joi.object({
  id: Joi.number().required(),
  timestamp: Joi.string().required(),
  location: Joi.string().min(1).max(50).required(),
  description: Joi.string().min(8).max(150).required(),
  user: Joi.string().min(5).max(50).required(),
}).options({ abortEarly: false });

export async function validateUserTips(tips: userTipObject) {
  return await userRisksSchema.validateAsync(tips);
}
