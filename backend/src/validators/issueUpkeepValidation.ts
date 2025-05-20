import Joi from "joi";
import { user_observation } from "types/types";

const issueUpkeepSchema = Joi.object({
  id: Joi.number().required(),
  timestamp: Joi.string().required(),
  location: Joi.string().min(1).max(50).required(),
  description: Joi.string().min(8).max(150).required(),
  proactiveActions: Joi.boolean().required()
}).options({ abortEarly: false });

export async function validateIssueUpkeep(issues: user_observation) {
  return await issueUpkeepSchema.validateAsync(issues);
}
