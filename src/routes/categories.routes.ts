import { Request, Router } from "express";
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategory";
import multer from "multer";

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
        const { file } = request;

        console.log(file);
        response.send();
    }
);

export { categoriesRoutes };
