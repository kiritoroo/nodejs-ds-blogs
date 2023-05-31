import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "@middleware/catchAsyncErrors";
import { IReqBody } from "@type/types";
import execCode from "@util/execCode";

export const stateMain = catchAsyncErrors(
  async ( 
    //function parameter(TS)
    req: Request<{}, {}, IReqBody>,
    res: Response,
    next: NextFunction
  ) => {
    const body = req.body;
    let code = `
      const { Order, CompletedOrderState, ShippedOrderState, NewOrderState } = require("@pattern/behavioral/state.pattern");
    `
    code += body.code;
    res.json({
      result: execCode(code)
    });
});
