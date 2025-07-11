import { useState, useCallback } from 'react';
import { Character, GameState, SpecialMove } from '../types/Character';

export function useGameLogic() {
  const [gameState, setGameState] = useState<GameState>({
    player1: {} as Character,
    player2: {} as Character,
    currentTurn: 'player1',
    gameStatus: 'character-select',
    round: 1,
    actionLog: ['⚔️ Welcome to the LCU Fighting Championship! ⚔️']
  });

  const selectCharacter = useCallback((character: Character, player: 'player1' | 'player2') => {
    setGameState(prev => ({
      ...prev,
      [player]: { ...character, health: character.maxHealth, energy: character.maxEnergy }
    }));
  }, []);

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      gameStatus: 'fighting',
      actionLog: [
        ...prev.actionLog,
        `🥊 ${prev.player1.displayName} vs ${prev.player2.displayName} - FIGHT! 🥊`
      ]
    }));
  }, []);

  const attack = useCallback((attacker: Character, defender: Character, moveType: 'basic' | 'special', move?: SpecialMove) => {
    setGameState(prev => {
      const isPlayer1Attacking = attacker.id === prev.player1.id;
      const attackerKey = isPlayer1Attacking ? 'player1' : 'player2';
      const defenderKey = isPlayer1Attacking ? 'player2' : 'player1';

      let damage = 15; // Basic attack damage
      let energyCost = 10; // Basic attack energy cost
      let attackDescription = 'basic attack';

      if (moveType === 'special' && move) {
        damage = move.damage;
        energyCost = move.energyCost;
        attackDescription = move.name;
      }

      // Calculate actual damage (consider defense)
      const actualDamage = Math.max(1, damage - Math.floor(defender.defense / 10));
      
      const newDefenderHealth = Math.max(0, defender.health - actualDamage);
      const newAttackerEnergy = Math.max(0, attacker.energy - energyCost);

      // Update characters
      const updatedAttacker = { 
        ...attacker, 
        energy: newAttackerEnergy,
        stance: 'attacking' as const
      };
      const updatedDefender = { 
        ...defender, 
        health: newDefenderHealth,
        stance: newDefenderHealth <= 0 ? 'defeat' as const : 'stunned' as const
      };

      // Generate action log entry
      const actionEntry = `${attacker.displayName} uses ${attackDescription} on ${defender.displayName} for ${actualDamage} damage!`;

      // Check for game over
      let newGameStatus = prev.gameStatus;
      let winner: 'player1' | 'player2' | undefined;
      
      if (newDefenderHealth <= 0) {
        newGameStatus = 'game-over';
        winner = isPlayer1Attacking ? 'player1' : 'player2';
        updatedAttacker.stance = 'victory';
      }

      // Switch turns
      const nextTurn = prev.currentTurn === 'player1' ? 'player2' : 'player1';

      // Regenerate some energy each turn
      const energyRegen = 15;
      const updatedAttackerWithRegen = {
        ...updatedAttacker,
        energy: Math.min(updatedAttacker.maxEnergy, updatedAttacker.energy + energyRegen)
      };

      return {
        ...prev,
        [attackerKey]: updatedAttackerWithRegen,
        [defenderKey]: updatedDefender,
        currentTurn: newGameStatus === 'game-over' ? prev.currentTurn : nextTurn,
        gameStatus: newGameStatus,
        winner,
        actionLog: [...prev.actionLog, actionEntry]
      };
    });

    // Reset stances after animation
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        player1: { ...prev.player1, stance: prev.player1.health <= 0 ? 'defeat' : 'idle' },
        player2: { ...prev.player2, stance: prev.player2.health <= 0 ? 'defeat' : 'idle' }
      }));
    }, 1000);
  }, []);

  const finishingMove = useCallback((attacker: Character, defender: Character) => {
    setGameState(prev => {
      const isPlayer1Attacking = attacker.id === prev.player1.id;
      const attackerKey = isPlayer1Attacking ? 'player1' : 'player2';
      const defenderKey = isPlayer1Attacking ? 'player2' : 'player1';

      const finisher = attacker.finishingMove;
      
      const updatedAttacker = { 
        ...attacker, 
        energy: attacker.energy - finisher.requirements.energyRequired,
        stance: 'victory' as const
      };
      const updatedDefender = { 
        ...defender, 
        health: 0,
        stance: 'defeat' as const
      };

      const actionEntry = `💀 ${attacker.displayName} executes ${finisher.name}! ${defender.displayName} has been FINISHED! 💀`;

      return {
        ...prev,
        [attackerKey]: updatedAttacker,
        [defenderKey]: updatedDefender,
        gameStatus: 'game-over',
        winner: isPlayer1Attacking ? 'player1' : 'player2',
        actionLog: [...prev.actionLog, actionEntry]
      };
    });
  }, []);

  const newGame = useCallback(() => {
    setGameState({
      player1: {} as Character,
      player2: {} as Character,
      currentTurn: 'player1',
      gameStatus: 'character-select',
      round: 1,
      actionLog: ['⚔️ Welcome to the LCU Fighting Championship! ⚔️']
    });
  }, []);

  return {
    gameState,
    selectCharacter,
    startGame,
    attack,
    finishingMove,
    newGame
  };
}