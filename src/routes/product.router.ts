import { Router } from "express";
import authHandler from "../middleware/authHandler.middleware";

const router: Router = Router();

// get all the products
router.get("/", (req, res) => {});

// get product from its id
router.get("/", (req, res) => {});

// edit the product that have this id (admin only)
router.post("/edit/:id", authHandler("private"), (req, res) => {});

// add the product that have this id (admin only)
router.get("/add/:id", authHandler("private"), (req, res) => {});

// delete the product that have this id (admin only)
router.get("/delete/:id", authHandler("private"), (req, res) => {});

export default router;
