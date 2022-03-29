"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteActor = exports.updateActor = exports.insertActor = exports.getActorById = exports.getActors = void 0;
const db_1 = require("./db");
const getActors = async () => {
    const response = await (0, db_1.query)('SELECT * FROM actor LIMIT 100');
    return response.rows;
};
exports.getActors = getActors;
const getActorById = async (actorId) => {
    const response = await (0, db_1.query)('SELECT * FROM actor WHERE actor_id = $1', [actorId]);
    return response.rows.length ? response.rows[0] : null;
};
exports.getActorById = getActorById;
const insertActor = async (actor) => {
    const createdActor = await (0, db_1.query)('INSERT INTO actor(first_name, last_name, last_update) VALUES($1, $2, current_timestamp) RETURNING *', [actor.firstname, actor.lastname]);
    return createdActor.rows[0];
};
exports.insertActor = insertActor;
const updateActor = async (actorId, actor) => {
    await (0, db_1.query)('UPDATE actor SET first_name=$1, last_name=$2, last_update=current_timestamp WHERE actor_id=$3 RETURNING *', [actor.firstname, actor.lastname, actorId]);
    return await (0, exports.getActorById)(actorId);
};
exports.updateActor = updateActor;
const deleteActor = async (actorId) => {
    return await (0, db_1.query)('DELETE FROM actor WHERE actor_id=$1', [actorId]);
};
exports.deleteActor = deleteActor;
