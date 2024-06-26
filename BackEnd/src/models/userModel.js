const db = require('../../configs/dbConnection');
const bcrypt = require('../wrappers/bcrypt');

class UserModel {
    constructor(user_id ,name, email, password, data) {
        this.user_id = user_id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.data = data; // JSON with some user data, acces level, preferences, etc.
    }


    createUser() {
        return new Promise((resolve, reject) => {
            if (this.user_id === undefined || this.name === undefined || this.email === undefined || this.password === undefined || this.data === undefined) {
                reject('Missing required fields');
            }
            if (this.user_id.length === 0 || this.name.length === 0 || this.email.length === 0 || this.password.length === 0 || this.data.length === 0) {
                reject('Empty required fields');
            }

            // Validación de formato de correo electrónico
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.email)) {
            reject('Invalid email format');
            }

            db.query('SELECT * FROM users WHERE user_id = ?', [this.user_id], (error, result) => {
            if (result.length > 0) {reject('User already exists');}});

            const query = 'INSERT INTO users (user_id, name, email, password, data) VALUES (?, ?, ?, ?, ?)';
            db.query(query,[this.user_id, this.name, this.email, this.password, JSON.stringify(this.data)] , (error, result) => {
            if (error) {
                reject(error);
            } else {
                 resolve(result);
            }
            });
        });
    }

    findUserById(){
        return new Promise((resolve, reject) => {
            if (this.user_id === undefined) {
                reject('Missing required fields');
            }
            if (this.user_id.length === 0) {
                reject('Empty required fields');
            }
            db.query('SELECT * FROM users WHERE user_id = ?', [this.user_id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if(result.length > 0){
                        result[0].data = JSON.parse(result[0].data);
                    }
                    resolve(result);
                }
            });
        });
    }

    findAllUsers(){
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users', (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    for(let i = 0; i < result.length; i++){
                        result[i].data = JSON.parse(result[i].data);
                    }
                    resolve(result);
                }
            });
        });
    }

    updateUser() {
        return new Promise((resolve, reject) => {
            const setFields = [];
            const values = [];   
            if (this.name !== undefined) {
                setFields.push(`name = ?`);
                values.push(this.name);
            }
            if (this.email !== undefined) {
                setFields.push(`email = ?`);
                values.push(this.email);
            }
            if (this.password !== undefined) {
                setFields.push(`password = ?`);
                values.push(bcrypt.hashUserPassword(this.password));
            }
            if (this.data !== undefined) {
                setFields.push(`data = ?`);
                values.push(JSON.stringify(this.data));
            }          
            values.push(this.user_id);
            const query = `UPDATE users SET ${setFields.join(', ')} WHERE user_id = ?`;  
            db.query(query, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }
    
    deleteUserDefinitely(){
        return new Promise((resolve, reject)=>{
            const query = 'DELETE FROM users WHERE user_id = ?';
            db.query(query, [this.user_id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
           
        });
    }

    deleteUserLogic(){
        return new Promise((resolve, reject)=>{
            const query = 'UPDATE users SET data =? WHERE user_id = ?';
            db.query(query, [JSON.stringify(this.data), this.user_id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });

        });
    }

    loginUser(){
        return new Promise((resolve, reject) => {
            if (this.user_id === undefined || this.password === undefined) {
                reject('Missing required fields');
            }
            if (this.user_id.length === 0 || this.password.length === 0) {
                reject('Empty required fields');
            }


            db.query('SELECT * FROM users WHERE user_id = ?', [this.user_id], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if(result.length > 0){
                        result[0].data = JSON.parse(result[0].data);
                    }
                    resolve(result);
                }
            });
        });
    }
}
    

module.exports = UserModel;