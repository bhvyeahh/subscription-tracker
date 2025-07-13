import { Router } from "express";
import authorize from '../middlewares/auth.middleware.js'
import { cancelSubscription, createSubscription, getUserSubscription } from "../controllers/subscription.controller.js";
const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => res.send({ title: 'Get all Subscriptions' }));


subscriptionRouter.get("/:id", (req, res) => res.send({ title: 'Get Subscription Details' }));


subscriptionRouter.post("/", authorize , createSubscription);


subscriptionRouter.put("/:id", (req, res) => res.send({ title: 'Update Subscription' }));


subscriptionRouter.delete("/:id", (req, res) => res.send({ title: 'Delete Subscription' }));


subscriptionRouter.get("/user/:id" ,authorize, getUserSubscription);  


subscriptionRouter.put("/:id/cancel", authorize,cancelSubscription);


subscriptionRouter.get("/upcoming-renewls", (req, res) => res.send({ title: 'Get Upcoming Renewls Subscription' }));





export default subscriptionRouter;