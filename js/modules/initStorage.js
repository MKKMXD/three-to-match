// /js/modules/initStorage.js

const KEY_ITEMS = "up_items";

/**
 * Инициализация хранилища из JSON-файла
 * Если данные уже есть — не перезаписывает
 */
export async function initStorage(jsonUrl) {
  const existing = localStorage.getItem(KEY_ITEMS);

  // Если данные уже есть — ничего не делаем
  if (existing) {
    console.log("Storage уже инициализировано");
    //return JSON.parse(existing);
  }

  // Загружаем JSON-файл
  const response = await fetch(jsonUrl);
  if (!response.ok) {
    throw new Error("Ошибка загрузки JSON-файла: " + jsonUrl);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("JSON должен содержать массив");
  }

  // Инициализируем хранилище
  localStorage.setItem(KEY_ITEMS, JSON.stringify(data));
  localStorage.setItem("up_used", JSON.stringify([]));

  console.log("Storage успешно инициализировано");

  return data;
}
