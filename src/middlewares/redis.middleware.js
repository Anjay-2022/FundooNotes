import { client } from '../config/redis';
import HttpStatus from 'http-status-codes';


export const redisCheck = async (req, res, next) => {
    try {
        const allNotes = await client.get(req.body.email)
        const notes = JSON.parse(allNotes)
        if (notes != null) {
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: notes,
                message: 'Note fetched from Redis'
            })

        } else
            next()

    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        })
        next(error);
    }
}

export const redisCheckOne = async (req, res, next) => {
    try {
        const allNotes = await client.get(req.params._id)
        const notes = JSON.parse(allNotes)
        if (notes != null) {
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: notes,
                message: 'Note fetched from Redis'
            })

        } else
            next()

    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        })
        next(error);
    }
}