import { Request, Router } from "express";
import multer from "multer";
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import { ImportCategoryController } from "../modules/cars/useCases/importCategory/ImportCategoryController";
import { listCategoriesController } from "../modules/cars/useCases/listCategory";

interface IMulterRequest extends Request {
    file: any;
}

const categoriesRoutes = Router();
const upload = multer({ dest: "./tmp" });

categoriesRoutes.post("/", (request, response) => {
    createCategoryController.handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
    listCategoriesController.handle(request, response);
});

categoriesRoutes.post(
    "/import",
    upload.single("file"),
    (request: IMulterRequest, response) => {
        return importCategoryController.handle(request, response);
    }
);

export { categoriesRoutes };
