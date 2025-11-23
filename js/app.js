import { initStorage } from "./modules/initStorage.js";
import { getUnique, reset } from "./modules/uniqueProvider.js";
import { addPlayer, resetScores, resetPlayers, getPlayers, changeScore} from "./modules/playerManager.js";

const btn = document.getElementById("btnGame");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");

const btnAddPlayer = document.getElementById("btnAddPlayer");
const playerNameInput = document.getElementById("playerName");
const playersTableBody = document.getElementById("playersTableBody");

// Функция для рендеринга таблицы игроков
function renderPlayers() {
  const players = getPlayers();
  playersTableBody.innerHTML = "";

  players.forEach((p, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${p.name}</td>
      <td>${p.score}</td>
    `;
    tr.style.cursor = "pointer";

    // Нажатие на игрока — добавить балл
    tr.addEventListener("click", () => {
      changeScore(p.id, 1);
      renderPlayers();
    });

    playersTableBody.appendChild(tr);
  });
}

// Сброс очков всех игроков
document.getElementById("btnResetScores").addEventListener("click", () => {
  resetScores();
  renderPlayers();
});

// Удалить всех игроков
document.getElementById("btnClearPlayers").addEventListener("click", () => {
  if (confirm("Вы точно хотите удалить всех игроков?")) {
    resetPlayers();
    renderPlayers();
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  // Инициализация JSON вопросов
  await initStorage("./assets/data/data.json");

  // Кнопка игры
  btn.addEventListener("click", () => {
    const item = getUnique();
    if (!item) {
      questionEl.textContent = "Все фильмы уже показаны!";
      answerEl.textContent = "";
      answerEl.classList.remove("visible");
      return;
    }

    questionEl.textContent =item.question;
    answerEl.textContent = item.answer;
    answerEl.classList.remove("visible");
  });

  // Клик по ответу — раскрыть
  answerEl.addEventListener("click", () => {
    answerEl.classList.add("visible");
  });

  // Добавление игрока
  btnAddPlayer.addEventListener("click", (e) => {
    e.preventDefault();
    const name = playerNameInput.value.trim();
    if (!name) return;
    addPlayer(name);
    playerNameInput.value = "";
    renderPlayers();
  });

  // Изначальный рендер таблицы
  renderPlayers();
});

const btnResetMovies = document.getElementById("btnResetMovies");

btnResetMovies.addEventListener("click", () => {
  reset();
  questionEl.textContent = "";
  answerEl.textContent = "";
  answerEl.classList.remove("visible");
  alert("Фильмы сброшены! Можно начинать заново.");
});
