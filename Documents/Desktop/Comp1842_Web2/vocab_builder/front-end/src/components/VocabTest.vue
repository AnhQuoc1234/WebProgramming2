<template>
  <div>
    <h2>Score: {{ score }} out of {{ words.length }}</h2>

    <form action="#" @submit.prevent="onSubmit">
      <!-- German  -->
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="germany flag"></i> German
        </div>
        <input type="text" readonly :disabled="testOver" :value="currWord?.german || ''" />
      </div>

      <!-- Vietnamese  -->
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="vietnam flag"></i> Vietnamese
        </div>
        <input type="text" readonly :disabled="testOver" :value="currWord?.vietnamese || ''" />
      </div>

      <!-- English Answer Input -->
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="united kingdom flag"></i> English
        </div>
        <input
          type="text"
          placeholder="Enter English word"
          v-model="englishInput"
          :disabled="testOver"
          autocomplete="off"
        />
      </div>

      <!-- Submit Button -->
      <button class="positive ui button" :disabled="testOver || !currWord">Submit</button>
    </form>

    <!-- Feedback Box -->
    <div class="feedback-box" v-if="feedback">
      <p>{{ feedback }}</p>
    </div>

    <!-- Results Display -->
    <p v-if="testOver" :class="['results', resultClass]">
      <span v-html="result"></span>
    </p>
  </div>
</template>

<script>
export default {
  name: "vocab-test",
  props: {
    words: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      randWords: [...this.words.sort(() => 0.5 - Math.random())], // Random words
      incorrectGuesses: [],
      result: "",
      resultClass: "",
      feedback: "", 
      englishInput: "",
      score: 0,
      testOver: false
    };
  },
  computed: {
    currWord() {
      return this.randWords.length ? this.randWords[0] : null; // Current word to test
    }
  },
  methods: {
    onSubmit() {
      if (!this.currWord) return;

      // Correct answer
      if (this.englishInput.trim().toLowerCase() === this.currWord.english.trim().toLowerCase()) {
        this.score++;
        this.feedback = "Great Job!";
      } else {
        this.incorrectGuesses.push(
          `${this.currWord.german} (${this.currWord.vietnamese})`
        );
        this.feedback = `Oh no, you're wrong! The correct answer is "${this.currWord.english}".`;
      }

      // Clear input and move to the next word
      this.englishInput = "";
      this.randWords.shift();

      // Check if the test is over
      if (!this.randWords.length) {
        this.testOver = true;
        this.displayResults();
      }
    },
    displayResults() {
      const total = this.words.length;
      const incorrectCount = this.incorrectGuesses.length;
      const correctCount = total - incorrectCount;

      if (incorrectCount === 0) {
        this.result = `<strong>Well done!</strong> You got all ${total} words correct!`;
        this.resultClass = "success";
      } else {
        const incorrect = this.incorrectGuesses.join(", ");
        this.result = `
          <strong>Test Completed!</strong><br>
          Correct: ${correctCount} / ${total}<br>
          Incorrect: ${incorrectCount} / ${total}<br>
          <strong>Error Word:</strong> ${incorrect}
        `;
        this.resultClass = "error";
      }
    }
  }
};
</script>

<style scoped>
.results {
  margin: 25px auto;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
}

.error {
  border: 1px solid #ebccd1;
  color: #a94442;
  background-color: #f2dede;
}

.success {
  border: 1px solid #d6e9c6;
  color: #3c763d;
  background-color: #dff0d8;
}

.feedback-box {
  margin: 15px 0;
  padding: 10px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  background-color: #f9f9f9;
  font-size: 16px;
  color: #333333;
}
</style>