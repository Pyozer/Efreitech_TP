import { TennisGame } from './tennis';

describe('tennis', () => {
  test('Test a tennis game scenario with Nadal winner', () => {
    const game = new TennisGame('Federer', 'Nadal');

    expect(game.displayScore()).toBe('0-0');
    game.scorePlayerOne();
    expect(game.displayScore()).toBe('15-0');
    game.scorePlayerOne();
    game.scorePlayerOne();
    expect(game.displayScore()).toBe('40-0');
    game.scorePlayerTwo();
    game.scorePlayerTwo();
    game.scorePlayerTwo();
    expect(game.displayScore()).toBe('deuce');
    game.scorePlayerTwo();
    expect(game.displayScore()).toBe('Avantage! Nadal.');
    game.scorePlayerTwo();
    expect(game.displayScore()).toBe('Nous avons un gagnant: Nadal.');
  });

  test('Test a tennis game scenario with Federer winner', () => {
    const game = new TennisGame('Federer', 'Nadal');

    expect(game.displayScore()).toBe('0-0');
    game.scorePlayerOne();
    expect(game.displayScore()).toBe('15-0');
    game.scorePlayerTwo();
    expect(game.displayScore()).toBe('15-15');
    game.scorePlayerOne();
    expect(game.displayScore()).toBe('30-15');
    game.scorePlayerTwo();
    expect(game.displayScore()).toBe('30-30');
    game.scorePlayerOne();
    expect(game.displayScore()).toBe('40-30');
    game.scorePlayerTwo();
    expect(game.displayScore()).toBe('deuce');
    game.scorePlayerOne();
    expect(game.displayScore()).toBe('Avantage! Federer.');
    game.scorePlayerTwo();
    expect(game.displayScore()).toBe('deuce');
    game.scorePlayerOne();
    expect(game.displayScore()).toBe('Avantage! Federer.');
    game.scorePlayerOne();
    expect(game.displayScore()).toBe('Nous avons un gagnant: Federer.');
  });

  test('Test a tennis game scenario with big Nadal winner', () => {
    const game = new TennisGame('Federer', 'Nadal');

    expect(game.displayScore()).toBe('0-0');
    game.scorePlayerTwo();
    expect(game.displayScore()).toBe('0-15');
    game.scorePlayerTwo();
    expect(game.displayScore()).toBe('0-30');
    game.scorePlayerTwo();
    expect(game.displayScore()).toBe('0-40');
    game.scorePlayerTwo();
    expect(game.displayScore()).toBe('Nous avons un gagnant: Nadal.');
  });
});
