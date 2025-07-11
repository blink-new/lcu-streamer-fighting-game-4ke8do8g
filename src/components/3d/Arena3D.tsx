import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text, Box, Plane } from '@react-three/drei';
import { Character3D } from './Character3D';
import { Character } from '../../types/Character';
import { Suspense } from 'react';
import * as THREE from 'three';

interface Arena3DProps {
  player1: Character;
  player2: Character;
  currentTurn: 'player1' | 'player2';
  gameStatus: string;
  winner?: 'player1' | 'player2';
}

function ArenaLighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#ff6b6b" />
      <pointLight position={[10, 5, -10]} intensity={0.5} color="#4ecdc4" />
      <spotLight
        position={[0, 15, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
        color="#ffd93d"
      />
    </>
  );
}

function ArenaFloor() {
  return (
    <>
      {/* Main arena floor */}
      <Plane 
        args={[20, 20]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -2, 0]}
        receiveShadow
      >
        <meshStandardMaterial 
          color="#1a1a2e" 
          metalness={0.1}
          roughness={0.8}
        />
      </Plane>

      {/* Arena border */}
      <Box args={[22, 0.5, 22]} position={[0, -2.25, 0]}>
        <meshStandardMaterial color="#16213e" />
      </Box>

      {/* Corner posts */}
      {[-9, 9].map(x => 
        [-9, 9].map(z => (
          <Box key={`${x}-${z}`} args={[0.5, 8, 0.5]} position={[x, 2, z]}>
            <meshStandardMaterial color="#e94560" metalness={0.7} roughness={0.3} />
          </Box>
        ))
      )}

      {/* Ring ropes */}
      {[1, 2, 3].map(height => (
        <group key={height}>
          <Box args={[18, 0.1, 0.1]} position={[0, height, -9]}>
            <meshStandardMaterial color="#ffffff" />
          </Box>
          <Box args={[18, 0.1, 0.1]} position={[0, height, 9]}>
            <meshStandardMaterial color="#ffffff" />
          </Box>
          <Box args={[0.1, 0.1, 18]} position={[-9, height, 0]}>
            <meshStandardMaterial color="#ffffff" />
          </Box>
          <Box args={[0.1, 0.1, 18]} position={[9, height, 0]}>
            <meshStandardMaterial color="#ffffff" />
          </Box>
        </group>
      ))}
    </>
  );
}

function CrowdStands() {
  const crowdPositions = [];
  
  // Generate crowd positions around the arena
  for (let i = 0; i < 50; i++) {
    const angle = (i / 50) * Math.PI * 2;
    const radius = 15 + Math.random() * 5;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = Math.random() * 3;
    
    crowdPositions.push([x, y, z]);
  }

  return (
    <group>
      {crowdPositions.map((position, index) => (
        <Box 
          key={index}
          args={[0.5, 1 + Math.random(), 0.5]} 
          position={position as [number, number, number]}
        >
          <meshStandardMaterial 
            color={new THREE.Color().setHSL(Math.random(), 0.7, 0.5)} 
          />
        </Box>
      ))}
    </group>
  );
}

export function Arena3D({ player1, player2, currentTurn, gameStatus, winner }: Arena3DProps) {
  const getCharacterAnimation = (character: Character, isPlayer1: boolean) => {
    if (gameStatus === 'game-over') {
      if (winner === (isPlayer1 ? 'player1' : 'player2')) {
        return { isVictorious: true };
      } else {
        return { isDefeated: true };
      }
    }

    if (currentTurn === (isPlayer1 ? 'player1' : 'player2')) {
      if (character.stance === 'attacking') {
        return { isAttacking: true };
      }
    } else {
      if (character.stance === 'stunned') {
        return { isDefending: true };
      }
    }

    return {};
  };

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden bg-gradient-to-b from-purple-900 to-black">
      <Canvas
        shadows
        camera={{ position: [0, 8, 15], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <ArenaLighting />
          <Environment preset="night" />
          
          <ArenaFloor />
          <CrowdStands />

          {/* Arena Title */}
          <Text
            position={[0, 12, 0]}
            fontSize={2}
            color="#ffd93d"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Inter-Bold.woff"
          >
            LCU CHAMPIONSHIP
          </Text>

          {/* Current turn indicator */}
          <Text
            position={[0, 9, 0]}
            fontSize={0.8}
            color={currentTurn === 'player1' ? '#3b82f6' : '#ef4444'}
            anchorX="center"
            anchorY="middle"
            font="/fonts/Inter-Bold.woff"
          >
            {gameStatus === 'game-over' 
              ? `${winner === 'player1' ? player1.displayName : player2.displayName} WINS!`
              : `${currentTurn === 'player1' ? player1.displayName : player2.displayName}'s Turn`
            }
          </Text>

          {/* Player 1 Character */}
          <Character3D
            character={player1}
            position={[-4, 0, 0]}
            scale={1.2}
            {...getCharacterAnimation(player1, true)}
          />

          {/* Player 2 Character */}
          <Character3D
            character={player2}
            position={[4, 0, 0]}
            scale={1.2}
            {...getCharacterAnimation(player2, false)}
          />

          {/* Health/Energy bars floating above characters */}
          <group position={[-4, 5, 0]}>
            {/* Player 1 Health Bar */}
            <Box args={[3, 0.2, 0.1]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#ef4444" />
            </Box>
            <Box 
              args={[(player1.health / player1.maxHealth) * 3, 0.2, 0.11]} 
              position={[-(3 - (player1.health / player1.maxHealth) * 3) / 2, 0, 0.01]}
            >
              <meshStandardMaterial color="#10b981" />
            </Box>
            
            {/* Player 1 Energy Bar */}
            <Box args={[3, 0.1, 0.1]} position={[0, -0.4, 0]}>
              <meshStandardMaterial color="#1e40af" />
            </Box>
            <Box 
              args={[(player1.energy / player1.maxEnergy) * 3, 0.1, 0.11]} 
              position={[-(3 - (player1.energy / player1.maxEnergy) * 3) / 2, -0.4, 0.01]}
            >
              <meshStandardMaterial color="#3b82f6" />
            </Box>
          </group>

          <group position={[4, 5, 0]}>
            {/* Player 2 Health Bar */}
            <Box args={[3, 0.2, 0.1]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#ef4444" />
            </Box>
            <Box 
              args={[(player2.health / player2.maxHealth) * 3, 0.2, 0.11]} 
              position={[-(3 - (player2.health / player2.maxHealth) * 3) / 2, 0, 0.01]}
            >
              <meshStandardMaterial color="#10b981" />
            </Box>
            
            {/* Player 2 Energy Bar */}
            <Box args={[3, 0.1, 0.1]} position={[0, -0.4, 0]}>
              <meshStandardMaterial color="#1e40af" />
            </Box>
            <Box 
              args={[(player2.energy / player2.maxEnergy) * 3, 0.1, 0.11]} 
              position={[-(3 - (player2.energy / player2.maxEnergy) * 3) / 2, -0.4, 0.01]}
            >
              <meshStandardMaterial color="#3b82f6" />
            </Box>
          </group>

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            maxPolarAngle={Math.PI / 2}
            minDistance={10}
            maxDistance={25}
            target={[0, 2, 0]}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}