import { Router, Request, Response } from "express";
import { strategyMain } from "@controller/behavioral/strategy.main";
import { stateMain } from "@controller/behavioral/state.main";

/**
 * @openapi
 * tags:
 *   name: Behavioral
 *   description: Router for Behavioral Category
 */
const behavioralRouter = Router();

behavioralRouter
  .route("/strategy")
  .post( strategyMain );

behavioralRouter
  .route("/state")
  .post( stateMain );

export default behavioralRouter;