const express = require('express');
const fs = require('fs');

const collection = './collections/collection.json';

const router = express.Router();

router.get('/result', async (req, res) => {
    
    try{
        await fs.readFile(collection, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(data);
        });

    } catch(err){
        console.log(err);
        return res.status(400).send({error: 'Unexpected Error'});
    }
});

router.get('/result/:id', async (req, res) => {
    
    try{
        await fs.readFile(collection, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            var obj = JSON.parse(data);
            var result = false;

            for (var property in obj){
                if (property == req.params.id) {
                    result = obj[property];
                }
            }

            if(result)
                res.send(result);
            else
                res.status(400).send({error: 'Result not found'});
        });
        
    } catch(err){
        console.log(err);
        return res.status(400).send({error: 'Unexpected Error'});
    }
});

module.exports = app => app.use('/game', router);