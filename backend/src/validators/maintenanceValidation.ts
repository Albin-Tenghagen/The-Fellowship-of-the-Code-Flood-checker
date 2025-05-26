import Joi from "joi";
import { admin_maintenance } from "types/types";

const admin_maintenance_schema = Joi.object({
  id: Joi.number(),
  worker_id: Joi.number().required(),
  timestamp: Joi.alternatives().try(
    Joi.string().pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/),
    Joi.date()
  ),

  updated_timestamp: Joi.alternatives().try(
    Joi.string().pattern(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/),
    Joi.date()
  ),
  location: Joi.string().required(),
  station_id: Joi.number().required(),
  work_issue: Joi.string().required(),
  work_duration: Joi.string().required(),
  work_status: Joi.string().required(),
});

export async function validateMaintenance(maintenance: admin_maintenance) {
  return await admin_maintenance_schema.validateAsync(maintenance);
}
