import { Request, Response } from 'express'

const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: Function
) => {
    return res.status(400).json({
        success: false,
        error: err.message,
    })
}

export default errorHandler
