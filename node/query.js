const express    = require('express');
const mysql      = require('mysql');
const dbconfig   = require('./db');
const conn = mysql.createConnection(dbconfig);
const DEVMODE = true; 

function getAllUsers(callback){ 
    conn.query('SELECT * from users', (error, rows) => {
        if (error) throw error;
        callback(rows);
    });    
} 

function getSelectFrom(table,as,where,opt,callback){
    let query = "SELECT "+as+" FROM "+table+" where "+where+" "+opt;
    getQueryLog(query);
    conn.query('SELECT * from users', (error, rows) => {
        if (error) throw error;
        callback(rows);
    });    
}

function setInsert(table,fields,values){
    let flist = "";
    let vlist = "";
    fields.forEach(v => {
        if(flist) flist +=",";
        flist += v;
    });

    values.forEach(v => {
        // if(vlist) vlist +="','";
        // vlist += v;
        console.log(v);

    });


 console.log(flist);   
    
    // console.log(values);
    // let query = "INSERT INTO "+as+" FROM "+table+" where "+where+" "+opt;
    // getQueryLog(query);
    // conn.query('SELECT * from users', (error, rows) => {
    //     if (error) throw error;
    //     callback(rows);
    // });    
}

function getQueryLog(query){
    if(DEVMODE) console.log('query : '+query);
}

module.exports = { 
    getSelectFrom
    ,setInsert
    ,getAllUsers 
}
