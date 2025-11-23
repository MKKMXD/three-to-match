const KEY_PLAYERS = "players";

/** Получить массив игроков */
function getState() {
  return JSON.parse(localStorage.getItem(KEY_PLAYERS) || "[]");
}

/** Сохранить массив игроков */
function saveState(players) {
  localStorage.setItem(KEY_PLAYERS, JSON.stringify(players));
}

/** Добавить игрока */
export function addPlayer(name) {
  const players = getState();
  const newPlayer = {
    id: Date.now(),
    name,
    score: 0
  };
  players.push(newPlayer);
  saveState(players);
  return newPlayer;
}

/** Удалить игрока по id */
export function removePlayer(id) {
  let players = getState();
  players = players.filter(p => p.id !== id);
  saveState(players);
}

/** Изменить очки игрока (+/-) */
export function changeScore(id, delta = 1) {
  const players = getState();
  const player = players.find(p => p.id === id);
  if (!player) return null;
  player.score += delta;
  saveState(players);
  return player;
}

/** Изменить имя игрока */
export function editPlayer(id, newName) {
  const players = getState();
  const player = players.find(p => p.id === id);
  if (!player) return null;
  player.name = newName;
  saveState(players);
  return player;
}

/** Получить всех игроков */
export function getPlayers() {
  return getState();
}

/** Сброс всех игроков */
export function resetPlayers() {
  saveState([]);
}

/** Сброс очков всех игроков на 0 */
export function resetScores() {
  const players = getState().map(p => ({ ...p, score: 0 }));
  saveState(players);
}
