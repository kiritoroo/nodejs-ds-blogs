import { adapterMain } from "@controller/structural/adapter.main";
import { compositeMain } from "@controller/structural/composite.main";
import { facadeMain } from "@controller/structural/facade.main";
import { Router, Request, Response } from "express";

/**
 * @openapi
 * tags:
 *   name: Structural
 *   description: Router for Structural Category
 */
const structuralRouter = Router();

structuralRouter
  .route("/adapter")
  .post( adapterMain );
  
structuralRouter
  .route("/composite")
  .post( compositeMain );
  
structuralRouter
  .route("/facade")
  .post( facadeMain );

export default structuralRouter;