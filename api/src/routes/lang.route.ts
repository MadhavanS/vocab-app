import { Router, Request, Response } from "express";
import langService from '../config/lang.service';
import langController from "../controllers/lang.controller";

const langRouter = Router();

langRouter.get('/q', langController.search);
langRouter.get('/', langController.getAll);
langRouter.post('/', langController.save);

/*
async (req: Request, res: Response) => {
    // console.log("---------------------------");
    // console.log(req.query.nl);
    let val: string = req.query.nl != undefined? req.query.nl.toString(): '';
    langService.find(val)
        .then((word) => {
            console.log(word);
            res.status(200).send({
                result: word
            });
        }).catch(err => {
            res.status(500).send({
                message: 'DATABASE ERROR',
                error: err.code
            });
        });
}
 */


export default langRouter;