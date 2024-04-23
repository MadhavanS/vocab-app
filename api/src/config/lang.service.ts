import {OkPacketParams, PoolConnection, ResultSetHeader} from "mysql2";
import { Lang } from "../model/lang";
import db from './database';

const selectAll = (limit: string): Promise<Lang[]> => {
    return new Promise((resolve, reject) => {
        db.getConnection((err, connection: PoolConnection) => {
            connection.query('SELECT * FROM nlendb limit ' + limit, (err, rs: Lang[]) => {
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
            connection.query<ResultSetHeader>('INSERT INTO nlendb SET ?', [data], (err, rs) => {
                if(err) {
                    console.log(err);
                    return reject(err);
                }
                return resolve(data.dutch);
            })
        })
    })
}

const find = (nl: string) => {
    return new Promise((resolve, reject) => {
        db.getConnection((err, connection) => {
            connection.query('SELECT * FROM nlendb WHERE dutch = ?', [nl], (err, rs) => {
                if(err) {
                    console.log(err);
                    return reject(err);
                }
                return resolve(rs?.[0].insertId);
            });
        });
    });
}

const del = (nl: string) => {
    return new Promise((resolve, reject) => {
        db.getConnection((err, connection) => {
            connection.query('DELETE FROM nlendb WHERE dutch = ?', nl, (err, rs) => {
                if(err) {
                    return reject(err);
                }
                return resolve(rs?.[0]);
            });
        })
    })
}

const update = (data: Lang, param: string) => {
    console.log(data.dutch, ' =====')
    return new Promise((resolve, reject) => {
        db.getConnection((err, connection) => {
            connection.query('UPDATE nlendb SET ? WHERE dutch = ?', [data, param], (err, rs) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                console.log('success--')
                return resolve(rs);
            });
        });
    });
}

const getTotalRecord = () => {
    return new Promise((resolve, reject) => {
        db.getConnection((err, connection) => {
            connection.query('SELECT COUNT(*) as total FROM nlendb', (err, rs) => {
                // console.log(rs[0].total, ' «««');
                return resolve(rs[0].total);
            })
        })
    })
}

export default { selectAll, insert, find, del, update, getTotalRecord };