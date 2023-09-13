const asyncHandler = require("express-async-handler");   //(npm i async-handler)this asyncHandler will play role for try-catch block, if there is an error it will automatically send it to errorHandler
const Contact = require("../models/contactModel");

// @get all contacts
// @route GET/api/contacts
// @access private
const getContacts = asyncHandler(async (req,res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status = 200;
    res.json(contacts);
});

// @create contacts
// @route GET/api/contacts
// @access private
const createContact = asyncHandler(async (req,res) => {    
    console.log("user data is :" , req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory.");
    }
    const contact = await Contact.create({
        name,email,phone,user_id:req.user.id
    })
    res.status = 200;
    res.json(contact);
});

// @get single contact
// @route GET/api/contacts/:id
// @access private
const getContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status = 200;
    res.json(contact);
});

// @update contacts
// @route GET/api/contacts/:id
// @access private
const updateContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other users contacts");
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id , req.body , {new : true});
    res.status = 200;
    res.json(updatedContact);
});

// @delete contacts
// @route GET/api/contacts/:id
// @access private
const deleteContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other users contacts");
    }   
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
});

module.exports = {getContacts , getContact , createContact , updateContact , deleteContact};