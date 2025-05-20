import { Request } from "express";

//* User tips
export interface userTipObject {
  id?: number;
  timestamp: string;
  location: string;
  description: string;
}

export interface TipRequest
  extends Request<{ id: string }, any, userTipObject> {}
//*_____________________________________________________________

// Your base observation data type
export interface user_observation {
  id: number;
  timestamp: string;
  location: string;
  warning: string;
  waterlevel: number;
  riskAssesment: string;
  description: string;
  proactiveActions: boolean;
}

// Allowed sorting fields
export type ObservationSortField = keyof Pick<
  user_observation,
  "id" | "timestamp" | "location" | "riskAssesment" | "waterlevel"
>;

// Typed request for query params (e.g. ?sorting=timestamp)
export interface users_observation_info
  extends Request<
    {},
    any, // response body (you can customize this if needed)
    { sorting?: ObservationSortField } // query string
  > {}

//*_____________________________________________________________

//* infrastructure
export interface infrastructureBody {
  id: number;
  timestamp: string;
  problem: string;
  location: string;
}

export type infrastructureRequest = Request<
  { id: string },
  {},
  infrastructureBody
>;
//*____________________________________________________________

//* admin monitoring

export interface MonitoringEntry {
  id?: string;
  timestamp: string;
  station_id: number; //Var sensorTornet är placerat
  soil_moisture_percent: number;
  temperature_c: number;
  humidity_percent: number;
  water_level_pressure_cm: number;
  water_level_ultrasound_cm: number;
  water_level_average_cm: number;
}

export type StationRequest = Request<{}, {}, {}>;

//*_____________________________________________________________

//* admin_maintenance
export interface admin_maintenance {
  id: number;
  worker_id: number;
  timestamp: string;
  updated_timestamp: string;
  location: string;
  station_id: number;
  work_issue: string;
  work_duration: string;
  work_status: string;
}
//*_____________________________________________________________

//* stations
export interface station {
  id: number;
  name: string;
  location: string;
}
//*_____________________________________________________________

//* admin auth
export interface loginData {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  token: string;
}

export interface adminLogin extends Request<{}, any, loginData> {}

//*_____________________________________________________________

//* JWT
export interface JWTRequest extends Request {
  user?: {
    userName: string;
    role: string;
    // add more fields from the JWT payload if needed
  };
}

//*_____________________________________________________________

//! new interface currently being created. NOT TO BE USED
// export interface publicInfo {
//   id: number;
//   timestamp: string;
//   updatedTimeStamp?: string;
//   location: string;
//   description: string;

//   publicReport?: {
//     // Public monitoring
//     monitoringlevels: number
//     timestamp: string
//     riskAssesment: number
//   }

//   infrastructure?: {
//     id: number;
//     // When infra problem has been noted
//     timestamp: string;
//     // What type of problem. flooded road for example
//     problem: string;
//     // Where the problem originates from
//     location?: string
//   }

//   vigilance?: {
//     //tells the user if they should think about taking proactive or reactive actions to protect property
//     floodProtecting: boolean
//     // Tells the user if they should keep track in case there is alot happening basically
//     trackKeeping: boolean
//     timestamp: string
//   },
// }
//!_____________________________________________________________
