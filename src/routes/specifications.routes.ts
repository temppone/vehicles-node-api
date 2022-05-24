import { Router } from "express";
import { SpecificationsRepository } from "../modules/cars/repositories/Implementations/SpecificationsRepository";
import { CreateSpecificationUseCase } from "../modules/cars/useCases/createSpecification/CreateSpecificationUseCase";

const specificationsRoutes = Router();
const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post("/", (request, response) => {});

export { specificationsRoutes };
