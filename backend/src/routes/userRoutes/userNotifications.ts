// console.log("notification router running....");
// import express, { Request, Response, Router } from "express";
// import { readFile } from "fs/promises";
// import path from "path";

// import { userNotifications } from "types/types";

// const userNotificationsRouter = express.Router();

// userNotificationsRouter.get(
//   "/",
//   async (req: userNotifications, res: Response): Promise<void> => {
//     const filepath = path.resolve("Database/userNotifications.json");

//     try {
//       const jsonData = await readFile(filepath, "utf-8");
//       const notifications = JSON.parse(jsonData);
//       console.log(notifications);

//       if (!notifications) {
//         res.status(404).json({
//           message:
//             "The server could not find the risks, please try again later",
//         });
//         return;
//       }
//       res.status(200).json({
//         message: "Notifications bombaclaaaat",
//         notifications: notifications,
//       });
//       return;
//     } catch (error) {
//       console.error("Server error");
//       res.status(500).json({ message: "SERVER NOtifications ERROR" });
//       return;
//     }
//   }
// );

// //GET for getting notifications about flood warnings

// export default userNotificationsRouter;
