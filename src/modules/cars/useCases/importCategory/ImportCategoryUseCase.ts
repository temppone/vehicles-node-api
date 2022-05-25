import fs from "fs";
import { parse as csvParse } from "csv-parse";
import { CategoriesRepository } from "../../repositories/Implementations/CategoriesRepository";

interface IImportCategory {
    name: string;
    description: string;
}
class ImportCategoryUseCase {
    constructor(private categoriesRepository: CategoriesRepository) {}

    loadCateogries(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resole, reject) => {
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];
            const parseFile = csvParse();

            stream.pipe(parseFile);

            parseFile
                .on("data", async (line) => {
                    const [name, description] = line;
                    categories.push({
                        name,
                        description,
                    });
                })
                .on("end", () => {
                    resole(categories);
                })
                .on("erro", (err) => {
                    reject(err);
                });
        });
    }
    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCateogries(file);

        categories.map((category) => {
            const { name, description } = category;

            const existCategory = this.categoriesRepository.findByName(name);

            if (!existCategory) {
                this.categoriesRepository.create({
                    name,
                    description,
                });
            }
        });
    }
}

export { ImportCategoryUseCase };
