import db from "./pool.connection";
import { Word } from "../model/lang";

const getAllRecords = async () => {
  const result = await db.query("SELECT * FROM dutchDict ORDER BY dutchDict.dutch");
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

const updateRecord = async (obj: Word, nl: string) => {
  let re = await db.query(
    'UPDATE dutchDict SET dutch = $1, engels = $2, notes = $3, sentences = $4 WHERE dutch = $5',
      [`${obj.dutch}`, `${obj.engels}`,
      `${obj.notes !== undefined ? obj.notes : ""}`,
      `${obj.sentences !== undefined ? obj.sentences : ""}`, `${nl}`]
  );
  return re;
};

const deleteRecord = async (nl: string) => {
  let re = await db.query(
    'DELETE FROM dutchDict WHERE dutch = $1',
      [`${nl}`]
  );
  return re;
};

export default { getAllRecords, getTotalRecord, addRecord, updateRecord, deleteRecord };
