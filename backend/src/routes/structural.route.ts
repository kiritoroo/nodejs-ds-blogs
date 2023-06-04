import { adapterMain } from "@controller/structural/adapter.main";
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
  

export default structuralRouter;