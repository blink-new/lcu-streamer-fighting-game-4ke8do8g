export interface Character {
  id: string;
  name: string;
  displayName: string;
  description: string;
  health: number;
  maxHealth: number;
  energy: number;
  maxEnergy: number;
  attack: number;
  defense: number;
  speed: number;
  avatar: string;
  specialMoves: SpecialMove[];
  finishingMove: FinishingMove;
  stance: 'idle' | 'attacking' | 'defending' | 'stunned' | 'victory' | 'defeat';
  color: string;
  catchphrase: string;
}

export interface SpecialMove {
  id: string;
  name: string;
  description: string;
  damage: number;
  energyCost: number;
  animation: string;
  sound?: string;
  cooldown: number;
  isOnCooldown?: boolean;
}

export interface FinishingMove {
  id: string;
  name: string;
  description: string;
  damage: number;
  animation: string;
  requirements: {
    enemyHealthBelow: number;
    energyRequired: number;
  };
}

export interface GameState {
  player1: Character;
  player2: Character;
  currentTurn: 'player1' | 'player2';
  gameStatus: 'character-select' | 'fighting' | 'game-over';
  winner?: 'player1' | 'player2';
  round: number;
  actionLog: string[];
}