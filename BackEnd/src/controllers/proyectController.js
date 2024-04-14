const ProyectModel = require('../models/proyectModel');
const Move = require('../utils/moveArrayItems');

exports.createProyect = (req, res) =>{
    try{
        const {owner_id, proyect_title, description,status, content} = req.body;
        const newProyect = new ProyectModel(null,owner_id, proyect_title, description, status, content);
        newProyect.createProyect().then(result =>{
            res.status(201).send({message: 'Proyect created successfully', newProyect});
        }).catch(error =>{
            console.log(error);
            res.status(400).send({message: 'Error creating proyect', error});
        });
    }
    catch(error){
        res.status(400).send({message: 'createProyect error'});
    }
}

exports.getProyects = (req, res) =>{
    try{
        const proyects = new ProyectModel();
        proyects.getAllProyects().then(result =>{
            res.status(200).send({message : 'Proyects retrieved successfully', proyects: result});
        }).catch(error =>{
            console.log(error);
            res.status(400).send({message: 'Error retrieving proyects', error});
        });

    }
    catch(error){
        res.status(400).send({message: 'getProyects error'});
    }
}
exports.getOwnerProyects = (req, res) =>{
    try{
        const proyects = new ProyectModel(null, req.query.owner_id);
        proyects.getProyectsByOwnerId().then(result => {
            res.status(200).send({message: 'Owner proyects retrieved successfully', proyects: result});
        })

    }catch(error){
        res.status(400).send({message: 'getOwnerProyects error'});
    }
}

exports.editProyect = (req, res) =>{
    try{
        const {proyect_id, proyect_title, description, status} = req.body;
        const proyect = new ProyectModel(proyect_id, null, proyect_title, description, status, null);
        
        proyect.editProyect().then(result =>{
            res.status(200).send({message: 'Proyect edited successfully', proyect, log: result});
        }).catch(error =>{
            console.log(error);
            res.status(400).send({message: 'Error editing proyect', error});
        });

    }catch(error){
        res.status(400).send({message: 'editProyect error'});
    }
}

exports.deleteProyect =(req, res)=>{
    try{
        const {proyect_id} = req.body;
        const proyect = new ProyectModel(proyect_id);
        proyect.deleteProyect().then(result =>{
            res.status(200).send({message: 'Proyect deleted successfully', log: result});
        }).catch(error =>{
            console.log(error);
            res.status(400).send({message: 'Error deleting proyect', error});
        });
        
    }catch(error){
        res.status(400).send({message: 'deleteProyect error'});
    }

}



exports.addActivity = (req, res) =>{
    try{
        const {proyect_id, colPos, newActivty} = req.body;
        const proyect = new ProyectModel(proyect_id);
        proyect.getProyectById().then(result =>{
            result[0].content.proyect_columns[colPos].column_content.push(newActivty);
            proyect.content = result[0].content;
            proyect.updateContent().then(result =>{
                res.status(200).send({message: 'Activity added successfully', log: result, proyect: proyect});
            })
        })

    }catch(error){
        res.status(400).send({message: 'addActivity error'});
    
    }
}

exports.addColumn = (req, res)=>{
    try{
        const {proyect_id, newColumn} = req.body;
        const proyect = new ProyectModel(proyect_id);
        proyect.getProyectById().then(result =>{
            result[0].content.proyect_columns.push(newColumn);
            proyect.content = result[0].content;
            proyect.updateContent().then(result =>{
                res.status(200).send({message: 'Column added successfully', log: result, proyect: proyect});
            })
        }).catch(error =>{
            console.log(error);
            res.status(400).send({message: 'Error adding column', error});
        });


    }catch(error){
        res.status(400).send({message: 'addColumn error'});
    }

}
exports.editColumn = (req, res)=>{
    try{
        const {proyect_id, colPos, newTitle} = req.body;
        const proyect = new ProyectModel(proyect_id);
        proyect.getProyectById().then(result =>{
            result[0].content.proyect_columns[colPos].column_title = newTitle;
            proyect.content = result[0].content;
            proyect.updateContent().then(result =>{
                res.status(200).send({message: 'Column edited successfully', log: result, proyect: proyect});
            })
        }).catch(error =>{
            console.log(error);
            res.status(400).send({message: 'Error editing column', error});
        });

    }catch(error){
        res.status(400).send({message: 'editColumn error'})
    }

}

