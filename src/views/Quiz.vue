<template>
  <div class="container">
    <div class="card shadow-lg">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
          <h2>Вопрос {{ currentQuestionIndex + 1 }} / {{ questions.length }}</h2>
          <button @click="toggleSound" class="btn btn-outline-secondary">
            {{ soundEnabled ? '🔊 Звук вкл.' : '🔇 Звук выкл.' }}
          </button>
        </div>

        <p>{{ currentQuestion.question }}</p>

        <!-- Прогресс-бар таймера -->
        <div class="progress">
          <div
            class="progress-bar bg-success"
            role="progressbar"
            :style="{ width: progressBarWidth }"
          ></div>
        </div>

        <div v-if="quizType === 'flags'" class="text-center my-3">
          <img :src="currentQuestion.image" class="img-fluid border rounded shadow" />
        </div>

        <div v-if="quizType === 'maps'" class="map-container">
          <div id="map" class="map"></div>
        </div>

        <div class="list-group my-3">
          <button
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            @click="checkAnswer(option)"
            :class="[
              'list-group-item list-group-item-action',
              {
                'bg-success text-white': option === correctAnswer && isAnswered,
                'bg-danger text-white': option !== correctAnswer && isAnswered,
              },
            ]"
          >
            {{ option }}
          </button>
        </div>

        <p class="text-muted">
          Оставшееся время: <span>{{ timer }}</span> сек.
        </p>

        <div class="d-flex justify-content-center">
          <button class="btn btn-warning mx-2 mb-3" @click="restartQuiz">🔄 Начать заново</button>
          <button class="btn btn-danger mx-2 mb-3" @click="exitQuiz">🚪 Выйти из квиза</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { questions } from '../data/questions'
import L from 'leaflet'

export default {
  data() {
    return {
      quizType: this.$route.params.type,
      questions: [],
      currentQuestionIndex: 0,
      timer: 10,
      score: 0,
      interval: null,
      isAnswered: false,
      showQuestion: true,
      soundEnabled: JSON.parse(localStorage.getItem('soundEnabled')) ?? true,
    }
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex] || {}
    },
    correctAnswer() {
      return this.currentQuestion.correct || ''
    },
    progressBarWidth() {
      return (this.timer / 10) * 100 + '%'
    },
  },
  methods: {
    toggleSound() {
      this.soundEnabled = !this.soundEnabled
      localStorage.setItem('soundEnabled', JSON.stringify(this.soundEnabled))
    },
    startTimer() {
      this.interval = setInterval(() => {
        if (this.timer > 0) {
          this.timer--
        } else {
          this.nextQuestion(false)
        }
      }, 1000)
    },
    checkAnswer(selectedOption) {
      if (!this.isAnswered) {
        this.isAnswered = true
        if (selectedOption === this.correctAnswer) {
          this.score++
          this.playSound('correct')
        } else {
          this.playSound('wrong')
        }
        setTimeout(() => this.nextQuestion(), 1000)
      }
    },
    setupMap() {
      setTimeout(() => {
        if (!this.currentQuestion.coords) return

        const mapElement = document.getElementById('map')
        if (!mapElement) return

        if (this.map) {
          this.map.remove()
        }

        this.map = L.map('map', { scrollWheelZoom: false }).setView(this.currentQuestion.coords, 5)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map)
        L.marker(this.currentQuestion.coords).addTo(this.map)

        setTimeout(() => {
          this.map.invalidateSize()
        }, 500)
      }, 500)
    },
    playSound(type) {
      if (!this.soundEnabled) return
      const sounds = {
        correct: 'https://www.myinstants.com/media/sounds/correct.mp3',
        wrong: 'https://www.myinstants.com/media/sounds/wrong.mp3',
      }
      new Audio(sounds[type]).play()
    },
    restartQuiz() {
      this.currentQuestionIndex = 0
      this.timer = 10
      this.score = 0
      this.isAnswered = false
      this.showQuestion = true
      this.startTimer()
    },
    exitQuiz() {
      clearInterval(this.interval) // Останавливаем таймер
      this.$router.push('/')
    },
    nextQuestion(userAnswered = true) {
      clearInterval(this.interval)
      this.isAnswered = false
      this.showQuestion = false

      setTimeout(
        () => {
          if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++
            this.timer = 10
            this.startTimer()
            this.showQuestion = true
            if (this.quizType === 'maps') this.setupMap()
          } else {
            console.log('Конец викторины! Переход на страницу результатов...')
            this.$router.push({
              path: '/results',
              query: {
                score: this.score,
                total: this.questions.length,
                type: this.quizType, // Добавляем quizType в URL
              },
            })
          }
        },
        userAnswered ? 500 : 0,
      )
    },
    shuffle(array) {
      return array.sort(() => Math.random() - 0.5)
    },
  },
  created() {
    if (questions[this.quizType] && questions[this.quizType].length >= 5) {
      this.questions = this.shuffle([...questions[this.quizType]]).slice(0, 5)
      console.log('Загружены вопросы:', this.questions)
    } else {
      console.error('Ошибка: недостаточно вопросов в категории', this.quizType)
      this.questions = [] // Чтобы не было ошибки
    }
    this.startTimer()
  },
}
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 300px;
  max-width: 500px;
  margin: auto;
}

.map {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
}
</style>
