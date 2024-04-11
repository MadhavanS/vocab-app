import { PoolConnection } from "mysql2";
import { Lang } from "../model/lang";
import db from './database';

const selectAll = (): Promise<Lang[]> => {
    return new Promise((resolve, reject) => {
        console.log(`SELECT ALL::  00000000000000000000000000000`);
        db.getConnection((err, connection: PoolConnection) => {
            connection.query('SELECT * FROM nlendb', (err, rs: Lang[]) => {
                connection.release();
                if(err) {
                    console.log(err);
                    return reject(err);
                }
                return resolve(rs);
            });

        });
    });
}

const insert = (data: Lang) => {
    console.log(data)
    return new Promise((resolve, reject) => {
        db.getConnection((err, connection) => {
            connection.query('INSERT INTO nlendb SET ?', [data], (err, rs) => {
                if(err) {
                    console.log(err);
                    return reject(err);
                }
                return resolve(rs);
            })
        })
    })
}

const find = (nl: string) => {
    return new Promise((resolve, reject) => {
        db.getConnection((err, connection) => {
            console.log(`ID:: ${nl} ======================`);
            connection.query('SELECT * FROM nlendb WHERE dutch = ?', [nl], (err, rs) => {
                if(err) {
                    console.log(err);
                    return reject(err);
                }
                return resolve(rs?.[0]);
            });
        });
    });
}

export default { selectAll, insert, find };