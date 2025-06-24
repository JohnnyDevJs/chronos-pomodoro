import gravitationalBeep from '@/assets/sounds/gravitational_beep.mp3'

export function loadBeep() {
  const sound = new Audio(gravitationalBeep)
  sound.load()

  return () => {
    sound.currentTime = 0
    sound.play()
  }
}
