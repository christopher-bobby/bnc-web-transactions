
const db = require('mysql-promise')();

db.configure({
	"host": "localhost",
	"user": "root",
	"password": "Password01",
	"database": "bankNeoCommerce"
});


const express = require('express');

const router = express.Router();

// const Model = require('../models/model');
// const MenuModel = require('../models/menuModel');
// const RecipeModel = require('../models/recipeModel');



router.post('/register', async (req, res) => {
    const data = {
        CorporateAccount: req.body.corporateAccountNo,
        CorporateName: req.body.corporateName,
        UserId: req.body.userId,
        UserName: req.body.userName,
        UserRole: req.body.role,
        PhoneNumber: req.body.phoneNumber,
        Email: req.body.email,
        Verification: req.body.verification,
        Password: req.body.password
    }

    for (const [key, value] of Object.entries(data)) {
        if (value === undefined || value === null) {
            return res.status(400).json({ error: `${key} is required` });
        }
    }


    try {
        db.query(`INSERT INTO User (CorporateAccount, CorporateName, UserId, UserName, UserRole, PhoneNumber,Email, Verification, Password ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [data.CorporateAccount, data.CorporateName, data.UserId, data.UserName, data.UserRole, data.PhoneNumber, data.Email, data.Verification, data.Password]).spread(function (users) {
            res.status(200).json("successful")
        });
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
router.post('/login', async (req, res) => {
    const data = {
        CorporateAccount: req.body.corporateAccountNo,
        UserId: req.body.userId,
        Password: req.body.password
    }
    for (const [key, value] of Object.entries(data)) {
        if (value === undefined || value === null) {
            return res.status(400).json({ error: `${key} is required` });
        }
    }


    try {
        db.query("SELECT * FROM User WHERE CorporateAccount = ? AND UserId = ? AND Password = ?", [data.CorporateAccount, data.UserId, data.Password]).then(rows => {
           if(!rows[0].length) {
            res.status(400).json("error")
           }

           let item = rows[0][0];
           
           res.status(200).json({
            data: {
               user: {
                    id: item.UserId,
                    name: item.UserName,
                    role: item.UserRole,
                    phoneNumber: item.PhoneNumber,
                    email: item.Email
               },
                corporate: {
                    account: item.CorporateAccount,
                    name: item.CorporateName
                }
            }
           })
        });
    }
    catch (error) {
        res.status(400).json("error")
    }
})




router.get('/transactions', async (req, res) => {
    try {

        
        const [overviewRows] = await db.query('SELECT * FROM TransactionOverview');
        const [listRows] = await db.query('SELECT * FROM TransactionList');
        res.status(200).json({
            overview: overviewRows[0],
            list: listRows
        });
        // db.query("SELECT * FROM TransactionList").then(rows => {
        //    if(!rows[0].length) {
        //     res.status(400).json("error")
        //    }

        //    let item = rows[0];
        //    res.status(200).json({
        //     data: [
        //        ...item
        //     ]
        //    })
        // });
    }
    catch (error) {
        res.status(400).json("error")
    }
})



module.exports = router;
