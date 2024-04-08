const ProyectModel = require('../models/proyectModel');

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