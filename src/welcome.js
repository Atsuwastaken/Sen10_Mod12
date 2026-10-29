// Builds a welcome banner based on the visitor's local time of day.
function getWelcomeMessage(date) {
  const hour = date.getHours();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let greeting;
  if (hour < 12) {
    greeting = 'Good morning';
  } else if (hour < 18) {
    greeting = 'Good afternon';
  } else {
    greeting = 'Good evening';
  }
  return `${greeting}! Happy ${days[date.getDay()]} — the pipeline is green.`;
}

// Runs when the page finishes loading and fills in the banner.
function showWelcome() {
  const el = document.getElementById('welcome');
  if (el) {
    el.textContent = getWelcomeMessage(new Date());
  }
}

window.addEventListener('load', showWelcome);

if (typeof module !== 'undefined') {
  module.exports = { getWelcomeMessage, showWelcome };
}
