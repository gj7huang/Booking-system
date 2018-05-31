import express from 'express';
import path  from 'path';
import bodyParser from 'body-parser';
import cors  from 'cors';
import mysql from 'mysql';
import db from './conf/db';
import cus from './sqlMapping/cusSql';
import mov from './sqlMapping/movSql';
import ticket from './sqlMapping/ticketSql';

const app = express();
const pool = mysql.createPool(db.mysql);
const [PORT = 3000, HOST = `localhost`] = [process.env.PORT, process.env.CUSTOMVAR_HOSTNAME];


app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/*', function (req, res, next) {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
});

app.use('/', express.static(__dirname + '/views'));
// app.disable("etag");

// show index
app.route('/')
    .get((req, res) => {
        res.render('index');
    });

// API /customerList: Get all customer.
app.get('/customerList', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(cus.queryList, (err, result) => {
            //console.log(result);
            res.send(JSON.stringify(result[0]));
            connection.release();
        });
    });
});

// API /movieList: Get all movie.
app.get('/movieList', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(mov.queryList, (err, result) => {
            //console.log(result);
            res.send(JSON.stringify(result[0]));
            connection.release();
        });
    });
});

// API /ticketList: Get all ticket.
app.get('/ticketList', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(ticket.queryAll, (err, result) => {
            //console.log(result);
            res.send(JSON.stringify(result[0]));
            connection.release();
        });
    });
});

// API /bookTicket: post a ticket.
app.post('/bookTicket', (req, res) => {
    pool.getConnection((err, connection) => {
        connection.query(
          ticket.insert,
          [req.body.cus, req.body.mov],
          (err, result) => {
                // console.log(result);
                if(result.serverStatus === 2) {
                    res.send({
                        code: 200,
                        msg: '增加成功'
                    });
                }
                connection.release();
          }
        );
    });
});


app.use((req, res, next) => {
  res.status(404).send('404!');
});


app.listen(PORT, () => console.log(`app started at http://${HOST}:${PORT}`));