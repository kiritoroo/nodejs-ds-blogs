import { adapterMain } from "@controller/structural/adapter.main";
import { bridgeMain } from "@controller/structural/bridge.main";
import { compositeMain } from "@controller/structural/composite.main";
import { facadeMain } from "@controller/structural/facade.main";
import { flyweightMain } from "@controller/structural/flyweight.main";
import { proxyMain } from "@controller/structural/proxy.main";
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

structuralRouter
  .route("/proxy")
  .post( proxyMain );

structuralRouter
  .route("/bridge")
  .post( bridgeMain )

structuralRouter
  .route("/flyweight")
  .post( flyweightMain )

export default structuralRouter;