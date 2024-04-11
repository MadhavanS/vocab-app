import { Request, Response } from 'express';
import langService from '../config/lang.service';

const search = (req: Request, res: Response) => {
    console.log(req.query.nl);
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
};


const getAll = (req: Request, res: Response) => {
    langService.selectAll()
        .then(words => {
            res.status(200).send({
                result: words
            });
        }).catch(err => {
            res.status(500).send({
                message: 'DATABASE ERROR',
                error: err.code
            });
        });
    };

const save = (req: Request, res: Response) => {
    console.log(req.body.dutch, '    ===============');
    langService.insert(req.body)
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
};
export default { search, getAll, save };
