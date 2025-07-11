import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Character3D } from './Character3D';
import { Character } from '../../types/Character';
import { Suspense } from 'react';

interface CharacterPreview3DProps {
  character: Character;
  isSelected?: boolean;
  isHovered?: boolean;
}

export function CharacterPreview3D({ character, isSelected, isHovered }: CharacterPreview3DProps) {
  return (
    <div className="w-full h-48 rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, 5, 5]} intensity={0.4} color="#4f46e5" />
          
          <Environment preset="sunset" />

          <Character3D
            character={character}
            position={[0, -1, 0]}
            scale={isSelected ? 1.3 : isHovered ? 1.1 : 1}
            isVictorious={isSelected}
          />

          {/* Rotating platform */}
          <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[2, 2, 0.1, 32]} />
            <meshStandardMaterial 
              color={isSelected ? "#fbbf24" : isHovered ? "#6366f1" : "#374151"} 
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            autoRotate={isSelected || isHovered}
            autoRotateSpeed={isSelected ? 4 : 2}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 6}
            target={[0, 0, 0]}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}