import { abstractFactoryMain } from "@controller/creational/abstractfactory.main";
import { builderMain } from "@controller/creational/builder.main";
import { factoryMain } from "@controller/creational/factory.main";
import { prototypeMain } from "@controller/creational/prototype.main";
import { singletonMain } from "@controller/creational/singleton.main";
import { Router, Request, Response } from "express";

/**
 * @openapi
 * tags:
 *   name: Creational
 *   description: Router for Creational Category
 */
const creationalRouter = Router();

creationalRouter
  .route("/factory-method")
  .post( factoryMain )

creationalRouter
  .route("/abstract-factory")
  .post( abstractFactoryMain );
  
creationalRouter
  .route("/prototype")
  .post( prototypeMain )

creationalRouter
  .route("/builder")
  .post( builderMain )

  creationalRouter
  .route("/singleton")
  .post( singletonMain )

export default creationalRouter;