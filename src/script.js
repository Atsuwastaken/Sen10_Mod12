const steps = [
  'Push to GitHub',
  'Lint JavaScript with ESLint',
  'Package site as Pages artifact',
  'Deploy to GitHub Pages'
];

const list = document.getElementById('pipeline');
steps.forEach((step) => {
  const li = document.createElement('li');
  li.textContent = step;
  list.appendChild(li);
});

let count = 0;
const countEl = document.getElementById('count');
document.getElementById('btn').addEventListener('click', () => {
  count += 1;
  countEl.textContent = String(count);
});

const buildInfo = document.querySelector('meta[name="build-sha"]');
if (buildInfo) {
  document.getElementById('build-info').textContent = buildInfo.content;
}