exports.editActivity = (req, res) =>{
    try{
        const {proyect_id, colPos, actPos, newActivityInfo} = req.body;
        const proyect = new ProyectModel(proyect_id);
        proyect.getProyectById().then(result =>{
            result[0].content.proyect_columns[colPos].column_content[actPos].activity_title = newActivityInfo.activity_title;
            result[0].content.proyect_columns[colPos].column_content[actPos].activity_description = newActivityInfo.activity_description;
        proyect.content = result[0].content;
        proyect.updateContent().then(result =>{
            res.status(200).send({message: 'Activity edited successfully', log: result, proyect: proyect});});
        }).catch(error =>{
            console.log(error);
             res.status(400).send({message: 'Error editing activity', error})});

    }catch(error){
        res.status(400).send({message: 'editActivity error'})
    }
}

exports.deleteActivity = (req, res) =>{
    try{
        const {proyect_id, colPos, actPos} = req.body;
        const proyect = new ProyectModel(proyect_id);
        proyect.getProyectById().then(result =>{
            result[0].content.proyect_columns[colPos].column_content.splice(actPos, 1);
            proyect.content = result[0].content;
            proyect.updateContent().then(result =>{
                res.status(200).send({message: 'Activity deleted successfully', log: result, proyect: proyect});
            })
        }).catch(error =>{
            console.log(error);
            res.status(400).send({message: 'Error deleting activity', error});
        });

    }catch(error){
        res.status(400).send({message: 'deleteActivity error'});
    }
}

exports.deleteColumn = (req, res) =>{
    try{
        const {proyect_id, colPos} = req.body;
        const proyect = new ProyectModel(proyect_id);
        proyect.getProyectById().then(result =>{
            result[0].content.proyect_columns.splice(colPos, 1);
            proyect.content = result[0].content;
            proyect.updateContent().then(result =>{
                res.status(200).send({message: 'Column deleted successfully', log: result, proyect: proyect});
            })
        }).catch(error =>{
            console.log(error);
            res.status(400).send({message: 'Error deleting column', error});
        });

    }catch(error){
        res.status(400).send({message: 'deleteColumn error'});
    }
}

exports.moveColumn = (req, res) =>{
    try {
        const {proyect_id, from, to} = req.body;
        const Proyect = new ProyectModel(proyect_id);
        Proyect.getProyectById().then(result =>{
            const newContentColumns = Move.moveArrayItems(from, to , result[0].content.proyect_columns);
            result[0].content.proyect_columns = newContentColumns;
            Proyect.content = result[0].content;
            Proyect.updateContent().then(result =>{
                res.status(200).send({message: 'Column moved successfully', log: result, proyect: Proyect});
            })
        })

    }catch(error){
        res.status(400).send({message: 'moveColumn error'});
    }

}

exports.moveActivity = (req, res) =>{
    try{
        const {proyect_id, colPos, from, to} = req.body;
        const proyect = new ProyectModel(proyect_id);
        proyect.getProyectById().then(result =>{
            const newColumnContent = Move.moveArrayItems(from, to, result[0].content.proyect_columns[colPos].column_content);
            result[0].content.proyect_columns[colPos].column_content = newColumnContent;
            proyect.content = result[0].content;
            proyect.updateContent().then(result =>{
                res.status(200).send({message: 'Activity moved successfully', log: result, proyect: proyect});
            })
        })
    }catch(error){
        res.status(400).send({message: 'moveActivity error'});
    }"p"
}

exports.moveActivityToColumn = (req, res) =>{
    try{
        const {proyect_id, fromCol, toCol, actFrom, actTo} = req.body;
        const proyect = new ProyectModel(proyect_id);
        proyect.getProyectById().then(result =>{
            const newContentColumns = Move.ActToOtherCol(actFrom, actTo, fromCol, toCol, result[0].content.proyect_columns);
            result[0].content.proyect_columns = newContentColumns;
            proyect.content = result[0].content;
            console.log(proyect.content.proyect_columns);
            res.status(200).send({message: 'Activity moved to column successfully', proyect: proyect});      
 })

    }catch(error){
        res.status(400).send({message: 'moveActivityToColumn error'});
    }
}