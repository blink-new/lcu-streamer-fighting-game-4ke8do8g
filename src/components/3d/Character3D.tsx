import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Sphere, Cylinder, Cone } from '@react-three/drei';
import * as THREE from 'three';
import { Character } from '../../types/Character';

interface Character3DProps {
  character: Character;
  position: [number, number, number];
  isAttacking?: boolean;
  isDefending?: boolean;
  isVictorious?: boolean;
  isDefeated?: boolean;
  scale?: number;
}

export function Character3D({ 
  character, 
  position, 
  isAttacking = false, 
  isDefending = false, 
  isVictorious = false, 
  isDefeated = false,
  scale = 1 
}: Character3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);

  // Character-specific colors based on their theme
  const getCharacterColors = () => {
    switch (character.id) {
      case 'keemstar':
        return { 
          primary: '#ef4444', // red
          secondary: '#f97316', // orange
          accent: '#eab308' // yellow
        };
      case 'kidbehindacamera':
        return { 
          primary: '#3b82f6', // blue
          secondary: '#8b5cf6', // purple
          accent: '#06b6d4' // cyan
        };
      case 'boogie2988':
        return { 
          primary: '#10b981', // emerald
          secondary: '#14b8a6', // teal
          accent: '#84cc16' // lime
        };
      case 'rastov':
        return { 
          primary: '#8b5cf6', // purple
          secondary: '#ec4899', // pink
          accent: '#f59e0b' // amber
        };
      case 'billythefridge':
        return { 
          primary: '#06b6d4', // cyan
          secondary: '#3b82f6', // blue
          accent: '#0ea5e9' // sky
        };
      case 'tinad':
        return { 
          primary: '#ec4899', // pink
          secondary: '#ef4444', // red
          accent: '#f59e0b' // amber
        };
      default:
        return { 
          primary: '#6b7280', // gray
          secondary: '#4b5563', // gray
          accent: '#9ca3af' // gray
        };
    }
  };

  const colors = getCharacterColors();

  // Animation logic
  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    // Base idle animation
    if (!isAttacking && !isDefending && !isVictorious && !isDefeated) {
      groupRef.current.position.y = position[1] + Math.sin(time * 2) * 0.1;
      if (headRef.current) {
        headRef.current.rotation.y = Math.sin(time * 1.5) * 0.1;
      }
    }

    // Attack animation
    if (isAttacking) {
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = Math.sin(time * 10) * 0.5 - 0.5;
      }
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = Math.sin(time * 10 + Math.PI) * 0.3 - 0.3;
      }
      groupRef.current.rotation.y = Math.sin(time * 8) * 0.2;
    }

    // Defense animation
    if (isDefending) {
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.x = -1;
        rightArmRef.current.rotation.x = -1;
      }
      groupRef.current.position.z = position[2] + Math.sin(time * 5) * 0.1;
    }

    // Victory animation
    if (isVictorious) {
      groupRef.current.rotation.y = time * 2;
      groupRef.current.position.y = position[1] + Math.sin(time * 3) * 0.3;
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.z = Math.sin(time * 4) * 0.5 + 0.5;
        rightArmRef.current.rotation.z = -Math.sin(time * 4) * 0.5 - 0.5;
      }
    }

    // Defeat animation
    if (isDefeated) {
      groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.1 + 0.2;
      groupRef.current.position.y = position[1] - 0.5;
    }
  });

  // Character-specific body shapes
  const getBodyShape = () => {
    switch (character.id) {
      case 'keemstar':
        return <Cone ref={bodyRef} args={[0.8, 1.5, 8]} position={[0, 0, 0]} />;
      case 'kidbehindacamera':
        return <Box ref={bodyRef} args={[1.2, 1.5, 0.8]} position={[0, 0, 0]} />;
      case 'boogie2988':
        return <Sphere ref={bodyRef} args={[1, 32, 32]} scale={[1.3, 1.2, 1]} position={[0, 0, 0]} />;
      case 'rastov':
        return <Cylinder ref={bodyRef} args={[0.6, 0.9, 1.5, 12]} position={[0, 0, 0]} />;
      case 'billythefridge':
        return <Box ref={bodyRef} args={[1.8, 2, 1.2]} position={[0, 0, 0]} />;
      case 'tinad':
        return <Cylinder ref={bodyRef} args={[0.7, 0.5, 1.5, 8]} position={[0, 0, 0]} />;
      default:
        return <Box ref={bodyRef} args={[1, 1.5, 0.8]} position={[0, 0, 0]} />;
    }
  };

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Body */}
      <mesh>
        {getBodyShape()}
        <meshStandardMaterial color={colors.primary} />
      </mesh>

      {/* Head */}
      <mesh ref={headRef} position={[0, 1.2, 0]}>
        <Sphere args={[0.6, 32, 32]} />
        <meshStandardMaterial color={colors.secondary} />
      </mesh>

      {/* Character name above head */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.3}
        color={colors.accent}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        {character.displayName}
      </Text>

      {/* Eyes */}
      <mesh position={[-0.2, 1.3, 0.5]}>
        <Sphere args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.2, 1.3, 0.5]}>
        <Sphere args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Eye pupils */}
      <mesh position={[-0.2, 1.3, 0.58]}>
        <Sphere args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.2, 1.3, 0.58]}>
        <Sphere args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Arms */}
      <mesh ref={leftArmRef} position={[-1, 0.5, 0]} rotation={[0, 0, 0.3]}>
        <Cylinder args={[0.15, 0.15, 1, 8]} />
        <meshStandardMaterial color={colors.secondary} />
      </mesh>
      <mesh ref={rightArmRef} position={[1, 0.5, 0]} rotation={[0, 0, -0.3]}>
        <Cylinder args={[0.15, 0.15, 1, 8]} />
        <meshStandardMaterial color={colors.secondary} />
      </mesh>

      {/* Hands */}
      <mesh position={[-1.4, 0, 0]}>
        <Sphere args={[0.2, 16, 16]} />
        <meshStandardMaterial color={colors.accent} />
      </mesh>
      <mesh position={[1.4, 0, 0]}>
        <Sphere args={[0.2, 16, 16]} />
        <meshStandardMaterial color={colors.accent} />
      </mesh>

      {/* Legs */}
      <mesh ref={leftLegRef} position={[-0.4, -1.2, 0]}>
        <Cylinder args={[0.2, 0.15, 1.2, 8]} />
        <meshStandardMaterial color={colors.primary} />
      </mesh>
      <mesh ref={rightLegRef} position={[0.4, -1.2, 0]}>
        <Cylinder args={[0.2, 0.15, 1.2, 8]} />
        <meshStandardMaterial color={colors.primary} />
      </mesh>

      {/* Feet */}
      <mesh position={[-0.4, -1.9, 0.2]}>
        <Box args={[0.3, 0.15, 0.6]} />
        <meshStandardMaterial color={colors.accent} />
      </mesh>
      <mesh position={[0.4, -1.9, 0.2]}>
        <Box args={[0.3, 0.15, 0.6]} />
        <meshStandardMaterial color={colors.accent} />
      </mesh>

      {/* Character-specific accessories */}
      {character.id === 'keemstar' && (
        <mesh position={[0, 1.7, 0]}>
          <Cone args={[0.3, 0.4, 8]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
      )}

      {character.id === 'kidbehindacamera' && (
        <mesh position={[0, 1.1, 0.7]}>
          <Box args={[0.8, 0.3, 0.2]} />
          <meshStandardMaterial color="#1f2937" />
        </mesh>
      )}

      {character.id === 'tinad' && (
        <mesh position={[0, 1.8, 0]} rotation={[0, 0, 0.2]}>
          <Cone args={[0.4, 0.3, 8]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
      )}

      {character.id === 'billythefridge' && (
        <mesh position={[0, 0.5, 0.9]}>
          <Box args={[0.6, 0.4, 0.1]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      )}
    </group>
  );
}