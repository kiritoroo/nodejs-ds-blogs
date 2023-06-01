import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "@middleware/catchAsyncErrors";
import { IReqBody } from "@type/types";
import execCode from "@util/execCode";

export const mementoMain = catchAsyncErrors(
  async ( 
    req: Request<{}, {}, IReqBody>,
    res: Response,
    next: NextFunction
  ) => {
    const body = req.body;
    let code = `
      const {Caretaker,Originator,Memento} = require("@pattern/behavioral/memento.pattern");
    `
    code += body.code;

    res.json({
      result: execCode(code)
    });
});
