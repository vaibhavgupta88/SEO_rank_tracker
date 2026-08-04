import express from "express";
import auth from "../middleware/auth.js"
import { addKeyword, getKeywords, getKeyword, refreshKeyword, toggleKeywordTracking, deleteKeyword } from "../controllers/rankController.js";

const rankRouter = express.Router();

rankRouter.post('/add', auth, addKeyword);
rankRouter.get('/list', auth, getKeywords); // ✅ Fixed here
rankRouter.get('/:id', auth, getKeyword);
rankRouter.post('/:id/refresh', auth, refreshKeyword);
rankRouter.put('/:id/toggle', auth, toggleKeywordTracking);
rankRouter.delete('/:id', auth, deleteKeyword);

export default rankRouter;