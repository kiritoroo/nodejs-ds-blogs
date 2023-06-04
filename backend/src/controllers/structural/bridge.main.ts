import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "@middleware/catchAsyncErrors";
import { IReqBody } from "@type/types";
import execCode from "@util/execCode";

export const bridgeMain = catchAsyncErrors(
  async ( 
    req: Request<{}, {}, IReqBody>,
    res: Response,
    next: NextFunction
  ) => {
    const body = req.body;
    let code = `
      const {Circle,Rectangle,VectorRenderer, RasterRenderer,ShapeWithRenderer} = require("@pattern/structural/bridge.pattern");
    `
    code += body.code;

    res.json({
      result: execCode(code)
    });
});
