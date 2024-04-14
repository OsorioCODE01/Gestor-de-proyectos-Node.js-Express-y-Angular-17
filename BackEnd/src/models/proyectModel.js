const db = require('../../configs/dbConnection');

class ProyectModel{
    constructor(proyect_id, owner_id, proyect_title, description, status, content){
        this.proyect_id = proyect_id;
        this.owner_id = owner_id;
        this.proyect_title = proyect_title;
        this.description = description;
        this.status = status;
        this.content = content;
    }

    createProyect(){
        return new Promise ((resolve, reject)=>{
            if(this.owner_id === undefined || this.proyect_title === undefined || this.description === undefined || this.status === undefined|| this.content === undefined){
                reject('Missing required fields');
            }
            if(this.owner_id.length === 0 || this.proyect_title.length === 0 || this.description.length === 0 || this.status.length === 0|| this.content.length === 0){
                reject('Empty required fields');
            }

            const query = 'INSERT INTO proyects (owner_id, proyect_title, description, status, content) VALUES (?, ?, ?, ?, ?)';
            db.query(query, [this.owner_id, this.proyect_title, this.description, this.status, JSON.stringify(this.content)], (error, result)=>{
                if(error){
                    reject(error);
                } else {
                    resolve(result);
                }
            });

        })
    }

    getProyectById(){
        return new Promise ((resolve, reject)=>{
            if(this.proyect_id === undefined){
                reject('Missing required fields');
            }
            if(this.proyect_id.length === 0){
                reject('Empty required fields');
            }
            db.query('SELECT * FROM proyects WHERE proyect_id = ?', [this.proyect_id], (error, result)=>{
                if(error){
                    reject(error);
                } else {
                    if(result.length > 0){
                        result[0].content = JSON.parse(result[0].content);
                    }
                    resolve(result);
                }
            })
        })
    }

    getAllProyects(){
        return new Promise ((resolve, reject)=>{
            db.query('SELECT * FROM proyects', (error, result)=>{
                if(error){
                    reject(error);
                } else {
                    for (let i = 0; i < result.length; i++){
                        result[i].content = JSON.parse(result[i].content);
                    }
                    resolve(result);
                }
            });

        })
    }

    getProyectsByOwnerId(){
        return new Promise ((resolve , reject)=>{
            if(this.owner_id === undefined){
                reject('Missing required fields');
            }
            if(this.owner_id.length === 0){
                reject('Empty required fields');
            }
            db.query('SELECT * FROM proyects WHERE owner_id = ?', [this.owner_id], (error, result)=>{
                if(error){
                    reject(error);
                } else {
                    for (let i = 0; i < result.length; i++){
                        result[i].content = JSON.parse(result[i].content);
                    }
                    resolve(result);
                }

            })
        })
    }


    editProyect(){
        return new Promise ((resolve, reject)=>{
            let setFields = [];
            let values = [];
            console.log(this)

            if(this.proyect_title !== undefined){
                setFields.push(`proyect_title = ?`);
                values.push(this.proyect_title);
            }
            if(this.description !== undefined){
                setFields.push(`description = ?`);
                values.push(this.description);
            }
            if(this.status !== undefined){
                setFields.push(`status = ?`);
                values.push(this.status);
            }

            values.push(this.proyect_id);
            const query = `UPDATE proyects SET ${setFields.join(', ')} WHERE proyect_id = ?`;
            db.query(query, values, (error, result)=>{
                if(error){
                    reject(error);
                } else {
                    resolve(result);
                }
            })

        })
    }


    deleteProyect(){
        return new Promise ((resolve, reject)=>{
            if(this.proyect_id === undefined){
                reject('Missing required fields');
            }
            if(this.proyect_id.length === 0){
                reject('Empty required fields');
            }
            db.query('DELETE FROM proyects WHERE proyect_id = ?', [this.proyect_id], (error, result)=>{
                if(error){
                    reject(error);
                } else {
                    resolve(result);
                }

            })
        })
    }

    updateContent(){
        return new Promise ((resolve, reject) =>{
            if(this.proyect_id === undefined || this.content === undefined){
                reject('Missing required fields');
            }
            if(this.proyect_id.length === 0 || this.content.length === 0){
                reject('Empty required fields');
            }
            db.query('UPDATE proyects SET content = ? WHERE proyect_id = ?', [JSON.stringify(this.content), this.proyect_id], (error, result)=>{
                if(error){
                    reject(error);
                } else {
                    resolve(result);
                }
            }

        )})
    }

}
module.exports = ProyectModel;