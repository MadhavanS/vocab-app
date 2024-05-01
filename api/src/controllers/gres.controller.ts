import getService from "../config/gres.service";
import { Request, Response } from "express";

const getAllController = async (req: Request, res: Response) => {
  try {
    const pageQuery = req.query.page as string;
    const limitQuery = req.query.limit as string;

    console.log(pageQuery, " - ", limitQuery);
    let pageInt = parseInt(pageQuery, 10) || 1;
    let limitInt = parseInt(limitQuery, 10) || 5;
    const startIndex = (pageInt - 1) * limitInt;
    // Here we compute the LIMIT parameter for MySQL query
    let limit = startIndex + "," + limitInt;

    let pagination = {
      next: parseInt(pageQuery) === 0 ? 1 : pageInt + 1,
      prev: pageInt - 1,
      limit: limitInt,
      total: await getService.getTotalRecord(),
    };

    res.json({
      result: await getService.getAllService(),
      meta: { pagination },
    });
  } catch (error) {
    console.error("Error fetching todos", error);
    res.status(500).json({ error: "Error fetching todos" });
  }
};

const addDataController = async (req: Request, res: Response) => {
  console.log(req.body);
  let rest = await getService.addRecord(req.body);
  res.json("added successfully " + rest);
};

const updateController = async (req: Request, res: Response) => {
  console.log(req.body);
  let rest = await getService.addRecord(req.body);
  res.json("added successfully " + rest);
};

export default { getAllController, addDataController, updateController };
