import { promises as fs } from "fs";
import { join } from "path";

interface Chocolate {
    id: number;
    name: string;
    brandId: number;
}
    
const readCacauTrybeFile = async () => {
  const path = "/files/cacauTrybeFile.json";
  try {
    const contentFile = await fs.readFile(join(__dirname, path), "utf-8");
    return JSON.parse(contentFile);
  } catch (error) {
    return null;
  }
};

const getAllChocolates = async () => {
  const cacauTrybe = await readCacauTrybeFile();
  return cacauTrybe.chocolates;
};

const getChocolateById = async (id: number) => {
  const cacauTrybe = await readCacauTrybeFile();
  return cacauTrybe.chocolates.find((chocolate: Chocolate) => chocolate.id === id);
};

const getChocolatesByBrand = async (brandId: number) => {
  const cacauTrybe = await readCacauTrybeFile();
  return cacauTrybe.chocolates.filter(
    (chocolate: Chocolate) => chocolate.brandId === brandId
  );
};

const getTotalQuantityOfChocolates = async () => {
    const cacauTrybe = await readCacauTrybeFile();
    return cacauTrybe.chocolates.length;
};

export default {
  getAllChocolates,
  getChocolateById,
  getChocolatesByBrand,
  getTotalQuantityOfChocolates,
};
