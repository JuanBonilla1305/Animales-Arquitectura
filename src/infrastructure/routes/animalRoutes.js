import { Router } from "express";

export default function animalRoutes(controller) {
  const router = Router();

  router.post  ("/animals",      (req, res) => controller.create(req, res));
  router.get   ("/animals",      (req, res) => controller.getAll(req, res));


  return router;
}
