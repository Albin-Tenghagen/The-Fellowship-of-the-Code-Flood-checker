import { Request } from "express";

//* User tips
export interface userTipObject {
  id?: number;
  timestamp: string;
  location: string;
  description: string;
}

export interface TipBody {
  id?: number;
  timestamp: string;
  location: string;
  description: string;
  username: string;
}

export interface riskBody {}

export interface TipRequest extends Request<{}, any, TipBody> {}
//*_____________________________________________________________

//* User Safety
export interface usersSafetyInfo
  extends Request<{ id: string }, any, userSafetyBody> {}

export interface userSafetyBody {
  id: number;
  timestamp: string;
  location: string;
  description: string;
  proactiveActions: boolean;
}

// export interface userSafetyBody {
//   id: number;
//   timestamp: string;
//   location: string;
//   warning: string;
//   waterlevel: number
//   riskAssesment
//   description: string;
//   proactiveActions: boolean;
// }

//*_____________________________________________________________

//* User Risks
export interface userRisksInfo extends Request<{}, any, any> {}
export interface riskAssesment {
  id: number;
  timestamp: string;
  warning: string;
  waterlevel: number;
  riskAssesment: string;
}
//*_____________________________________________________________

//* User notification
export interface userNotifications extends Request<{}, any, any> {}
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

//* admin monitoring

export interface MonitoringEntry {
  id: string;
  timestamp: number;
  location: string; //Var sensorTornet är placerat
  soil_moisture_percent: number;
  temperature_c: number;
  humidity_percent: number;
  water_level_pressure_cm: number;
  water_level_ultrasound_cm: number;
  water_level_average_cm: number;
}

export type StationRequest = Request<{}, {}, {}>;

//*_____________________________________________________________

//* admin historical monitoring

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

//* admin infrastructure
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
//     timeStamp: number
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
//     timeStamp: number
//   },
// }
//!_____________________________________________________________
