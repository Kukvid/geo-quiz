<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div
      class="card shadow-lg border-0 bg-light text-dark m-3"
      style="max-width: 800px; border-radius: 20px"
    >
      <div class="card-body p-5">
        <h1 class="mb-4 text-center fw-bold text-primary">📜 Правила игры</h1>

        <p class="lead text-center">
          Добро пожаловать в <strong>географический квиз</strong>! Это увлекательная игра, в которой
          ты можешь проверить и улучшить свои знания о странах, столицах и флагах мира. 🗺🌍
        </p>

        <hr class="my-4" />

        <h3 class="fw-bold text-success">🎯 Как играть?</h3>
        <ul class="list-group list-group-flush mb-4 text-start">
          <li class="list-group-item">
            🟢 <strong>В каждом раунде — 5 вопросов</strong>. Ответь на как можно больше из них!
          </li>
          <li class="list-group-item">
            ⏳ У тебя <strong>10 секунд</strong> на каждый вопрос — не теряй время!
          </li>
          <li class="list-group-item">✅ <strong>Правильный ответ</strong> даёт тебе 1 балл.</li>
          <li class="list-group-item">
            ❌ Если не ответил вовремя — <strong>теряешь шанс на балл</strong>.
          </li>
          <li class="list-group-item">
            🏆 <strong>Статистика сохраняется</strong>: ты можешь увидеть свой лучший результат!
          </li>
        </ul>

        <hr class="my-4" />

        <h3 class="fw-bold text-info">🌍 Режимы игры</h3>

        <div class="accordion" id="gameModes">
          <!-- 🏳 Режим "Флаги стран" -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingFlags">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flags"
              >
                🏳 Викторина по флагам
              </button>
            </h2>
            <div id="flags" class="accordion-collapse collapse show" data-bs-parent="#gameModes">
              <div class="accordion-body">
                В этом режиме тебе будут показаны <strong>изображения флагов разных стран</strong>.
                Твоя задача — выбрать правильное название страны среди предложенных вариантов.
                Отлично подходит для изучения символики государств! 🌎
              </div>
            </div>
          </div>

          <!-- 🏙 Режим "Столицы стран" -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingCapitals">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#capitals"
              >
                🏙 Викторина по столицам
              </button>
            </h2>
            <div id="capitals" class="accordion-collapse collapse" data-bs-parent="#gameModes">
              <div class="accordion-body">
                В этом режиме тебе будет предложено название страны, и ты должен выбрать её
                <strong>столицу</strong>. Отличный способ освежить свои знания в географии! 📍
              </div>
            </div>
          </div>

          <!-- 🗺 Режим "Карта стран" -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingMaps">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#maps"
              >
                🗺 Викторина по картам
              </button>
            </h2>
            <div id="maps" class="accordion-collapse collapse" data-bs-parent="#gameModes">
              <div class="accordion-body">
                В этом режиме на карте будет отмечена <strong>случайная точка</strong>, а ты должен
                определить, какая это страна. Идеально для тех, кто хочет лучше ориентироваться в
                расположении государств! 📌
              </div>
            </div>
          </div>
        </div>

        <hr class="my-4" />

        <h3 class="fw-bold text-warning">✨ Полезные советы</h3>
        <ul class="list-group list-group-flush mb-4">
          <li class="list-group-item">📚 Если сомневаешься — подумай логически!</li>
          <li class="list-group-item">⏰ Успей выбрать ответ до истечения времени!</li>
          <li class="list-group-item">🏅 Повторяй тесты, чтобы улучшить свои результаты!</li>
        </ul>

        <div class="text-center mt-4">
          <button class="btn btn-primary btn-lg w-100" @click="$router.push('/')">
            🏠 Вернуться на главную
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Фон всей страницы */
body {
  background-image: url('https://www.transparenttextures.com/patterns/asfalt-dark.png');
  background-size: cover;
}

/* Стили для карточки */
.card {
  border-radius: 15px;
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: scale(1.02);
}

/* Улучшенный список правил */
.list-group-item {
  font-size: 18px;
  background: rgba(255, 255, 255, 0.8);
}

/* Стили для кнопок */
.btn {
  font-size: 18px;
  padding: 12px;
}

/* Анимация для аккордеона */
.accordion-button {
  font-size: 18px;
  font-weight: bold;
}

.accordion-body {
  font-size: 16px;
}
</style>
