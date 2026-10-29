/**
 * @jest-environment jsdom
 */
const { getWelcomeMessage, showWelcome } = require('../src/welcome');

describe('getWelcomeMessage', () => {
  test('says good morning before noon', () => {
    const date = new Date(2026, 9, 26, 9, 0); // Monday 9:00
    expect(getWelcomeMessage(date)).toBe('Good morning! Happy Monday — the pipeline is green.');
  });

  test('says good afternoon between noon and 6pm', () => {
    const date = new Date(2026, 9, 28, 14, 30); // Wednesday 14:30
    expect(getWelcomeMessage(date)).toBe('Good afternoon! Happy Wednesday — the pipeline is green.');
  });

  test('says good evening from 6pm on', () => {
    const date = new Date(2026, 9, 31, 20, 0); // Saturday 20:00
    expect(getWelcomeMessage(date)).toBe('Good evening! Happy Saturday — the pipeline is green.');
  });
});

describe('showWelcome', () => {
  test('runs on page load and fills the #welcome element', () => {
    document.body.innerHTML = '<p id="welcome"></p>';
    window.dispatchEvent(new Event('load'));
    expect(document.getElementById('welcome').textContent).toMatch(/^Good (morning|afternoon|evening)!/);
  });

  test('does nothing when #welcome is missing', () => {
    document.body.innerHTML = '';
    expect(() => showWelcome()).not.toThrow();
  });
});
