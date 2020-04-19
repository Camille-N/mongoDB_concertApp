
const express = require('express');

const router = express.Router();

const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

mongoose.connect('mongodb://localhost/local');

const urlStart = 'concert';



//////////////////////////
// Définition du schéma //
//////////////////////////

const ConcertSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.Mixed,
        lieu: String,
        groupe: String,
        note: Number,
        concertDate: Date
    }
);

///////////////////////////////////////////
// Création du modèle à partir du schema //
///////////////////////////////////////////

const ConcertModel = new mongoose.model('concerts', ConcertSchema);



///////////////////////////////////////////////
// Route pour afficher la liste des concerts //
///////////////////////////////////////////////

router.get('/list', (req, res) => {
    ConcertModel.find({}, (err, data) => {
        res.render(urlStart + '/list', { concertlist: data });
    });
});


////////////////////////////////////////////////////////////
// Route pour afficher le formulaire d'ajout d'un concert //
////////////////////////////////////////////////////////////

router.get('/form', (req, res) => {
    res.render(urlStart + '/form', {
        concertAction: '/' + urlStart + '/insert',
        concert: {
            lieu: null,
            groupe: null,
            note: null,
            concertDate: null
        }
    });
});

////////////////////////////////////////////////////////////////////
// Traitement du formulaire pour l'insertion d'un nouveau concert //
////////////////////////////////////////////////////////////////////

router.post('/insert', (req, res) => {
    let concert = req.body;

    concert._id = null;
    concert.concertDate = new Date(concert.concertDate);
    
    
    // Hydratation
    const concertMod = new ConcertModel(concert);

    // Persistance du modèle
    concertMod.save((err, result) => {
        if (err) {
            // Définition du message flash d'erreur
            req.flash('error', 'Ajout impossible');
        } else {
            // Définition du message flash de succès
            req.flash('info', 'Ajout effectué');
        }

        res.redirect('/' + urlStart + '/list');
    });
});


/////////////////////////////////////
// Route pour supprimer un concert //
/////////////////////////////////////

router.get('/delete/:id', (req, res) => {

    let search = { _id: ObjectId(req.params.id) };

    ConcertModel.deleteOne(search, (err, result) => {
        // Définition du message flash
        req.flash('info', 'Suppression effectuée');
        console.log(err);
        console.log(result);
        res.redirect('/' + urlStart + '/list');
    });
});


module.exports = router;