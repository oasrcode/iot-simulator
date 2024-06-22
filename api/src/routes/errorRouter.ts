import { Request, Response, NextFunction } from "express";

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack); 

  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
}

export default errorHandler;
