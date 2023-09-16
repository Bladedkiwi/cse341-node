//Needed to access the .env
require('dotenv').config();
// Set up mongodb server
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.9olimoa.mongodb.net/test?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

//Simple server check
// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);

//Get the viable databases
async function listDatabases(client){
    let databasesList = await client.db().admin().listDatabases();
    console.log('Databases:');
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

//simpler connect but with extra functions and closing
async function main() {
   try {
       await client.connect();

       await listDatabases(client);

   } catch(e) {
       console.error(e);
   } finally {
       await client.close();
   }
}
main().catch(console.error);





// const express = require('express');
// const session = require('express-session');
// const bodyParser = require('body-parser');
// const router = express.Router();
// const app = express();
//
// app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
//
// var sess; // global session, NOT recommended, only for demonstration purposes
//
// router.get('/', (req, res) => {
//     sess = req.session;
//     if (sess.email) {
//         return res.redirect('/admin');
//     }
//     res.send('Ok');
// });
//
// router.post('/login', (req, res) => {
//     sess = req.session;
//     sess.email = req.body.email;
//     res.end('done');
// });
//
// router.get('/admin', (req, res) => {
//     sess = req.session;
//     if (sess.email) {
//         res.write(`Hello ${sess.email}`);
//         res.end('Logout');
//     } else {
//         res.write('Please login first.');
//         res.end('Login');
//     }
// });
//
// router.get('/logout', (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//             return console.log(err);
//         }
//         res.redirect('/');
//     });
// });
//
// app.use('/', router);
//
// app.listen(process.env.PORT || 3000, () => {
//     console.log(`App Started on PORT ${process.env.PORT || 3000}`);
// });





// var express = require('express');
// var bodyParser = require('body-parser');
// var multer = require('multer');
//
// var app = express();
// app.use(bodyParser.json());
//
// var.storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, './uploads');
//     },
//     filename: function (req, file, callback) {
//         callback(null, file.fieldname + '-' + Date.now());
//     }
// });
//
// var upload = multer({storage: storage }).array('userPhoto', 2);
//
// // store file on the machine where the node server is running
// app.post('/api/photo', function(req,res) {
//     upload(req,res, function(err) {
//         if (err) {
//             return res.end("Error uploading file.");
//         }
//         res.end('File is uploaded');
//     });
// });
//
// app.listen(3000, function () {
//     console.log('Working on port 3000');
// });
//
// var storage = multer.diskStorage({
//     destination: function (req,file,callback) {
//         callback(null, './uploads');
//     },
//     filename: function(req, file, callback) {
//         callback(null, file.fieldname + '-' + Date.now());
//     }
// });
// userPhoto is the key that should be used in the HTML file element as an ID
// var upload = multer({storage: storage}).array('userPhoto', 2);

// then, simply call this function in the router
// upload(req,res,function(err) {
//     if(err) {
//         return res.end("Error uploading file.");
//     }
//     res.end('File is uploaded');
// })

