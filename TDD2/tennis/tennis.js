/* eslint-disable class-methods-use-this */
class TennisPlayer {
  constructor(name, point = 0) {
    this.name = name;
    this.point = point;
    this.scores = [0, 15, 30, 40];
  }

  wonPoint() {
    this.point = this.point + 1;
  }

  getScore() {
    if (this.point >= this.scores.length) {
      // Ex: 0, 15, 30, 40 and  after 41, 42, 43 (I don't know how it's work)
      return this.scores[this.scores.length - 1] + this.point - (this.scores.length - 1);
    }
    return this.scores[this.point];
  }
}

export class TennisGame {
  constructor(player1, player2) {
    this.player1 = new TennisPlayer(player1, 0);
    this.player2 = new TennisPlayer(player2, 0);
  }

  scorePlayerOne() {
    this.player1.wonPoint();
  }

  scorePlayerTwo() {
    this.player2.wonPoint();
  }

  isAWinB(a, b) {
    return a > 3 && (a - b) >= 2;
  }

  isAvantageAOverB(a, b) {
    // A has more than 40 and b is greater or equals to 40 with minimum 1 point space
    return a > 3 && b >= 3 && (a - b) >= 1;
  }

  displayScore() {
    const [p1, p2] = [this.player1.point, this.player2.point];

    if (p1 >= 3 && p1 === p2) return 'deuce';

    if (this.isAWinB(p1, p2)) return `Nous avons un gagnant: ${this.player1.name}.`;
    if (this.isAWinB(p2, p1)) return `Nous avons un gagnant: ${this.player2.name}.`;

    if (this.isAvantageAOverB(p1, p2)) return `Avantage! ${this.player1.name}.`;
    if (this.isAvantageAOverB(p2, p1)) return `Avantage! ${this.player2.name}.`;

    return `${this.player1.getScore()}-${this.player2.getScore()}`;
  }
}
