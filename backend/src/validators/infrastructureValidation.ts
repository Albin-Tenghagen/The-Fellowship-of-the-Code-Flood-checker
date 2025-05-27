import Joi from "joi";
import { infrastructureBody } from "types/types";

const infrastructureIssueSchema = Joi.object({
  id: Joi.number(),
  location: Joi.string().min(2).max(30).required(),
  problem: Joi.string().min(10).max(100).required(),
  timestamp: Joi.alternatives().try(
    Joi.string().pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/),
    Joi.date()
  ),
}).options({ abortEarly: false });

export async function validateInfrastructureIssue(
  infrastructureIssue: infrastructureBody
) {
  return await infrastructureIssueSchema.validateAsync(infrastructureIssue);
}
