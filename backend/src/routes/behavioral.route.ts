import { Router, Request, Response } from "express";
import { strategyMain } from "@controller/behavioral/strategy.main";
import {stateMain} from "@controller/behavioral/state.main"

/**
 * @openapi
 * tags:
 *   name: Behavioral
 *   description: Router for Behavioral Category
 */
const behavioralRouter = Router();

/**
 * @openapi
 * /api/strategy:
 *   post:
 *     summary: Execute strategy code
 *     tags: [Behavioral]
 *     requestBody:
 *       description: Test code
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
behavioralRouter.route("/strategy").post( strategyMain );
behavioralRouter.route("/state").post( stateMain );

export default behavioralRouter;