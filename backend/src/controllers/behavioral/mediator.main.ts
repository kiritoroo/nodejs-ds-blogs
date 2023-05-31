import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "@middleware/catchAsyncErrors";
import { IReqBody } from "@type/types";
import execCode from "@util/execCode";

export const mediatorMain = catchAsyncErrors(
  async ( 
    req: Request<{}, {}, IReqBody>,
    res: Response,
    next: NextFunction
  ) => {
    const body = req.body;
    let code = `
      const {ConcreteMediator,Colleague,Colleague1, Colleague2} = require("@pattern/behavioral/mediator.pattern");
    `
    code += body.code;

    res.json({
      result: execCode(code)
    });
});
