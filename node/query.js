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
    let query = "SELECT "+as+" FROM "+table+" "+where+" "+opt;
    getQueryLog(query);
    conn.query('SELECT * from users', (error, rows) => {
        if (error) throw error;
        callback(rows);
    });    
}

function setInsert(table,fields,values){
    let flist = "";
    let vlist = "";
    if( fields.length != values.length){
        return "필드와와 벨류의의 수가가 다릅니다."; 
    }
    if(fields){
        fields.forEach(v => {
            if(flist) flist +=",";
            flist += v;
        });
        
        if(values){
            values.forEach(v => {
                if(vlist) vlist +="','";
                if(!vlist) vlist +="'";
                vlist += v;
            });
            vlist += "'";
        }
    }
    let query = "INSERT INTO "+table+"("+flist+") values("+vlist+");";
    getQueryLog(query);
    conn.query(query);
}

function setUpdate(table,fields,values,where){
    if( fields.length != values.length){
        return "필드와와 벨류의의 수가가 다릅니다."; 
    }
    if( !where ){
        return "조건이이 없습니다."; 
    }

    let upt = "";
    if(fields){
        var idx =0;
        fields.forEach(v => {
            if( values[idx] ){
                if(upt) upt +=",";
                upt += v+"='"+values[idx]+"'";
            }
            idx++;
        });
        
    }
    let query = "UPDATE "+table+" SET "+upt+" "+where;
    getQueryLog(query);
    conn.query(query);
}

function setDelete(table,where){
    if( !where ){
        return "조건이이 없습니다."; 
    }

  
    let query = "DELETE FROM "+table+" "+where;
    getQueryLog(query);
    conn.query(query);
}

function getQueryLog(query){
    if(DEVMODE) console.log('query : '+query);
}

module.exports = { 
    getSelectFrom
    ,setInsert
    ,setUpdate
    ,setDelete
    ,getAllUsers 
}
