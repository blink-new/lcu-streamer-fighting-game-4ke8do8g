import { Character } from '../types/Character';

export const characters: Character[] = [
  {
    id: 'keemstar',
    name: 'keemstar',
    displayName: 'Keemstar',
    description: 'The self-proclaimed fastest news source in the universe',
    health: 100,
    maxHealth: 100,
    energy: 100,
    maxEnergy: 100,
    attack: 85,
    defense: 60,
    speed: 90,
    avatar: '🎯',
    catchphrase: "WHAT'S UP DRAMA ALERT NATION!",
    color: 'from-red-500 to-orange-500',
    stance: 'idle',
    specialMoves: [
      {
        id: 'drama-blast',
        name: 'Drama Blast',
        description: 'Unleashes a devastating wave of controversy',
        damage: 25,
        energyCost: 30,
        animation: 'spin-attack',
        cooldown: 0
      },
      {
        id: 'twitter-storm',
        name: 'Twitter Storm',
        description: 'Rapid-fire tweets that confuse and damage enemies',
        damage: 15,
        energyCost: 20,
        animation: 'rapid-fire',
        cooldown: 0
      },
      {
        id: 'gnome-rage',
        name: 'Gnome Rage',
        description: 'Channels his inner gnome for massive damage',
        damage: 35,
        energyCost: 50,
        animation: 'rage-mode',
        cooldown: 0
      }
    ],
    finishingMove: {
      id: 'cancel-combo',
      name: 'CANCEL COMBO',
      description: 'The ultimate cancellation that ends careers',
      damage: 999,
      animation: 'finishing-blast',
      requirements: {
        enemyHealthBelow: 25,
        energyRequired: 75
      }
    }
  },
  {
    id: 'kidbehindacamera',
    name: 'kidbehindacamera',
    displayName: 'KidBehindACamera',
    description: 'The angry gamer with explosive tendencies',
    health: 120,
    maxHealth: 120,
    energy: 80,
    maxEnergy: 80,
    attack: 75,
    defense: 85,
    speed: 50,
    avatar: '📹',
    catchphrase: "I'M SO DONE WITH THIS!",
    color: 'from-blue-500 to-purple-500',
    stance: 'idle',
    specialMoves: [
      {
        id: 'rage-quit',
        name: 'Rage Quit',
        description: 'Explosive tantrum that damages everything nearby',
        damage: 30,
        energyCost: 25,
        animation: 'explosion',
        cooldown: 0
      },
      {
        id: 'controller-throw',
        name: 'Controller Throw',
        description: 'Hurls gaming equipment with deadly precision',
        damage: 20,
        energyCost: 15,
        animation: 'projectile',
        cooldown: 0
      },
      {
        id: 'gamer-fury',
        name: 'Gamer Fury',
        description: 'Channels years of gaming frustration',
        damage: 40,
        energyCost: 45,
        animation: 'berserker',
        cooldown: 0
      }
    ],
    finishingMove: {
      id: 'epic-meltdown',
      name: 'EPIC MELTDOWN',
      description: 'The most legendary rage quit of all time',
      damage: 999,
      animation: 'nuclear-rage',
      requirements: {
        enemyHealthBelow: 20,
        energyRequired: 60
      }
    }
  },
  {
    id: 'boogie2988',
    name: 'boogie2988',
    displayName: 'Boogie2988',
    description: 'The emotional roller coaster warrior',
    health: 110,
    maxHealth: 110,
    energy: 90,
    maxEnergy: 90,
    attack: 65,
    defense: 90,
    speed: 40,
    avatar: '🎭',
    catchphrase: "Love ya though!",
    color: 'from-green-500 to-teal-500',
    stance: 'idle',
    specialMoves: [
      {
        id: 'emotional-swing',
        name: 'Emotional Swing',
        description: 'Rapid mood changes confuse opponents',
        damage: 18,
        energyCost: 20,
        animation: 'mood-shift',
        cooldown: 0
      },
      {
        id: 'tooth-projectile',
        name: 'Tooth Projectile',
        description: 'Launches dental ammunition',
        damage: 22,
        energyCost: 25,
        animation: 'dental-shot',
        cooldown: 0
      },
      {
        id: 'tesla-charge',
        name: 'Tesla Charge',
        description: 'Drives his Tesla into battle',
        damage: 35,
        energyCost: 40,
        animation: 'vehicle-attack',
        cooldown: 0
      }
    ],
    finishingMove: {
      id: 'love-bomb',
      name: 'LOVE BOMB',
      description: 'Overwhelms enemies with toxic positivity',
      damage: 999,
      animation: 'heart-explosion',
      requirements: {
        enemyHealthBelow: 30,
        energyRequired: 70
      }
    }
  },
  {
    id: 'rastov',
    name: 'rastov',
    displayName: 'Rastov',
    description: 'The mysterious enigma of the internet',
    health: 95,
    maxHealth: 95,
    energy: 110,
    maxEnergy: 110,
    attack: 80,
    defense: 70,
    speed: 85,
    avatar: '🎪',
    catchphrase: "The show must go on!",
    color: 'from-purple-500 to-pink-500',
    stance: 'idle',
    specialMoves: [
      {
        id: 'circus-spin',
        name: 'Circus Spin',
        description: 'Dizzying performance that disorients foes',
        damage: 20,
        energyCost: 25,
        animation: 'spin-dance',
        cooldown: 0
      },
      {
        id: 'mystery-strike',
        name: 'Mystery Strike',
        description: 'Unpredictable attack with random damage',
        damage: 28,
        energyCost: 30,
        animation: 'shadow-strike',
        cooldown: 0
      },
      {
        id: 'performance-art',
        name: 'Performance Art',
        description: 'Avant-garde attack that defies logic',
        damage: 32,
        energyCost: 35,
        animation: 'art-explosion',
        cooldown: 0
      }
    ],
    finishingMove: {
      id: 'final-act',
      name: 'FINAL ACT',
      description: 'The grand finale that ends all shows',
      damage: 999,
      animation: 'curtain-call',
      requirements: {
        enemyHealthBelow: 25,
        energyRequired: 80
      }
    }
  },
  {
    id: 'billythefridge',
    name: 'billythefridge',
    displayName: 'Billy the Fridge',
    description: 'The heavyweight champion of chaos',
    health: 140,
    maxHealth: 140,
    energy: 70,
    maxEnergy: 70,
    attack: 90,
    defense: 95,
    speed: 30,
    avatar: '🥶',
    catchphrase: "Keep it cool!",
    color: 'from-cyan-500 to-blue-500',
    stance: 'idle',
    specialMoves: [
      {
        id: 'fridge-slam',
        name: 'Fridge Slam',
        description: 'Devastating body slam with chilling effect',
        damage: 35,
        energyCost: 30,
        animation: 'body-slam',
        cooldown: 0
      },
      {
        id: 'ice-blast',
        name: 'Ice Blast',
        description: 'Freezing attack that slows enemies',
        damage: 25,
        energyCost: 25,
        animation: 'freeze-ray',
        cooldown: 0
      },
      {
        id: 'avalanche',
        name: 'Avalanche',
        description: 'Overwhelming force of nature',
        damage: 45,
        energyCost: 50,
        animation: 'earthquake',
        cooldown: 0
      }
    ],
    finishingMove: {
      id: 'deep-freeze',
      name: 'DEEP FREEZE',
      description: 'Absolute zero temperature attack',
      damage: 999,
      animation: 'ice-age',
      requirements: {
        enemyHealthBelow: 20,
        energyRequired: 55
      }
    }
  },
  {
    id: 'tinad',
    name: 'tinad',
    displayName: 'Tina D',
    description: 'The queen of chaos and unpredictability',
    health: 85,
    maxHealth: 85,
    energy: 120,
    maxEnergy: 120,
    attack: 75,
    defense: 55,
    speed: 95,
    avatar: '👑',
    catchphrase: "Chaos reigns supreme!",
    color: 'from-pink-500 to-red-500',
    stance: 'idle',
    specialMoves: [
      {
        id: 'chaos-strike',
        name: 'Chaos Strike',
        description: 'Unpredictable attack pattern',
        damage: 22,
        energyCost: 20,
        animation: 'chaos-burst',
        cooldown: 0
      },
      {
        id: 'royal-decree',
        name: 'Royal Decree',
        description: 'Commands respect through force',
        damage: 28,
        energyCost: 30,
        animation: 'crown-blast',
        cooldown: 0
      },
      {
        id: 'diva-tantrum',
        name: 'Diva Tantrum',
        description: 'Overwhelming display of attitude',
        damage: 38,
        energyCost: 45,
        animation: 'tantrum-tornado',
        cooldown: 0
      }
    ],
    finishingMove: {
      id: 'reign-of-terror',
      name: 'REIGN OF TERROR',
      description: 'Ultimate display of absolute power',
      damage: 999,
      animation: 'royal-execution',
      requirements: {
        enemyHealthBelow: 30,
        energyRequired: 90
      }
    }
  }
];