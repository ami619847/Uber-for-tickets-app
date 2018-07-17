"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const db_1 = require("./db");
const controller_1 = require("./users/controller");
const controller_2 = require("./logins/controller");
const controller_3 = require("./events/controller");
const controller_4 = require("./tickets/controller");
const controller_5 = require("./comments/controller");
const app = routing_controllers_1.createKoaServer({
    controllers: [
        controller_1.default,
        controller_2.default,
        controller_3.default,
        controller_4.default,
        controller_5.default
    ]
});
db_1.default()
    .then(_ => app.listen(4000, () => console.log('Listening on port 4000')))
    .catch(err => console.error(err));
//# sourceMappingURL=index.js.map