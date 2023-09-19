export interface IEnemy {
  getRandomHand(): string;
}

// あいて（グーチョキパーをランダムで出してくれます）
export class Enemy implements IEnemy {
  public getRandomHand(): string{
      const hands = ["rock", "paper", "scissors"];
      const index = Math.floor(Math.random() * hands.length);
      return hands[index];
  }
};

// Mock class
export class MockEnemy implements IEnemy {
  private hand: string;

  constructor(hand: string) {
      this.hand = hand;
  }

  public getRandomHand(): string {
      return this.hand;
  }
}