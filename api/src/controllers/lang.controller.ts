import e, { Request, Response } from 'express';
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
    const pageQuery = req.query.page as string;
    const limitQuery = req.query.limit as string;

    console.log(pageQuery, ' - ', limitQuery);
    let pageInt = parseInt(pageQuery, 10) || 1;
    let limitInt = parseInt(limitQuery, 10) || 5;
    const startIndex = (pageInt - 1) * limitInt;
    // Here we compute the LIMIT parameter for MySQL query
    let limit = startIndex + ',' + limitInt;


    langService.selectAll(limit)
        .then(words => {
            langService.getTotalRecord().then(count => {
                let pagination = {
                    next: (parseInt(pageQuery) === 0)? 1: (pageInt + 1),
                    prev: pageInt - 1,
                    limit: limitInt,
                    total: count
                }
                let meta = {pagination};

                res.status(200).send({
                    result: words,
                    meta: meta// words.slice(startIndex, endIndex)
                });
            })
        }).catch(err => {
            res.status(500).send({
                message: 'DATABASE ERROR',
                error: err.code
            });
        });
    };
 async function val() { return langService.getTotalRecord(); }
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

const delWord = (req: Request, res: Response) => {
    console.log(req.params.nl);
    langService.del(req.params.nl)
        .then((nl) => {
            res.status(200).send({
                result: `${nl} deleted successfully`
            })
        }).catch(err => {
                res.status(204).send({
                    message: 'DELETE FAILED',
                    error: err.code
                });
            });
        };

const updateWord = (req: Request, res: Response) => {
    langService.update(req.body, req.params.nl)
        .then((word) => {
            console.log(word);
            res.status(200).send({
                result: word
            });
        }).catch(err => {
            res.status(500).send({
                message: 'UPDATE ERROR',
                error: err.code
            });
        });
}
export default { search, getAll, save, delWord, updateWord };
