import express from 'express';
import * as noteController from '../controllers/note.controller';
import { newnoteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { redisCheck, redisCheckOne } from '../middlewares/redis.middleware';

const router = express.Router();



//route to get all notes of Single user
router.get('/all', userAuth,redisCheck,noteController.getallnote);

//route to create a new note
router.post('/add', userAuth,newnoteValidator, noteController.createnote);

//route to get a single note by their note id
router.get('/:_id', userAuth,redisCheckOne, noteController.getnote);

//route to update a single note by their note id
router.put('/:_id',userAuth,newnoteValidator, noteController.updatenote);

//route to delete a single note by their note id
router.delete('/:_id',userAuth, noteController.deletenote);

//route to archive & unarchive note by their note id
router.put('/:_id/archive',userAuth, noteController.archivenote);

//route to trash & untrash note by their note id
router.put('/:_id/trash',userAuth, noteController.trashnote);

export default router;
