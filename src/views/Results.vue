<template>
  <div class="container text-center">
    <div class="card shadow-lg">
      <div class="card-body">
        <h1 class="mb-4">📊 Результаты</h1>
        <p class="lead">
          Ваш счет: <strong>{{ score }}</strong> из <strong>{{ totalQuestions }}</strong>
        </p>

        <!-- Кнопка для графика -->
        <button class="btn btn-info mx-2 mt-3" @click="showChart = !showChart">
          {{ showChart ? '📉 Скрыть график' : '📈 Показать график' }}
        </button>

        <div v-if="showChart && history[this.quizType] && history[this.quizType].length > 0">
            <h3 class="mt-4">📊 График результатов</h3>
            <LineChart v-if="chartData" :chart-data="chartData" :chart-options="chartOptions" />
          </div>
          

        <!-- Аккордеон для истории попыток -->
        <h3 class="mt-4">📜 История попыток</h3>
        <div class="accordion" id="historyAccordion">
          <div v-for="(attempts, type) in groupedHistory" :key="type" class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="'#history-' + type"
              >
                {{ quizTypeNames[type] || 'Неизвестный режим' }}
              </button>
            </h2>
            <div :id="'history-' + type" class="accordion-collapse collapse">
              <div class="accordion-body">
                <ul class="list-group">
                  <li v-for="(attempt, index) in attempts" :key="index" class="list-group-item">
                    {{ attempt.date }} – <strong>{{ attempt.score }}</strong> / {{ attempt.total }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <p>
          🏆 Лучший результат:
          <strong>{{ bestScore }}</strong> из {{ totalQuestions }}
        </p>
        <p>
          📈 Средний балл:
          <strong>{{ averageScore.toFixed(2) }}</strong> из {{ totalQuestions }}
        </p>

        <div class="d-flex justify-content-center mt-4">
          <button class="btn btn-primary mx-2" @click="$router.push('/')">🏠 На главную</button>
          <button class="btn btn-success mx-2" @click="shareResult">📤 Поделиться</button>
          <button
            v-if="Object.keys(history).length > 0"
            class="btn btn-danger mx-2"
            @click="clearHistory"
          >
            🗑 Очистить историю
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

export default defineComponent({
  components: {
    LineChart: Line,
  },
  data() {
    return {
      score: Number(this.$route.query.score) || 0,
      totalQuestions: Number(this.$route.query.total) || 0,
      quizType: this.$route.query.type || 'unknown',
      history: JSON.parse(localStorage.getItem('quizHistory')) || {},
      quizTypeNames: {
        flags: '🏳 Викторина по флагам',
        capitals: '🏙 Викторина по столицам',
        maps: '🗺 Викторина по картам',
      },
      showChart: false,
    }
  },
  computed: {
    groupedHistory() {
      return Object.keys(this.history).reduce((acc, key) => {
        acc[String(key)] = this.history[key]
        return acc
      }, {})
    },
    bestScore() {
      const scores = (this.history[this.quizType] || []).map((h) => h.score)
      return scores.length ? Math.max(...scores) : 0
    },
    averageScore() {
      const scores = (this.history[this.quizType] || []).map((h) => h.score)
      return scores.length ? scores.reduce((acc, val) => acc + val, 0) / scores.length : 0
    },
    chartData() {
      if (
        !this.history ||
        !this.history[this.quizType] ||
        this.history[this.quizType].length === 0
      ) {
        console.warn('⚠ График: Нет данных, возвращаем пустой объект.')
        return {
          labels: ['Нет данных'],
          datasets: [
            {
              label: 'Результаты',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              data: [0], // Чтобы не ломался график
              fill: true,
            },
          ],
        }
      }

      return {
        labels: this.history[this.quizType].map((h) => h.date || 'Без даты'),
        datasets: [
          {
            label: 'Результаты',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            data: this.history[this.quizType].map((h) => h.score || 0),
            fill: true,
          },
        ],
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
      }
    },
  },
  methods: {
    saveResult() {
      if (!this.quizType || this.quizType === 'unknown') {
        console.error('Ошибка: quizType не определен. Сохранение невозможно.')
        return
      }

      console.log(`Сохранение результата для quizType: ${this.quizType}`)

      const attempt = {
        date: new Date().toLocaleString(),
        score: this.score || 0,
        total: this.totalQuestions || 5,
      }

      let savedHistory = JSON.parse(localStorage.getItem('quizHistory')) || {}
      if (!savedHistory[this.quizType]) savedHistory[this.quizType] = []

      savedHistory[this.quizType].push(attempt)
      localStorage.setItem('quizHistory', JSON.stringify(savedHistory))

      this.history = JSON.parse(localStorage.getItem('quizHistory')) || {}
      console.log('История сохранена:', this.history)
    },
    clearHistory() {
      if (!this.quizType || this.quizType === 'unknown') return

      let savedHistory = JSON.parse(localStorage.getItem('quizHistory')) || {}
      delete savedHistory[this.quizType]
      localStorage.setItem('quizHistory', JSON.stringify(savedHistory))

      this.history = JSON.parse(localStorage.getItem('quizHistory')) || {}
      console.log('История очищена:', this.history)
    },
  },
  created() {
    if (!this.$route.query.type) {
      console.error('Ошибка: quizType не передан в URL. Используем сохраненный тип.')
      const savedHistory = JSON.parse(localStorage.getItem('quizHistory')) || {}
      if (Object.keys(savedHistory).length > 0) {
        this.quizType = Object.keys(savedHistory)[0]
        console.log('Используем сохраненный quizType:', this.quizType)
      } else {
        console.error("Нет сохраненной истории, quizType остается 'unknown'.")
      }
    }

    this.saveResult()
  },
})
</script>
