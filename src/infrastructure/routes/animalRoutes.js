import { Router } from "express";

export default function animalRoutes(controller) {
  const router = Router();

  router.post  ("/",      (req, res) => controller.create(req, res));
  router.get   ("/",      (req, res) => controller.getAll(req, res));


  return router;
}
