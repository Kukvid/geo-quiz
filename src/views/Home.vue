<template>
  <div class="container text-center">
    <div class="card shadow-lg">
      <div class="card-body">
        <h1 class="mb-4">🌍 Географический Квиз</h1>
        <p>Проверь свои знания о странах, флагах и столицах!</p>

        <div class="row">
          <div class="col-md-6">
            <button class="btn btn-primary btn-lg my-2 w-100" @click="startQuiz('flags')">
              🏳️ Викторина по флагам
            </button>
          </div>
          <div class="col-md-6">
            <button class="btn btn-primary btn-lg my-2 w-100" @click="startQuiz('capitals')">
              🏙 Викторина по столицам
            </button>
          </div>
          <div class="col-md-6">
            <button class="btn btn-primary btn-lg my-2 w-100" @click="startQuiz('maps')">
              🗺 Викторина по картам
            </button>
          </div>
          <div class="col-md-6">
            <button class="btn btn-info btn-lg my-2 w-100" @click="$router.push('/rules')">
              📜 Правила игры
            </button>
          </div>
        </div>
        <p>Этот проект помогает людям проверить свои знания о географии.</p>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    startQuiz(type) {
      this.$router.push(`/quiz/${type}`)
    },
  },
}
</script>
