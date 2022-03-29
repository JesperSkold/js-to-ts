"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const actor_1 = require("../db/actor");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    const actors = await (0, actor_1.getActors)();
    res.json(actors);
});
router.get('/:actorId', (0, express_validator_1.param)('actorId').isInt(), async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.params.actorId, "FOOBAR");
    const id = Number(req.params.actorId);
    const actor = await (0, actor_1.getActorById)(id);
    if (!actor) {
        res.status(404).send();
    }
    else {
        res.json(actor);
    }
});
router.post('/', (0, express_validator_1.body)('firstname').isString(), (0, express_validator_1.body)('lastname').isString(), async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const actor = req.body; //object type??
    const createdActor = await (0, actor_1.insertActor)(actor);
    if (!createdActor) {
        res.status(500).send();
    }
    else {
        res.json(createdActor);
    }
});
router.put('/:actorId', (0, express_validator_1.param)('actorId').isInt(), (0, express_validator_1.body)('firstname').isString(), (0, express_validator_1.body)('lastname').isString(), async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const actor = req.body;
    const updatedActor = await (0, actor_1.updateActor)(req.params.actorId, actor);
    if (!updatedActor) {
        res.status(500).send();
    }
    else {
        res.json(updatedActor);
    }
});
router.delete('/:actorId', (0, express_validator_1.param)('actorId').isInt(), async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const id = Number(req.params.actorId);
    const actor = (0, actor_1.getActorById)(id);
    if (!actor) {
        res.status(404).send();
    }
    else {
        (0, actor_1.deleteActor)(id);
        res.status(202).send();
    }
});
exports.default = router;
