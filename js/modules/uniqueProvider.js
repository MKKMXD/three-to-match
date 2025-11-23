const KEY_ITEMS = "up_items";
const KEY_USED  = "up_used";

function getState() {
  const items = JSON.parse(localStorage.getItem(KEY_ITEMS) || "[]");
  const used  = JSON.parse(localStorage.getItem(KEY_USED) || "[]"); // массив индексов
  return { items, used };
}

function saveState(items, used) {
  localStorage.setItem(KEY_ITEMS, JSON.stringify(items));
  localStorage.setItem(KEY_USED, JSON.stringify(used));
}

/**
 * Возвращает уникальный элемент по индексу
 */
export function getUnique() {
  const { items, used } = getState();

  const availableIndexes = items.map((_, i) => i).filter(i => !used.includes(i));
  if (availableIndexes.length === 0) return null;

  // Выбираем случайный индекс
  const idx = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
  used.push(idx);

  saveState(items, used);
  return items[idx];
}

/**
 * Сброс использованных элементов
 */
export function reset() {
  const { items } = getState();
  saveState(items, []);
}
