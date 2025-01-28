const express = require('express')
const router = express.Router()
const Contact = require('../models/Contact')

// add contact
router.post('/add-contact', async (req, res) => {
    try {
        const data = new Contact({
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            batch: req.body.batch
        });

        const newContact = await data.save();
        res.status(200).json({
            newContactData: newContact
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
});

// get all contacts
router.get('/all-contact', async (req, res) => {
    try {
        const data = await Contact.find().select("_id fullName phone");
        res.status(200).json({
            contactList: data
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
});

// get contact by id
router.get('/contactById/:contactId', async (req, res) => {
    try {
        const data = await Contact.findById(req.params.contactId).select("fullName email phone address batch");
        res.status(200).json({
            contact: data
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
});

// get students contact details by batch name
router.get('/batchName/:batchName', async (req, res) => {
    try {
        const data = await Contact.find({ batch: req.params.batchName });
        res.status(200).json({
            contact: data
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
});

// delete contact by id
router.delete('/delete/:id', async (req, res) => {
    try {
        const data = await Contact.deleteOne({ _id: req.params.id });
        res.status(200).json({
            msg: data
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
});
// update contact API
router.post('/update/:id', async (req, res) => {
    try {
        const newData = {
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            batch: req.body.batch
        };

        const updateData = await Contact.findByIdAndUpdate(req.params.id, newData, { new: true });
        res.status(200).json({
            updatedContact: updateData
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
});

module.exports = router;