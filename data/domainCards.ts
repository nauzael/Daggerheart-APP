export interface DomainCard {
  name: string;
  domain: string;
  level: number;
  type: string;
  description: string;
  recallCost?: number;
}

export const DOMAIN_CARDS: DomainCard[] = [
  // Arcana
  { name: "Rune Ward", domain: "Arcana", level: 1, type: "Spell", recallCost: 0, description: "Your personal trinket can be held by you or an ally. The holder can spend a Hope to reduce incoming damage by 1d8. If the result is 8, the ward's power ends." },
  { name: "Unleash Chaos", domain: "Arcana", level: 1, type: "Spell", recallCost: 1, description: "Spend tokens (max equal to your Spellcast trait) to deal that many d10s of magic damage on a successful Spellcast Roll. Mark a Stress to replenish tokens." },
  { name: "Wall Walk", domain: "Arcana", level: 1, type: "Spell", recallCost: 1, description: "Spend a Hope to allow a creature you touch to climb on walls and ceilings as easily as walking. Lasts until the end of the scene." },
  { name: "Cinder Grasp", domain: "Arcana", level: 2, type: "Spell", recallCost: 1, description: "On a successful Spellcast Roll vs a Melee target, they take 1d20+3 magic damage and are lit On Fire, taking an extra 2d6 magic damage when they act." },
  { name: "Floating Eye", domain: "Arcana", level: 2, type: "Spell", recallCost: 0, description: "Spend a Hope to create a small floating orb that you can see through and move anywhere within Very Far range." },
  { name: "Counterspell", domain: "Arcana", level: 3, type: "Spell", recallCost: 2, description: "Interrupt a magical effect by making a reaction roll with your Spellcast trait. On a success, the effect stops. This card is placed in your vault." },
  { name: "Flight", domain: "Arcana", level: 3, type: "Spell", recallCost: 1, description: "On a Spellcast Roll (15), place tokens equal to your Agility on this card. Spend a token when you make an action roll while flying." },
  { name: "Blink Out", domain: "Arcana", level: 4, type: "Spell", recallCost: 1, description: "On a Spellcast Roll (12), spend a Hope to teleport to a point you can see within Far range. Spend additional Hope to bring willing creatures with you." },
  { name: "Preservation Blast", domain: "Arcana", level: 4, type: "Spell", recallCost: 2, description: "Make a Spellcast Roll against all targets in Melee. Successful targets are forced back to Far range and take d8+3 magic damage." },
  { name: "Chain Lightning", domain: "Arcana", level: 5, type: "Spell", recallCost: 1, description: "Mark 2 Stress to make a Spellcast Roll, unleashing lightning on all targets in Close range. They must make a reaction roll vs your Spellcast Roll or take 2d8+4 magic damage. It can chain to other adversaries." },
  { name: "Premonition", domain: "Arcana", level: 5, type: "Spell", recallCost: 2, description: "Once per long rest, after a roll you made, you can rescind the move and its consequences and make another move instead." },
  { name: "Rift Walker", domain: "Arcana", level: 6, type: "Spell", recallCost: 2, description: "On a Spellcast Roll (15), place an arcane marking. The next time you successfully cast Rift Walker, a rift opens to that spot." },
  { name: "Telekinesis", domain: "Arcana", level: 6, type: "Spell", recallCost: 0, description: "Make a Spellcast Roll against a target in Far range to move them with your mind. You can throw them as an attack." },
  { name: "Arcana-Touched", domain: "Arcana", level: 7, type: "Ability", recallCost: 2, description: "When 4+ Arcana cards are in your loadout, you get +1 to Spellcast Rolls and once per rest can switch your Hope and Fear Dice results." },
  { name: "Cloaking Blast", domain: "Arcana", level: 7, type: "Spell", recallCost: 2, description: "When you make a successful Spellcast Roll, you can spend a Hope to become Cloaked." },
  { name: "Arcane Reflection", domain: "Arcana", level: 8, type: "Spell", recallCost: 1, description: "When you would take magic damage, spend any number of Hope to roll that many d6s. If any roll a 6, the attack is reflected back to the caster." },
  { name: "Confusing Aura", domain: "Arcana", level: 8, type: "Spell", recallCost: 2, description: "On a Spellcast Roll (14), create an illusionary aura. When attacked, roll d6s equal to aura layers. On a 5+, the attack fails and a layer is destroyed." },
  { name: "Earthquake", domain: "Arcana", level: 9, type: "Spell", recallCost: 2, description: "On a Spellcast Roll (16), all non-flying targets in Very Far range must make a Reaction Roll (18) or take 3d10+8 physical damage and become Vulnerable." },
  { name: "Sensory Projection", domain: "Arcana", level: 9, type: "Spell", recallCost: 0, description: "On a Spellcast Roll (15), enter a vision to see and hear any place you have been before. You can move freely in this vision." },
  { name: "Adjust Reality", domain: "Arcana", level: 10, type: "Spell", recallCost: 1, description: "After any roll, you can spend 5 Hope to change the numerical result of that roll to a result of your choice." },
  { name: "Falling Sky", domain: "Arcana", level: 10, type: "Spell", recallCost: 1, description: "Make a Spellcast Roll against all adversaries in Far range. Mark Stress to make shards of arcana rain down, dealing 1d20+2 magic damage per Stress marked." },
  
  // Blade
  { name: "Get Back Up", domain: "Blade", level: 1, type: "Ability", recallCost: 1, description: "When you take Severe damage, mark a Stress to reduce the severity by one threshold." },
  { name: "Not Good Enough", domain: "Blade", level: 1, type: "Ability", recallCost: 1, description: "When you roll your damage dice, you can reroll any 1s or 2s." },
  { name: "Whirlwind", domain: "Blade", level: 1, type: "Ability", recallCost: 0, description: "On a successful attack, spend a Hope to use the attack against all other targets in Very Close range for half damage." },
  { name: "A Soldier's Bond", domain: "Blade", level: 2, type: "Ability", recallCost: 1, description: "Once per long rest, when you compliment someone, you can both gain 3 Hope." },
  { name: "Reckless", domain: "Blade", level: 2, type: "Ability", recallCost: 1, description: "Mark a Stress to gain advantage on an attack." },
  { name: "Scramble", domain: "Blade", level: 3, type: "Ability", recallCost: 1, description: "Once per rest, when a creature in Melee would damage you, you can avoid it and safely move out of Melee range." },
  { name: "Versatile Fighter", domain: "Blade", level: 3, type: "Ability", recallCost: 1, description: "You can use a different character trait for an equipped weapon. When you deal damage, mark a Stress to use the maximum result of one damage die." },
  { name: "Deadly Focus", domain: "Blade", level: 4, type: "Ability", recallCost: 2, description: "Once per rest, apply your focus to a target. Until you attack another creature or the battle ends, gain +1 Proficiency against them." },
  { name: "Fortified Armor", domain: "Blade", level: 4, type: "Ability", recallCost: 0, description: "While wearing armor, gain a +2 bonus to your damage thresholds." },
  { name: "Champion's Edge", domain: "Blade", level: 5, type: "Ability", recallCost: 1, description: "When you critically succeed on an attack, spend up to 3 Hope to clear a Hit Point, clear an Armor Slot, or make the target mark an additional Hit Point." },
  { name: "Vitality", domain: "Blade", level: 5, type: "Ability", recallCost: 0, description: "Permanently gain two of the following: One Stress slot, One Hit Point slot, or +2 to your damage thresholds. Place this card in your vault permanently." },
  { name: "Battle-Hardened", domain: "Blade", level: 6, type: "Ability", recallCost: 2, description: "Once per long rest, when you would make a Death Move, spend a Hope to clear a Hit Point instead." },
  { name: "Rage Up", domain: "Blade", level: 6, type: "Ability", recallCost: 1, description: "Before an attack, mark a Stress to gain a bonus to your damage roll equal to twice your Strength. You can do this twice per attack." },
  { name: "Blade-Touched", domain: "Blade", level: 7, type: "Ability", recallCost: 1, description: "When 4+ Blade cards are in your loadout, gain +2 to attack rolls and +4 to your Severe damage threshold." },
  { name: "Glancing Blow", domain: "Blade", level: 7, type: "Ability", recallCost: 1, description: "When you fail an attack, mark a Stress to deal weapon damage using half your Proficiency." },
  { name: "Battle Cry", domain: "Blade", level: 8, type: "Ability", recallCost: 2, description: "Once per long rest, you can inspire your allies. They each clear a Stress and gain a Hope, and have advantage on attack rolls until a failure with Fear." },
  { name: "Frenzy", domain: "Blade", level: 8, type: "Ability", recallCost: 3, description: "Once per long rest, go into a Frenzy. You can't use Armor Slots, but gain +10 to damage rolls and +8 to your Severe damage threshold." },
  { name: "Gore and Glory", domain: "Blade", level: 9, type: "Ability", recallCost: 2, description: "On a critical weapon attack or when you defeat an enemy, gain a Hope or clear a Stress." },
  { name: "Reaper's Strike", domain: "Blade", level: 9, type: "Ability", recallCost: 3, description: "Once per long rest, spend a Hope to make an attack roll. Choose a target it would succeed against and force them to mark 5 Hit Points." },
  { name: "Battle Monster", domain: "Blade", level: 10, type: "Ability", recallCost: 0, description: "On a successful attack, mark 4 Stress to force the target to mark a number of Hit Points equal to the number you currently have marked." },
  { name: "Onslaught", domain: "Blade", level: 10, type: "Ability", recallCost: 3, description: "Your weapon attacks never deal less than Major damage. Also, when an ally is damaged, you can mark a Stress to force the attacker to make a Reaction Roll (15) or mark a Hit Point." },

  // Bone
  { name: "Deft Maneuvers", domain: "Bone", level: 1, type: "Ability", recallCost: 0, description: "Once per rest, mark a Stress to sprint anywhere in Far range. If you end in Melee of an adversary and attack, gain +1 to the attack roll." },
  { name: "I See It Coming", domain: "Bone", level: 1, type: "Ability", recallCost: 1, description: "When targeted by a ranged attack, mark a Stress to roll a d4 and add it to your Evasion." },
  { name: "Untouchable", domain: "Bone", level: 1, type: "Ability", recallCost: 1, description: "Gain a bonus to your Evasion equal to half your Agility." },
  { name: "Ferocity", domain: "Bone", level: 2, type: "Ability", recallCost: 2, description: "When an adversary marks 1 or more HP, spend 2 Hope to increase your Evasion by that amount until after the next attack made against you." },
  { name: "Strategic Approach", domain: "Bone", level: 2, type: "Ability", recallCost: 1, description: "After a long rest, place tokens equal to your Knowledge. The first time you attack an adversary from Close range, spend a token for an effect." },
  { name: "Brace", domain: "Bone", level: 3, type: "Ability", recallCost: 1, description: "When you mark an Armor Slot, you can mark a Stress to mark an additional one." },
  { name: "Tactician", domain: "Bone", level: 3, type: "Ability", recallCost: 1, description: "When you Help an Ally, they can spend a Hope to add one of your Experiences. When making a Tag Team Roll, you can roll a d20 as your Hope Die." },
  
  // Codex
  { name: "Book of Ava", domain: "Codex", level: 1, type: "Grimoire", recallCost: 2, description: "Contains Power Push, Tava's Armor, and Ice Spike spells." },
  { name: "Book of Illiat", domain: "Codex", level: 1, type: "Grimoire", recallCost: 2, description: "Contains Slumber, Arcane Barrage, and Telepathy spells." },
  { name: "Book of Tyfar", domain: "Codex", level: 1, type: "Grimoire", recallCost: 2, description: "Contains Wild Flame, Magic Hand, and Mysterious Mist spells." },

  // Grace
  { name: "Deft Deceiver", domain: "Grace", level: 1, type: "Ability", recallCost: 0, description: "Spend a Hope to gain advantage on a roll to deceive or trick someone." },
  { name: "Enrapture", domain: "Grace", level: 1, type: "Spell", recallCost: 0, description: "On a successful Spellcast Roll, a target becomes temporarily Enraptured, fixing their attention on you." },
  { name: "Inspirational Words", domain: "Grace", level: 1, type: "Ability", recallCost: 1, description: "After a long rest, place tokens equal to your Presence. Spend a token to give an ally a benefit (clear Stress, clear HP, or gain Hope)." },

  // Midnight
  { name: "Pick and Pull", domain: "Midnight", level: 1, type: "Ability", recallCost: 0, description: "You have advantage on action rolls to pick nonmagical locks, disarm nonmagical traps, or steal items from a target." },
  { name: "Rain of Blades", domain: "Midnight", level: 1, type: "Spell", recallCost: 1, description: "Spend a Hope to make a Spellcast Roll and deal d8+2 magic damage to all targets in Very Close range. Vulnerable targets take an extra 1d8." },
  { name: "Uncanny Disguise", domain: "Midnight", level: 1, type: "Spell", recallCost: 0, description: "Mark a Stress to take on the facade of any humanoid. Spend tokens placed on this card when you take actions. Disguise drops when tokens run out." },

  // Sage
  { name: "Gifted Tracker", domain: "Sage", level: 1, type: "Ability", recallCost: 0, description: "When tracking, you can spend Hope to ask the GM questions from a list." },
  { name: "Nature's Tongue", domain: "Sage", level: 1, type: "Ability", recallCost: 0, description: "On a successful Instinct Roll (12), you can speak with plants and animals." },
  { name: "Vicious Entangle", domain: "Sage", level: 1, type: "Spell", recallCost: 1, description: "On a successful Spellcast Roll, deal 1d8+1 physical damage and temporarily Restrain a target. Can spend Hope to restrain another." },

  // Splendor
  { name: "Bolt Beacon", domain: "Splendor", level: 1, type: "Spell", recallCost: 1, description: "On a successful Spellcast Roll, spend a Hope to deal d8+2 magic damage and make the target temporarily Vulnerable and glow." },
  { name: "Mending Touch", domain: "Splendor", level: 1, type: "Spell", recallCost: 1, description: "When you can take a few minutes, spend 2 Hope to clear a Hit Point or a Stress on a target." },
  { name: "Reassurance", domain: "Splendor", level: 1, type: "Ability", recallCost: 0, description: "Once per rest, after an ally attempts an action roll, you can offer support to let them reroll their dice." },

  // Valor
  { name: "Bare Bones", domain: "Valor", level: 1, type: "Ability", recallCost: 0, description: "When you don't equip armor, your base Armor Score is 3 + your Strength, with its own damage thresholds." },
  { name: "Forceful Push", domain: "Valor", level: 1, type: "Ability", recallCost: 0, description: "On a successful Melee attack, knock the target back to Close range. On a success with Hope, add a d6 to your damage roll." },
  { name: "I Am Your Shield", domain: "Valor", level: 1, type: "Ability", recallCost: 1, description: "When an ally in Very Close range would take damage, mark a Stress to become the target of the attack instead." }
];