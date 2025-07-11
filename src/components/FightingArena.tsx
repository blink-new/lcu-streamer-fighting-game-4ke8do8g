import { motion, AnimatePresence } from 'framer-motion';
import { Character, SpecialMove } from '../types/Character';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { useEffect, useState } from 'react';
import { Arena3D } from './3d/Arena3D';

interface FightingArenaProps {
  player1: Character;
  player2: Character;
  currentTurn: 'player1' | 'player2';
  gameStatus: string;
  winner?: 'player1' | 'player2';
  actionLog: string[];
  onAttack: (attacker: Character, defender: Character, moveType: 'basic' | 'special', move?: SpecialMove) => void;
  onFinishingMove: (attacker: Character, defender: Character) => void;
  onNewGame: () => void;
}

export function FightingArena({
  player1,
  player2,
  currentTurn,
  gameStatus,
  winner,
  actionLog,
  onAttack,
  onFinishingMove,
  onNewGame
}: FightingArenaProps) {
  const [showAnimation, setShowAnimation] = useState('');
  const [showDamage, setShowDamage] = useState<{player: 'player1' | 'player2', damage: number} | null>(null);

  const currentPlayer = currentTurn === 'player1' ? player1 : player2;
  const opponent = currentTurn === 'player1' ? player2 : player1;

  const canUseFinishingMove = (attacker: Character, defender: Character) => {
    const finisher = attacker.finishingMove;
    return (
      defender.health <= finisher.requirements.enemyHealthBelow &&
      attacker.energy >= finisher.requirements.energyRequired
    );
  };

  const triggerAnimation = (animation: string) => {
    setShowAnimation(animation);
    setTimeout(() => setShowAnimation(''), 1000);
  };

  const showDamageEffect = (player: 'player1' | 'player2', damage: number) => {
    setShowDamage({ player, damage });
    setTimeout(() => setShowDamage(null), 1500);
  };

  useEffect(() => {
    // Auto-scroll action log
    const logElement = document.getElementById('action-log');
    if (logElement) {
      logElement.scrollTop = logElement.scrollHeight;
    }
  }, [actionLog]);

  if (gameStatus === 'game-over' && winner) {
    const winnerCharacter = winner === 'player1' ? player1 : player2;
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
        <motion.div 
          className="text-center"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <div className="text-8xl mb-6">{winnerCharacter.avatar}</div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent mb-4">
            {winnerCharacter.displayName} WINS!
          </h1>
          <p className="text-2xl text-yellow-400 italic mb-8">"{winnerCharacter.catchphrase}"</p>
          <Button 
            onClick={onNewGame}
            className="px-8 py-4 text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            ⚔️ NEW BATTLE ⚔️
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Arena Header */}
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h1 className="text-4xl font-black bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent mb-2">
            LCU CHAMPIONSHIP ARENA
          </h1>
          <Badge variant="destructive" className="text-lg px-4 py-2">
            {currentPlayer.displayName}'s Turn
          </Badge>
        </motion.div>

        {/* 3D Arena View */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Arena3D
            player1={player1}
            player2={player2}
            currentTurn={currentTurn}
            gameStatus={gameStatus}
            winner={winner}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Player 1 */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-blue-500 relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${player1.color} opacity-10`} />
            <CardContent className="p-6 relative">
              <div className="text-center mb-4">
                <motion.div 
                  className="text-6xl mb-3"
                  animate={player1.stance === 'attacking' ? { scale: [1, 1.2, 1], rotate: [0, 5, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {player1.avatar}
                </motion.div>
                <h3 className="text-xl font-bold text-blue-400">{player1.displayName}</h3>
                <Badge className="mt-2 bg-blue-500">{player1.stance.toUpperCase()}</Badge>
              </div>
              
              {/* Health Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-red-400">Health</span>
                  <span className="text-white">{player1.health}/{player1.maxHealth}</span>
                </div>
                <Progress value={(player1.health / player1.maxHealth) * 100} className="h-3" />
              </div>
              
              {/* Energy Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-blue-400">Energy</span>
                  <span className="text-white">{player1.energy}/{player1.maxEnergy}</span>
                </div>
                <Progress 
                  value={(player1.energy / player1.maxEnergy) * 100} 
                  className="h-2" 
                />
              </div>

              {/* Damage Effect */}
              <AnimatePresence>
                {showDamage?.player === 'player1' && (
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-red-500 pointer-events-none"
                    initial={{ opacity: 0, scale: 0.5, y: 0 }}
                    animate={{ opacity: 1, scale: 1.5, y: -50 }}
                    exit={{ opacity: 0, scale: 0.5, y: -100 }}
                    transition={{ duration: 1.5 }}
                  >
                    -{showDamage.damage}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Battle Controls */}
          <Card className="bg-slate-800/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-center mb-4 text-yellow-400">BATTLE CONTROLS</h3>
              
              {currentTurn === 'player1' ? (
                <div className="space-y-3">
                  {/* Basic Attack */}
                  <Button 
                    onClick={() => {
                      onAttack(currentPlayer, opponent, 'basic');
                      triggerAnimation('basic-attack');
                      showDamageEffect('player2', 15);
                    }}
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    👊 Basic Attack (15 dmg)
                  </Button>
                  
                  {/* Special Moves */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-300">Special Moves:</p>
                    {currentPlayer.specialMoves.map(move => (
                      <Button
                        key={move.id}
                        onClick={() => {
                          onAttack(currentPlayer, opponent, 'special', move);
                          triggerAnimation(move.animation);
                          showDamageEffect('player2', move.damage);
                        }}
                        disabled={currentPlayer.energy < move.energyCost}
                        className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                      >
                        ⚡ {move.name} ({move.damage} dmg, {move.energyCost} energy)
                      </Button>
                    ))}
                  </div>
                  
                  {/* Finishing Move */}
                  {canUseFinishingMove(currentPlayer, opponent) && (
                    <Button
                      onClick={() => {
                        onFinishingMove(currentPlayer, opponent);
                        triggerAnimation('finishing-move');
                      }}
                      className="w-full bg-gradient-to-r from-yellow-600 to-red-600 hover:from-yellow-700 hover:to-red-700 animate-pulse"
                    >
                      💀 {currentPlayer.finishingMove.name} 💀
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <p>Waiting for Player 2...</p>
                  <div className="animate-spin text-2xl mt-2">⚔️</div>
                </div>
              )}

              {/* Action Log */}
              <div className="mt-6">
                <h4 className="text-lg font-bold mb-3 text-green-400">Battle Log</h4>
                <div 
                  id="action-log"
                  className="bg-black/50 p-3 rounded-lg h-32 overflow-y-auto text-sm space-y-1"
                >
                  {actionLog.slice(-6).map((action, index) => (
                    <p key={index} className="text-gray-300">{action}</p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Player 2 */}
          <Card className="bg-slate-800/50 backdrop-blur-sm border-red-500 relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${player2.color} opacity-10`} />
            <CardContent className="p-6 relative">
              <div className="text-center mb-4">
                <motion.div 
                  className="text-6xl mb-3"
                  animate={player2.stance === 'attacking' ? { scale: [1, 1.2, 1], rotate: [0, -5, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {player2.avatar}
                </motion.div>
                <h3 className="text-xl font-bold text-red-400">{player2.displayName}</h3>
                <Badge className="mt-2 bg-red-500">{player2.stance.toUpperCase()}</Badge>
              </div>
              
              {/* Health Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-red-400">Health</span>
                  <span className="text-white">{player2.health}/{player2.maxHealth}</span>
                </div>
                <Progress value={(player2.health / player2.maxHealth) * 100} className="h-3" />
              </div>
              
              {/* Energy Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-blue-400">Energy</span>
                  <span className="text-white">{player2.energy}/{player2.maxEnergy}</span>
                </div>
                <Progress 
                  value={(player2.energy / player2.maxEnergy) * 100} 
                  className="h-2" 
                />
              </div>

              {/* Damage Effect */}
              <AnimatePresence>
                {showDamage?.player === 'player2' && (
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-red-500 pointer-events-none"
                    initial={{ opacity: 0, scale: 0.5, y: 0 }}
                    animate={{ opacity: 1, scale: 1.5, y: -50 }}
                    exit={{ opacity: 0, scale: 0.5, y: -100 }}
                    transition={{ duration: 1.5 }}
                  >
                    -{showDamage.damage}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        {/* Animation Effects */}
        <AnimatePresence>
          {showAnimation && (
            <motion.div
              className="fixed inset-0 pointer-events-none flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="text-6xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 2, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.8 }}
              >
                {showAnimation === 'basic-attack' && '💥'}
                {showAnimation === 'special-attack' && '⚡'}
                {showAnimation === 'finishing-move' && '💀'}
                {showAnimation.includes('spin') && '🌪️'}
                {showAnimation.includes('rage') && '😡'}
                {showAnimation.includes('freeze') && '❄️'}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}