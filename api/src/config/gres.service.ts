import db from "./pool.connection";
import { Word } from "../model/lang";

const getAllService = async () => {
  const result = await db.query("SELECT * FROM dutchDict");
  return result.rows;
};

const getTotalRecord = async () => {
  const recordCount = await db.query("SELECT COUNT(*) as total FROM dutchDict");
  return Number(recordCount.rows[0].total);
};

const addRecord = async (obj: Word) => {
  let re = await db.query(
    `INSERT INTO dutchDict (dutch, engels, notes, sentences) VALUES (
      '${obj.dutch}', '${obj.engels}', 
      '${obj.notes !== undefined ? obj.notes : ""}', 
      '${obj.sentences !== undefined ? obj.sentences : ""}') RETURNING dutch`
  );
  return re;
};

const updateRecord = async (obj: Word) => {
  let re = await db.query(
    `INSERT INTO dutchDict (dutch, engels, notes, sentences) VALUES (
      '${obj.dutch}', '${obj.engels}', 
      '${obj.notes !== undefined ? obj.notes : ""}', 
      '${obj.sentences !== undefined ? obj.sentences : ""}') RETURNING dutch`
  );
  return re;
};

export default { getAllService, getTotalRecord, addRecord };
