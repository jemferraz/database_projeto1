const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const client = require('./db/db');

const app = express();

let renderParam = { querySuccess: false,
                    errorMessage: '' };

//Create API functions
app.set('view engine', 'ejs');
app.use('/', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false })); // texto qualquer na área de input

app.get('/', (req, resp) => {
  renderParam = { querySuccess: false,
                  errorMessage: '' };
  resp.render('index', {renderParam});
})

app.post('/query', (req, resp) => {
  let queryStr = req.body.query;
  console.log(queryStr);
  
  // Callback for the database query
  client.query(queryStr, (err, result) => {
    if (err) {
      console.log(err.message);

      //Fill output object (for renderization of the page)
      renderParam = { querySuccess : false,
                      errorMessage : err.message };

      //Render page
      resp.render('index', {renderParam});

    } 
    else {
      //Extract keys from `result`
      let keyList = [];
      for (let key in result.rows[0]) {
        keyList.push(key);
      }
      //console.log(keyList);

      //Fill output object (for renderization of the page)
      renderParam = {   querySuccess : true,
                        rows : result.rows,
                        keyList : keyList };

      //Render page
      //console.log(renderParam);
      resp.render('index', {renderParam});
    }
  });
  
})

client.connect()
.then(() => {
    console.log('Established connection...');
    app.listen(3000, () => {
      console.log('Server running...');
  });
})
.catch(err =>{
    console.log(`Error while connecting to the database: ${err}.\nServer is NOT running...`)
});