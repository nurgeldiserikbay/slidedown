import { ref } from 'vue'

export const audioList: { [key: string]: string } = {
  break: '/sounds/break-stone.mp3',
  click: '/sounds/click.mp3',
  falling: '/sounds/falling.mp3',
}

const audioActive = ref(true)
const musicActive = ref(true)

const music = new Audio('/sounds/music.mp3')
music.addEventListener('ended', function() {
  this.currentTime = 0
  this.play()
}, false)
music.volume = 0.5

export const useAudio = () => {
  function playAudio(audioType: string, anyway: boolean = false) {
    if (!anyway && (!audioActive.value || !audioList[audioType])) return

    if (audioList[audioType]) {
      const audio = new Audio(audioList[audioType])
      audio.play()
    }
  }

  function toggleAudio() {
    audioActive.value = !audioActive.value

    playAudio('break', true)
  }
  
  function toggleMusic() {
    musicActive.value = !musicActive.value

    if (musicActive.value) {
      music.play()
    } else {
      music.pause()
    }

    playAudio('break')
  }

  function play() {
    music.play()
  }

  return {
    play,
    audioActive,
    musicActive,
    toggleAudio,
    toggleMusic,
    playAudio
  }
}
