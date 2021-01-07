import connection from "../../config/database";

export function Insert(query, values) {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
    })
}

export function Select(query, condition) {
    return new Promise((resolve, reject) => {
        connection.query(query, [condition], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
    })
}

export function Update(query, values) {
    return new Promise((resolve, reject) => {
        connection.query(query, [values], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
    })
}

export function Delete(query, condition) {
    return new Promise((resolve, reject) => {
        connection.query(query, [condition], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
    })
}