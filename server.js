(function() {
    "use strict";

    var port = process.env.PORT || 5000;

    var express = require('express');
    var proxy = require("webProxy");

    var app = express();

    console.log(__dirname);
    console.log(proxy);

    app.use(express.static(__dirname));

    proxy(app);

    app.listen(port);
})();