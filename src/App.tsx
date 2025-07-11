import { characters } from './data/characters';
import { CharacterSelect } from './components/CharacterSelect';
import { FightingArena } from './components/FightingArena';
import { useGameLogic } from './hooks/useGameLogic';

function App() {
  const { gameState, selectCharacter, startGame, attack, finishingMove, newGame } = useGameLogic();

  if (gameState.gameStatus === 'character-select') {
    return (
      <CharacterSelect
        characters={characters}
        selectedPlayer1={gameState.player1.id ? gameState.player1 : undefined}
        selectedPlayer2={gameState.player2.id ? gameState.player2 : undefined}
        onSelectCharacter={selectCharacter}
        onStartGame={startGame}
      />
    );
  }

  return (
    <FightingArena
      player1={gameState.player1}
      player2={gameState.player2}
      currentTurn={gameState.currentTurn}
      gameStatus={gameState.gameStatus}
      winner={gameState.winner}
      actionLog={gameState.actionLog}
      onAttack={attack}
      onFinishingMove={finishingMove}
      onNewGame={newGame}
    />
  );
}

export default App;