const express = require("express");
const router = express.Router();
const conn = require('../query');

// router.get('/', function(req, res) { 
//     conn.getAllUsers((rows) =>{ 
//         res.send(rows);
//     });
// }); 

router.get('/', function(req, res) { 
    let table = "users";
    let as = "*";
    let where ="where 1=1";
    let opt = " order by id asc";

    conn.getSelectFrom(table,as,where,opt,(rows) =>{ 
        res.send(rows);
    });
}); 

router.get('/insertTest', function(req, res) { 
    let table = "users";
    let fields = [
        'name'
        ,'email' 
    ];
    let values = [
        'test3'
        ,'test3@naver.com' 
    ];

    conn.setInsert(table,fields,values);
}); 

router.get('/updateTest', function(req, res) { 
    let table = "users";
    let fields = [
        'email' 
    ];
    let values = [
        'test33333@naver.com' 
    ];
    let where ="where id=3";

    conn.setUpdate(table,fields,values,where);
}); 

router.get('/deleteTest', function(req, res) { 
    let table = "users";
    let where ="where id=3";

    conn.setDelete(table,where);
}); 

module.exports = router;