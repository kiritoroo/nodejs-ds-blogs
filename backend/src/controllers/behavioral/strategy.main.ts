import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "@middleware/catchAsyncErrors";
import { IReqBody } from "@type/types";
import execCode from "@util/execCode";

export const strategyMain = catchAsyncErrors(
  async ( 
    req: Request<{}, {}, IReqBody>,
    res: Response,
    next: NextFunction
  ) => {
    const body = req.body;
    let code = `
      const { Ticket, AdultTicketStrategy, ChildTicketStrategy, PairTicketStrategy } = require("@pattern/behavioral/strategy.pattern");
    `
    code += body.code;

    res.json({
      result: execCode(code)
    });
});
