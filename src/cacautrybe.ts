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
  return cacauTrybe.chocolates.find(
    (chocolate: Chocolate) => chocolate.id === id
  );
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

const getChocolatesByName = async (name: string) => {
  const cacauTrybe = await readCacauTrybeFile();
  return cacauTrybe.chocolates.filter(
    (chocolate: Chocolate) => chocolate.name.includes(name)
  );
};

const updateChocolate = async (id: number, name: string, brandId: number) => {
  const cacauTrybe = await readCacauTrybeFile();
  const chocolateIndex = cacauTrybe.chocolates.findIndex(
    (chocolate: Chocolate) => chocolate.id === id
  );
  if(chocolateIndex === -1) return false;
  cacauTrybe.chocolates[chocolateIndex] = { id, name, brandId };
  await fs.writeFile(
    join(__dirname, "/files/cacauTrybeFile.json"),
    JSON.stringify(cacauTrybe)
  );
  return cacauTrybe.chocolates[chocolateIndex];
};

export default {
  getAllChocolates,
  getChocolateById,
  getChocolatesByBrand,
  getTotalQuantityOfChocolates,
  getChocolatesByName,
  updateChocolate
};
