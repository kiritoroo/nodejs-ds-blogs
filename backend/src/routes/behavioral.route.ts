import { Router, Request, Response } from "express";
import { strategyMain } from "@controller/behavioral/strategy.main";
import { stateMain } from "@controller/behavioral/state.main";
import { mediatorMain } from "@controller/behavioral/mediator.main";
import { commandMain } from "@controller/behavioral/command.main";
import { mementoMain } from "@controller/behavioral/memento.main";
import { bridgeMain } from "@controller/behavioral/bridge.main";
import { decoratorMain } from "@controller/behavioral/decorator.main";
import { flyweightMain } from "@controller/behavioral/flyweight.main";
import { factoryMain } from "@controller/behavioral/factory.main";
import { builderMain } from "@controller/behavioral/builder.main";
import { singletonMain } from "@controller/behavioral/singleton.main";


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
  .route("/bridge")
  .post(bridgeMain)

behavioralRouter
  .route("/decorator")
  .post(decoratorMain)

behavioralRouter
  .route("/flyweight")
  .post(flyweightMain)
  
behavioralRouter
  .route("/factory-method")
  .post(factoryMain)
  
behavioralRouter
  .route("/builder")
  .post(builderMain)

behavioralRouter
  .route("/singleton")
  .post(singletonMain)

export default behavioralRouter;