const UserModel = require('../models/userModel');
const userModel = require('../models/userModel');
const bcrypt = require('../wrappers/bcrypt');


exports.createUser = (req, res) => {
    try{
        const {user_id, name, email, password, data} = req.body;
        const hashedPassword = bcrypt.hashUserPassword(password);
        const newUser = new userModel(user_id, name, email, hashedPassword, data);
        console.log(newUser);
        newUser.createUser().then(result => {
            res.status(201).send({message: 'User created successfully', newUser});
        }).catch(error => {
            console.log(error);
            res.status(400).send({message: 'Error creating user', error}, );
            
        });
    }
    catch(error){
        res.status(400).send({message: 'Error creating user'});
    }
};

exports.findUserById = (req, res) => {
    try{
        const {user_id} = req.query;
        user = new userModel(user_id);
        user.findUserById().then(result => {
            res.status(200).send({message: 'User found', user: result});
        }).catch(error => {
            console.log(error);
            res.status(404).send({message: 'User not found', error});
        });
    }
    catch(error){
        res.status(400).send({message: 'Error finding user'});
    }
}

exports.findAllUsers = (req, res) => {
    try{
        users = new UserModel();
        users.findAllUsers().then(result => {
            res.status(200).send({message: "users find succesfully", result});
        }).catch(error => {
            console.log(error);
            res.status(404).send({message: "Error finding users", error});
        });
    }
    catch (error){
        res.status(400).send({message: "Error finding users", error});
    }
}

exports.updateUser = (req, res) =>{
    try{
        const {user_id, name, email, password, data} = req.body;
        const hashedPassword = bcrypt.hashUserPassword(password);
        const user = new UserModel(user_id, name, email, hashedPassword, data);
        user.updateUser().then(result => {
            res.status(200).send({message: 'User updated successfully', log: result, newUser : user});
        }).catch(error => {
            console.log(error);
            res.status(400).send({message: 'Error updating user', error});
        });
    }
    catch(error){
        res.status(400).send({message: 'Error updating user'});
    }
}

exports.deleteUser = (req, res) => {
    try{
        const {user_id} = req.query;
        const user = new UserModel(user_id);
        user.deleteUserDefinitely().then(result => {
            res.status(200).send({message: 'User deleted successfully', log: result});
        }).catch(error => {
            console.log(error);
            res.status(400).send({message: 'Error deleting user', error});
        });
        
    }
    catch(error){
        res.status(400).send({message: 'Error deleting user'});
    }
  
}


exports.deleteUserLogic = (req, res) => {
    try{

        const {user_id, data} = req.body;
        const user = new UserModel(user_id, null, null, null,data);
        console.log(user)
        user.deleteUserLogic().then(result => {
            res.status(200).send({message: 'User deleted successfully', log: result, user});
        }).catch(error => {
            console.log(error);
            res.status(400).send({message: 'Error deleting user', error});
        });
    }
    catch(error){
        res.status(400).send({message: 'Error deleting user'});
    }
}

exports.Login =(req, res) =>{
    try{
        const {user_id, password} = req.body;
        const user = new UserModel(user_id, null, null, password);
        user.loginUser().then(result => {
            if (!result || !bcrypt.compareUserPassword(password, result[0].password)) {
                return res.status(404).send({ message: 'User not found or invalid password' });
            }
            res.status(200).send({message: 'User logged in successfully', user: result});
        }).catch(error => {
            console.log(error);
            res.status(404).send({message: 'User not found or unvalid password', error});
        });
    }
    catch(error){
        res.status(400).send({message: 'Ocurrio un error al logearse'});
    }

}
