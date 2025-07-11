import { motion } from 'framer-motion';
import { Character } from '../types/Character';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CharacterPreview3D } from './3d/CharacterPreview3D';
import { useState } from 'react';

interface CharacterSelectProps {
  characters: Character[];
  selectedPlayer1?: Character;
  selectedPlayer2?: Character;
  onSelectCharacter: (character: Character, player: 'player1' | 'player2') => void;
  onStartGame: () => void;
}

export function CharacterSelect({ 
  characters, 
  selectedPlayer1, 
  selectedPlayer2, 
  onSelectCharacter, 
  onStartGame 
}: CharacterSelectProps) {
  const selectingPlayer = !selectedPlayer1 ? 'player1' : !selectedPlayer2 ? 'player2' : null;
  const [hoveredCharacter, setHoveredCharacter] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-black bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 bg-clip-text text-transparent mb-4">
            LCU FIGHTING CHAMPIONSHIP
          </h1>
          <p className="text-xl text-gray-300 mb-6">Choose your fighters and settle the ultimate internet beef!</p>
          
          {/* Player Selection Status */}
          <div className="flex justify-center gap-8 mb-8">
            <div className={`p-4 rounded-lg border-2 ${selectedPlayer1 ? 'border-green-500 bg-green-500/10' : 'border-blue-500 bg-blue-500/10 animate-pulse'}`}>
              <p className="text-lg font-bold text-blue-400 mb-2">Player 1</p>
              {selectedPlayer1 ? (
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <CharacterPreview3D 
                      character={selectedPlayer1} 
                      isSelected={true}
                    />
                  </div>
                  <div>
                    <p className="font-bold text-white">{selectedPlayer1.displayName}</p>
                    <p className="text-sm text-gray-400">Ready to fight!</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400">Select a character...</p>
              )}
            </div>
            
            <div className="flex items-center">
              <span className="text-4xl font-bold text-red-500">VS</span>
            </div>
            
            <div className={`p-4 rounded-lg border-2 ${selectedPlayer2 ? 'border-green-500 bg-green-500/10' : selectedPlayer1 ? 'border-red-500 bg-red-500/10 animate-pulse' : 'border-gray-600 bg-gray-600/10'}`}>
              <p className="text-lg font-bold text-red-400 mb-2">Player 2</p>
              {selectedPlayer2 ? (
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <CharacterPreview3D 
                      character={selectedPlayer2} 
                      isSelected={true}
                    />
                  </div>
                  <div>
                    <p className="font-bold text-white">{selectedPlayer2.displayName}</p>
                    <p className="text-sm text-gray-400">Ready to fight!</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400">
                  {selectedPlayer1 ? 'Select a character...' : 'Waiting for Player 1...'}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Character Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {characters.map((character, index) => {
            const isSelected = character.id === selectedPlayer1?.id || character.id === selectedPlayer2?.id;
            const canSelect = !isSelected && selectingPlayer;
            const isHovered = hoveredCharacter === character.id;
            
            return (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className={`relative overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    isSelected 
                      ? 'ring-4 ring-green-500 bg-green-500/10' 
                      : canSelect
                        ? 'hover:ring-2 hover:ring-white bg-slate-800/50 backdrop-blur-sm'
                        : 'opacity-50 cursor-not-allowed bg-slate-800/30'
                  }`}
                  onClick={() => canSelect && onSelectCharacter(character, selectingPlayer)}
                  onMouseEnter={() => setHoveredCharacter(character.id)}
                  onMouseLeave={() => setHoveredCharacter(null)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${character.color} opacity-20`} />
                  
                  <CardContent className="relative p-6">
                    {/* 3D Character Preview */}
                    <div className="mb-4">
                      <CharacterPreview3D 
                        character={character} 
                        isSelected={isSelected}
                        isHovered={isHovered}
                      />
                    </div>
                    
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-white mb-2">{character.displayName}</h3>
                      <p className="text-sm text-gray-400 mb-3">{character.description}</p>
                      <p className="text-xs italic text-yellow-400">"{character.catchphrase}"</p>
                    </div>
                    
                    {/* Stats */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Attack:</span>
                        <span className="text-red-400 font-bold">{character.attack}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Defense:</span>
                        <span className="text-blue-400 font-bold">{character.defense}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Speed:</span>
                        <span className="text-green-400 font-bold">{character.speed}</span>
                      </div>
                    </div>
                    
                    {/* Special Moves Preview */}
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-gray-300 mb-2">Special Moves:</p>
                      {character.specialMoves.slice(0, 2).map(move => (
                        <Badge key={move.id} variant="outline" className="text-xs mr-1 mb-1">
                          {move.name}
                        </Badge>
                      ))}
                      <Badge variant="destructive" className="text-xs">
                        {character.finishingMove.name}
                      </Badge>
                    </div>
                    
                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-green-500 text-white">SELECTED</Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Start Game Button */}
        {selectedPlayer1 && selectedPlayer2 && (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Button 
              onClick={onStartGame}
              className="px-12 py-6 text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-110"
            >
              🥊 START THE FIGHT! 🥊
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}