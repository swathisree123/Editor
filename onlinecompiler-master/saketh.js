var compiler = require('compilex');
var options = {stats : true}; //prints stats on console  
compiler.init(options);
var fs = require("fs")
var cors = require("cors")
const emptyDir = require('empty-dir');
var bodyParser =    require("body-parser");
var express = require("express")
var path = require("path");
var app = express()


app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/* For C and c++ Compiler */
app.post("/cpp.js",function(req,res)
{
	var envData = { OS : "windows" , cmd : "g++"};
    //  var envData = { OS : "linux" , cmd : "gcc" }; 
	compiler.compileCPPWithInput( envData , req.body.FileData,req.body.inputData, req.body.file, function(data)
    {
        console.log(data)
        res.send(data)
    });
})
app.post("/c.js",function(req,res)
{
    var envData = { OS : "windows" , cmd : "gcc"};
    //  var envData = { OS : "linux" , cmd : "gcc" }; 
    compiler.compileCPPWithInput( envData , req.body.FileData,req.body.inputData, req.body.file, function(data)
    {
        console.log(data)
        res.send(data)
    });
})
app.post("/php.js",function(req,res)
{
    var envData = { OS : "windows" , cmd : "php"};
    //  var envData = { OS : "linux" , cmd : "gcc" }; 
    compiler.compilePhpWithInput( envData , req.body.FileData,req.body.inputData,req.body.file, function(data)
    {
        res.send(data)
    });
})
/* For Java Compiler */ 
app.post("/java.js",function(req,res)
{
	var envData = { OS : "windows"}; 
    //  var envData = { OS : "linux"}; 
    compiler.compileJavaWithInput( envData , req.body.FileData,req.body.inputData, req.body.file, function(data)
    {
        res.send(data)
    });
})
/* For C# Compiler */ 
app.post("/cs.js",function(req,res)
{
    var envData = { OS : "windows" }; 
//    var envData = { OS : "linux" }; // ( uses gcc command to compile )
	compiler.compileCSWithInput( envData , req.body.FileData,req.body.inputData, req.body.file, function(data)
    {
        res.send(data)
    });
})
/* For Python Compiler */
app.post("/py.js",function(req,res)
{
    var envData = { OS : "windows" };
//    var envData = { OS : "linux" }; 
	compiler.compilePythonWithInput( envData , req.body.FileData,req.body.inputData, req.body.file, function(data)
    {
        res.send(data)
    });
})
/* For VB.net Compiler */ 
app.post("/vb.js",function(req,res)
{
	compiler.compileVBWithInput( envData ,  req.body.FileData,req.body.inputData, req.body.file, function(data)
    {
        res.send(data)
    });
})
app.post("/php.js",function(req,res)
{
    compiler.compilePhpWithInput( envData ,  req.body.FileData,req.body.inputData, req.body.file, function(data)
    {
        res.send(data)
    });
})
app.post("/pl.js",function(req,res)
{
        var envData = { OS : "windows" };

    compiler.compilePerlWithInput( envData ,  req.body.FileData,req.body.inputData, req.body.file, function(data)
    {
        res.send(data)
    });
})
app.post("/rb.js",function(req,res)
{
        var envData = { OS : "windows" };

    compiler.compileRubyWithInput( envData ,  req.body.FileData,req.body.inputData, req.body.file, function(data)
    {
        res.send(data)
    });
})

app.listen(1235)
