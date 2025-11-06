export interface DomainCard {
  name: string;
  level: number;
  domain: string;
  type: 'Ability' | 'Spell' | 'Grimoire';
  recallCost: number;
  description: string;
}

export const DOMAIN_CARDS: DomainCard[] = [
  // Arcana Level 1
  {
    name: 'Rune Ward',
    level: 1,
    domain: 'Arcana',
    type: 'Spell',
    recallCost: 0,
    description: "A personal trinket can be infused with protective magic. The ward's holder can spend a Hope to reduce incoming damage by 1d8."
  },
  {
    name: 'Unleash Chaos',
    level: 1,
    domain: 'Arcana',
    type: 'Spell',
    recallCost: 1,
    description: "Channel raw energy against a target. Spend tokens to roll that many d10s for magic damage."
  },
  {
    name: 'Wall Walk',
    level: 1,
    domain: 'Arcana',
    type: 'Spell',
    recallCost: 1,
    description: "Spend a Hope to allow a creature you touch to climb on walls and ceilings as easily as walking on the ground."
  },
    // Arcana Level 2
  {
    name: 'Cinder Grasp',
    level: 2,
    domain: 'Arcana',
    type: 'Spell',
    recallCost: 1,
    description: "Make a Spellcast Roll. On a success, the target bursts into flames, taking 1d20+3 magic damage and is lit On Fire."
  },
  {
    name: 'Floating Eye',
    level: 2,
    domain: 'Arcana',
    type: 'Spell',
    recallCost: 0,
    description: "Spend a Hope to create a single, small floating orb that you can see through."
  },
  // Arcana Level 3
  {
    name: 'Counterspell',
    level: 3,
    domain: 'Arcana',
    type: 'Spell',
    recallCost: 2,
    description: "Interrupt a magical effect by making a reaction roll. On a success, the effect stops."
  },
  {
    name: 'Flight',
    level: 3,
    domain: 'Arcana',
    type: 'Spell',
    recallCost: 1,
    description: "Make a Spellcast Roll (15). On a success, gain a number of flying tokens equal to your Agility."
  },
  // Arcana Level 4
  {
    name: 'Blink Out',
    level: 4,
    domain: 'Arcana',
    type: 'Spell',
    recallCost: 1,
    description: "Make a Spellcast Roll (12). On a success, spend a Hope to teleport to another point you can see within Far range."
  },
  // Arcana Level 5
  {
    name: 'Premonition',
    level: 5,
    domain: 'Arcana',
    type: 'Spell',
    recallCost: 2,
    description: "Once per long rest, after a roll, you can rescind the move and its consequences and make another move instead."
  },
  // Blade Level 1
  {
    name: 'Get Back Up',
    level: 1,
    domain: 'Blade',
    type: 'Ability',
    recallCost: 1,
    description: "When you take Severe damage, you can mark a Stress to reduce the severity by one threshold."
  },
  {
    name: 'Not Good Enough',
    level: 1,
    domain: 'Blade',
    type: 'Ability',
    recallCost: 1,
    description: "When you roll your damage dice, you can reroll any 1s or 2s."
  },
  {
    name: 'Whirlwind',
    level: 1,
    domain: 'Blade',
    type: 'Ability',
    recallCost: 0,
    description: "On a successful attack, spend a Hope to use the attack against all other targets within Very Close range (they take half damage)."
  },
  // Blade Level 2
  {
    name: 'A Soldier\'s Bond',
    level: 2,
    domain: 'Blade',
    type: 'Ability',
    recallCost: 1,
    description: "Once per long rest, when you compliment someone, you can both gain 3 Hope."
  },
   {
    name: 'Reckless',
    level: 2,
    domain: 'Blade',
    type: 'Ability',
    recallCost: 1,
    description: "Mark a Stress to gain advantage on an attack."
  },
  // Blade Level 3
  {
    name: 'Scramble',
    level: 3,
    domain: 'Blade',
    type: 'Ability',
    recallCost: 1,
    description: "Once per rest, when a creature within Melee range would deal damage to you, you can avoid the attack and safely move out of Melee range."
  },
  // Blade Level 4
  {
    name: 'Deadly Focus',
    level: 4,
    domain: 'Blade',
    type: 'Ability',
    recallCost: 2,
    description: "Once per rest, apply all your focus toward a target of your choice. Until you attack another creature, you gain a +1 bonus to your Proficiency."
  },
   // Blade Level 5
  {
    name: 'Champion\'s Edge',
    level: 5,
    domain: 'Blade',
    type: 'Ability',
    recallCost: 1,
    description: "When you critically succeed on an attack, you can spend up to 3 Hope to clear a HP, clear an Armor Slot, or force the target to mark an additional HP."
  },
  // Bone Level 1
  {
    name: 'Deft Maneuvers',
    level: 1,
    domain: 'Bone',
    type: 'Ability',
    recallCost: 0,
    description: "Once per rest, mark a Stress to sprint anywhere within Far range. If you end in Melee, gain +1 on your attack roll."
  },
  {
    name: 'I See It Coming',
    level: 1,
    domain: 'Bone',
    type: 'Ability',
    recallCost: 1,
    description: "When targeted by a ranged attack, mark a Stress to roll a d4 and gain that as a bonus to Evasion."
  },
  {
    name: 'Untouchable',
    level: 1,
    domain: 'Bone',
    type: 'Ability',
    recallCost: 1,
    description: "Gain a bonus to your Evasion equal to half your Agility."
  },
    // Bone Level 2
  {
    name: 'Strategic Approach',
    level: 2,
    domain: 'Bone',
    type: 'Ability',
    recallCost: 1,
    description: "After a long rest, gain tokens to make an attack with advantage, clear a Stress on an ally, or add d8 to damage."
  },
  // Bone Level 3
  {
      name: 'Brace',
      level: 3,
      domain: 'Bone',
      type: 'Ability',
      recallCost: 1,
      description: 'When you mark an Armor Slot to reduce incoming damage, you can mark a Stress to mark an additional Armor Slot.'
  },
  // Codex Level 1
  {
    name: 'Book of Ava',
    level: 1,
    domain: 'Codex',
    type: 'Grimoire',
    recallCost: 2,
    description: "Contains: Power Push (knock back and damage), Tava's Armor (+1 Armor Score), Ice Spike (create weapon)."
  },
  {
    name: 'Book of Illiat',
    level: 1,
    domain: 'Codex',
    type: 'Grimoire',
    recallCost: 2,
    description: "Contains: Slumber (put target to sleep), Arcane Barrage (spend Hope for damage), Telepathy (mental communication)."
  },
  {
    name: 'Book of Tyfar',
    level: 1,
    domain: 'Codex',
    type: 'Grimoire',
    recallCost: 2,
    description: "Contains: Wild Flame (damage multiple targets), Magic Hand (conjure a hand), Mysterious Mist (create fog)."
  },
  // Codex Level 2
  {
    name: 'Book of Sitil',
    level: 2,
    domain: 'Codex',
    type: 'Grimoire',
    recallCost: 2,
    description: "Contains: Adjust Appearance (magical disguise), Parallela (hit an additional target), Illusion (create a visual illusion)."
  },
  // Codex Level 3
  {
    name: 'Book of Korvax',
    level: 3,
    domain: 'Codex',
    type: 'Grimoire',
    recallCost: 2,
    description: "Contains: Levitation, Recant (force target to forget), Rune Circle (damaging aura)."
  },
  // Codex Level 4
  {
    name: 'Book of Exota',
    level: 4,
    domain: 'Codex',
    type: 'Grimoire',
    recallCost: 3,
    description: "Contains: Repudiate (interrupt a magical effect), Create Construct (animate objects to fight for you)."
  },
  // Grace Level 1
  {
    name: 'Deft Deceiver',
    level: 1,
    domain: 'Grace',
    type: 'Ability',
    recallCost: 0,
    description: "Spend a Hope to gain advantage on a roll to deceive or trick someone."
  },
  {
    name: 'Enrapture',
    level: 1,
    domain: 'Grace',
    type: 'Spell',
    recallCost: 0,
    description: "Make a Spellcast Roll to make a target temporarily Enraptured, fixing their attention on you."
  },
  {
    name: 'Inspirational Words',
    level: 1,
    domain: 'Grace',
    type: 'Ability',
    recallCost: 1,
    description: "After a long rest, gain tokens to spend to let an ally clear a Stress, clear a HP, or gain a Hope."
  },
    // Grace Level 2
  {
    name: 'Troublemaker',
    level: 2,
    domain: 'Grace',
    type: 'Ability',
    recallCost: 2,
    description: "When you taunt a target, make a Presence Roll. On a success, they mark Stress equal to your Proficiency d4s."
  },
  // Grace Level 3
  {
    name: 'Invisibility',
    level: 3,
    domain: 'Grace',
    type: 'Spell',
    recallCost: 1,
    description: "Make a Spellcast Roll (10) and mark a Stress to make yourself or an ally Invisible."
  },
  // Midnight Level 1
  {
    name: 'Pick and Pull',
    level: 1,
    domain: 'Midnight',
    type: 'Ability',
    recallCost: 0,
    description: "You have advantage on action rolls to pick nonmagical locks, disarm traps, or steal items."
  },
  {
    name: 'Rain of Blades',
    level: 1,
    domain: 'Midnight',
    type: 'Spell',
    recallCost: 1,
    description: "Spend a Hope to make a Spellcast Roll and damage all targets in Very Close range. Vulnerable targets take extra damage."
  },
  {
    name: 'Uncanny Disguise',
    level: 1,
    domain: 'Midnight',
    type: 'Spell',
    recallCost: 0,
    description: "Mark a Stress to don the facade of any humanoid, granting advantage on Presence rolls to avoid scrutiny."
  },
    // Midnight Level 2
  {
    name: 'Midnight Spirit',
    level: 2,
    domain: 'Midnight',
    type: 'Spell',
    recallCost: 1,
    description: "Spend a Hope to summon a spirit that can move things or attack for you."
  },
  // Sage Level 1
  {
    name: 'Gifted Tracker',
    level: 1,
    domain: 'Sage',
    type: 'Ability',
    recallCost: 0,
    description: "When tracking, spend Hope to ask the GM questions from a list. Gain +1 Evasion against creatures you've tracked."
  },
  {
    name: 'Nature\'s Tongue',
    level: 1,
    domain: 'Sage',
    type: 'Ability',
    recallCost: 0,
    description: "Speak with plants and animals. Before a Spellcast roll in nature, spend a Hope for a +2 bonus."
  },
  {
    name: 'Vicious Entangle',
    level: 1,
    domain: 'Sage',
    type: 'Spell',
    recallCost: 1,
    description: "Make a Spellcast Roll to deal damage and temporarily Restrain a target. Spend Hope to Restrain another."
  },
    // Sage Level 2
  {
    name: 'Conjure Swarm',
    level: 2,
    domain: 'Sage',
    type: 'Spell',
    recallCost: 1,
    description: "Mark a Stress to conjure armored beetles to reduce damage, or spend Hope to damage all adversaries in Close range."
  },
  // Sage Level 3
  {
    name: 'Towering Stalk',
    level: 3,
    domain: 'Sage',
    type: 'Spell',
    recallCost: 1,
    description: "Once per rest, conjure a thick, climbable stalk up to Far range high. Can be used to attack."
  },
  // Sage Level 5
  {
    name: 'Wild Fortress',
    level: 5,
    domain: 'Sage',
    type: 'Spell',
    recallCost: 1,
    description: "Make a Spellcast Roll (13) and spend 2 Hope to grow a natural barricade that you and an ally can take cover within."
  },
  // Splendor Level 1
  {
    name: 'Bolt Beacon',
    level: 1,
    domain: 'Splendor',
    type: 'Spell',
    recallCost: 1,
    description: "Make a Spellcast Roll. On success, spend a Hope to damage a target, making them temporarily Vulnerable and causing them to glow."
  },
  {
    name: 'Mending Touch',
    level: 1,
    domain: 'Splendor',
    type: 'Spell',
    recallCost: 1,
    description: "Spend time to focus on a target, then spend 2 Hope to clear a Hit Point or a Stress on them."
  },
  {
    name: 'Reassurance',
    level: 1,
    domain: 'Splendor',
    type: 'Ability',
    recallCost: 0,
    description: "Once per rest, after an ally attempts an action roll, you can offer them assistance to let them reroll their dice."
  },
    // Splendor Level 2
  {
    name: 'Healing Hands',
    level: 2,
    domain: 'Splendor',
    type: 'Spell',
    recallCost: 1,
    description: "Make a Spellcast Roll (13) to heal a creature. On a success, mark a Stress to clear 2 HP or 2 Stress on the target."
  },
  // Splendor Level 3
  {
    name: 'Second Wind',
    level: 3,
    domain: 'Splendor',
    type: 'Ability',
    recallCost: 2,
    description: "Once per rest, when you succeed on an attack, you can clear 3 Stress or a Hit Point."
  },
  // Valor Level 1
  {
    name: 'Bare Bones',
    level: 1,
    domain: 'Valor',
    type: 'Ability',
    recallCost: 0,
    description: "When you choose not to equip armor, you have a base Armor Score of 3 + your Strength."
  },
  {
    name: 'Forceful Push',
    level: 1,
    domain: 'Valor',
    type: 'Ability',
    recallCost: 0,
    description: "On a successful melee attack, knock the target back. On a success with Hope, add d6 to your damage."
  },
  {
    name: 'I Am Your Shield',
    level: 1,
    domain: 'Valor',
    type: 'Ability',
    recallCost: 1,
    description: "When an ally within Very Close range would take damage, you can mark a Stress to become the target instead."
  },
  // Valor Level 2
  {
    name: 'Body Basher',
    level: 2,
    domain: 'Valor',
    type: 'Ability',
    recallCost: 1,
    description: "On a successful melee attack, gain a bonus to your damage roll equal to your Strength."
  },
  // Valor Level 4
  {
    name: 'Goad Them On',
    level: 4,
    domain: 'Valor',
    type: 'Ability',
    recallCost: 1,
    description: "Describe how you taunt a target and make a Presence Roll. On a success, they must attack you next with disadvantage."
  },
];