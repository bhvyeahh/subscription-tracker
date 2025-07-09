import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => res.send({ title: 'Get all Subscriptions' }));


subscriptionRouter.get("/:id", (req, res) => res.send({ title: 'Get Subscription Details' }));


subscriptionRouter.post("/", (req, res) => res.send({ title: 'Create Subscription' }));


subscriptionRouter.put("/:id", (req, res) => res.send({ title: 'Update Subscription' }));


subscriptionRouter.delete("/:id", (req, res) => res.send({ title: 'Delete Subscription' }));


subscriptionRouter.get("/user/:id" , (req, res) => res.send({ title: 'Get All User Subscriptions' }));  


subscriptionRouter.put("/:id/cancel", (req, res) => res.send({ title: 'Cancel Subscription' }));


subscriptionRouter.get("/upcoming-renewls", (req, res) => res.send({ title: 'Get Upcoming Renewls Subscription' }));





export default subscriptionRouter;