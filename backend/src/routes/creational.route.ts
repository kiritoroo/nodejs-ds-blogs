import { abstractFactoryMain } from "@controller/creational/abstractfactory.main";
import { builderMain } from "@controller/creational/builder.main";
import { Router, Request, Response } from "express";

/**
 * @openapi
 * tags:
 *   name: Creational
 *   description: Router for Creational Category
 */
const creationalRouter = Router();

creationalRouter
  .route("/abstract-factory")
  .post( abstractFactoryMain );

creationalRouter
  .route("/builder")
  .post( builderMain )

export default creationalRouter;