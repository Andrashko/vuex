import express from "express";
import bookControler from "./controler";

const bookRouter = new express.Router();

bookRouter.get("/", bookControler.get);
bookRouter.get("/:id", bookControler.getById);
bookRouter.post("/", bookControler.post);
bookRouter.delete("/:id", bookControler.delete);
bookRouter.patch("/:id", bookControler.patch);

export default bookRouter;