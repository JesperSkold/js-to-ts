import express, {Request, Response} from 'express';
import { getActorById, getActors, insertActor, updateActor, deleteActor, IActor } from '../db/actor';
import { param, body, validationResult } from 'express-validator';

const router = express.Router();

router.get('/', async (req, res) => {
    const actors = await getActors();
    res.json(actors);
})

router.get(
    '/:actorId',
    param('actorId').isInt(),
    async (req:Request, res:Response) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // console.log(req.params.actorId, "FOOBAR");
        
        const id = Number(req.params.actorId)
        const actor = await getActorById(id)
        if (!actor) {
            res.status(404).send();
        } else {
            res.json(actor);
        }
    })

router.post(
    '/',
    body('firstname').isString(),
    body('lastname').isString(),
    async (req:Request, res:Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
       
        const actor:IActor = req.body; //object type??
        const createdActor = await insertActor(actor);

        if (!createdActor) {
            res.status(500).send();
        } else {
            res.json(createdActor);
        }
    }
)

router.put(
    '/:actorId',
    param('actorId').isInt(),
    body('firstname').isString(),
    body('lastname').isString(),
    async (req:Request, res:Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const actor = req.body;
        const id = Number(req.params.actorId)
        const updatedActor = await updateActor(id, actor);

        if (!updatedActor) {
            res.status(500).send();
        } else {
            res.json(updatedActor);
        }
    }
)

router.delete(
    '/:actorId',
    param('actorId').isInt(),
    async (req:Request, res:Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id = Number(req.params.actorId)
        const actor = getActorById(id);

        if (!actor) {
            res.status(404).send();
        } else {
            deleteActor(id);
            res.status(202).send();
        }
    }
)


export default router;