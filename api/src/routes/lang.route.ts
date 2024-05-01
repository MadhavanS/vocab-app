import { Router, Request, Response } from "express";
// import langService from "../config/lang.service";
// import langController from "../controllers/lang.controller";
// import { LangImpl } from "../config/LangImpl";
import getController from "../controllers/gres.controller";

const langRouter = Router();

// langRouter.get('/q', langController.search);
// langRouter.get('/', langController.getAll);
// langRouter.post('/', langController.save);
// langRouter.delete('/:nl', langController.delWord);
// langRouter.put('/:nl', langController.updateWord);

langRouter.get("/", getController.getAllController);
langRouter.post("/", getController.addDataController);

export default langRouter;
