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
    let where ="1=1";
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
        'test2'
        ,'test@naver.com' 
    ];

    conn.setInsert(table,fields,values);
}); 



module.exports = router;