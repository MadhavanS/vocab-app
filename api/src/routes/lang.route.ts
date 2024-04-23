import { Router, Request, Response } from "express";
import langService from '../config/lang.service';
import langController from "../controllers/lang.controller";

const langRouter = Router();

langRouter.get('/q', langController.search);
langRouter.get('/', langController.getAll);
langRouter.post('/', langController.save);
langRouter.delete('/:nl', langController.delWord);
langRouter.put('/:nl', langController.updateWord);


export default langRouter;