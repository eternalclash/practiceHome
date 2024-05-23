<template>
  <div class="video-background">
    <video autoplay loop muted playsinline>
      <source src="@/assets/popup.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div class="typing-text">
      <div ref="typingText" class="typing-text-first"></div>
      <div ref="typingText2" class="typing-text-second"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const typingText = ref(null)
const typingText2 = ref(null)
const typingtext = '모두를 위한 부동산' // 타이핑할 텍스트
const typingtext2 = 'SSABANG'
const typingDelay = 200 // 한 글자씩 타이핑되는 딜레이(ms)

function typeNextChar(textElement, text, charIndex) {
  if (charIndex < text.length) {
    textElement.textContent += text.charAt(charIndex)
    setTimeout(() => typeNextChar(textElement, text, charIndex + 1), typingDelay)
  }
}

function typeNextChar2(textElement2, text2, charIndex2) {
  if (charIndex2 < text2.length) {
    textElement2.textContent += text2.charAt(charIndex2)
    setTimeout(() => typeNextChar2(textElement2, text2, charIndex2 + 1), typingDelay)
  } else {
    setTimeout(() => {
      textElement2.textContent = text2
      window.location.replace(`/`)
    }, 1000)
  }
}

onMounted(async () => {
  setTimeout(() => {}, 4000)
  setTimeout(() => typeNextChar(typingText.value, typingtext, 0), 3500)
  setTimeout(() => typeNextChar2(typingText2.value, typingtext2, 0), 7000)
})
</script>

<style scoped>
.video-background {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.video-background video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  z-index: -1;
}

.typing-text {
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 30%;
  z-index: 2; /* Ensure text is visible on top of the video */
}

.typing-text-first,
.typing-text-second {
  font-size: 4rem;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.7); /* Improves readability over video */
}

.typing-text-first {
  color: white;
}

.typing-text-second {
  color: #38b6ff;
}
</style>
