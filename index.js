const express = require('express');
var cors = require('cors')
require('./db_connection/mongodb');
//////////////////////////////////////////////////////////////////////////
const app = express();
app.use(cors())
app.use(express.static('public'));
app.use(express.json());
//////////////////////////////////////////////////////////////////////////
app.listen(process.env.PORT || 3000, () => {
    console.info(`server listening on port 3000`);
}); 