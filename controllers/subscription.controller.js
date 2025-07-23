import Subscription from '../models/subscription.model.js'
import { workflowClient } from '../config/upstash.js'
import { SERVER_URL } from '../config/env.js'

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    
    let workflowRunId = null;
  const res = await workflowClient.trigger({
    url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
    body: {
      subscriptionId: subscription.id,
    },
    headers: {
      'content-type': 'application/json',
    },
    retries: 0,
  });

  workflowRunId = res.workflowRunId;


    res.status(201).json({ success: true, data: { subscription , workflowRunId} });
  } catch (e) {
    next(e);
  }
}

export const getUserSubscriptions = async (req, res, next) => {
  try {
    // Check if the user is the same as the one in the token
    if(req.user.id !== req.params.id) {
      const error = new Error('You are not the owner of this account');
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
}
export const cancelSubscription = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subscription = await Subscription.findByIdAndUpdate(
      id,
      { status: "cancelled" },
      { new: true }
    );

    if (!subscription) {
      return res.status(404).json({ error: "Subscription not found" });
    }

    res.json(subscription);
  } catch (error) {
    next(error)
  }
};

export const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        if (subscription.user.toString() !== req.user.id) {
            const error = new Error("You are not authorized to delete this subscription");
            error.statusCode = 403;
            throw error;
        }

        await subscription.deleteOne();

        res.status(200).json({ success: true, message: "Subscription deleted successfully" });
    } 
    catch (error) {
        next(error);
    }
};
