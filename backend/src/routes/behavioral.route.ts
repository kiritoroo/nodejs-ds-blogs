import { Router, Request, Response } from "express";
import { strategyMain } from "@controller/behavioral/strategy.main";
import { stateMain } from "@controller/behavioral/state.main";
import { mediatorMain } from "@controller/behavioral/mediator.main";
import { commandMain } from "@controller/behavioral/command.main";

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

behavioralRouter
  .route("/mediator")
  .post(mediatorMain);

behavioralRouter
  .route("/command")
  .post(commandMain)

export default behavioralRouter;