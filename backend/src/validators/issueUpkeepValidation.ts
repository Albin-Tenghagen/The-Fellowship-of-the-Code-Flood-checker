import { warn } from "console";
import Joi from "joi";
import { user_observation } from "types/types";

const issueUpkeepSchema = Joi.object({
  timestamp: Joi.alternatives().try(
    Joi.string().pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/),
    Joi.date()
  ),
  location: Joi.string().min(1).max(50).required(),
  warning: Joi.string().max(40).required(),
  waterlevel: Joi.number().required(),
  description: Joi.string().min(8).max(150).required(),
  proactiveActions: Joi.boolean().required(),
}).options({ abortEarly: false });

export async function validateIssueUpkeep(issues: user_observation) {
  return await issueUpkeepSchema.validateAsync(issues);
}
