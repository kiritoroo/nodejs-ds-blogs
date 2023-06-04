import { Router, Request, Response } from "express";
import { strategyMain } from "@controller/behavioral/strategy.main";
import { stateMain } from "@controller/behavioral/state.main";
import { mediatorMain } from "@controller/behavioral/mediator.main";
import { commandMain } from "@controller/behavioral/command.main";
import { mementoMain } from "@controller/behavioral/memento.main";
import { decoratorMain } from "@controller/behavioral/decorator.main";

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

behavioralRouter
  .route("/memento")
  .post(mementoMain)

behavioralRouter
  .route("/decorator")
  .post(decoratorMain)

export default behavioralRouter;