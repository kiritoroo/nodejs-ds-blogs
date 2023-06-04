import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "@middleware/catchAsyncErrors";
import { IReqBody } from "@type/types";
import execCode from "@util/execCode";

export const proxyMain = catchAsyncErrors(
  async ( 
    req: Request<{}, {}, IReqBody>,
    res: Response,
    next: NextFunction
  ) => {
    const body = req.body;
    let code = `
      const { Image, RealImage, ProxyImage } = require("@pattern/structural/proxy.pattern");
    `
    code += body.code;

    res.json({
      result: execCode(code)
    });
});
