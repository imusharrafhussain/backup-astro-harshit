

export const zodiacSigns = [
  {
    name: 'Aries',
    dates: 'Mar 21 - Apr 19',
    element: 'Fire',
    planet: 'Mars',
    color: 'Crimson',
    number: '9',
    mood: 'Bold',
    energy: 92,
    traits: ['Brave starter', 'Fast decision maker', 'Direct communicator'],
    keywords: ['Action', 'Courage', 'Fresh start']
  },
  {
    name: 'Taurus',
    dates: 'Apr 20 - May 20',
    element: 'Earth',
    planet: 'Venus',
    color: 'Emerald',
    number: '6',
    mood: 'Grounded',
    energy: 78,
    traits: ['Patient builder', 'Loyal heart', 'Sensory thinker'],
    keywords: ['Patience', 'Comfort', 'Value']
  },
  {
    name: 'Gemini',
    dates: 'May 21 - Jun 20',
    element: 'Air',
    planet: 'Mercury',
    color: 'Sky blue',
    number: '5',
    mood: 'Curious',
    energy: 86,
    traits: ['Quick learner', 'Social connector', 'Idea collector'],
    keywords: ['Ideas', 'Dialogue', 'Movement']
  },
  {
    name: 'Cancer',
    dates: 'Jun 21 - Jul 22',
    element: 'Water',
    planet: 'Moon',
    color: 'Pearl',
    number: '2',
    mood: 'Intuitive',
    energy: 74,
    traits: ['Protective guide', 'Memory keeper', 'Deep feeler'],
    keywords: ['Care', 'Home', 'Instinct']
  },
  {
    name: 'Leo',
    dates: 'Jul 23 - Aug 22',
    element: 'Fire',
    planet: 'Sun',
    color: 'Gold',
    number: '1',
    mood: 'Radiant',
    energy: 89,
    traits: ['Warm leader', 'Creative force', 'Generous spirit'],
    keywords: ['Presence', 'Joy', 'Leadership']
  },
  {
    name: 'Virgo',
    dates: 'Aug 23 - Sep 22',
    element: 'Earth',
    planet: 'Mercury',
    color: 'Olive',
    number: '4',
    mood: 'Precise',
    energy: 81,
    traits: ['Clear analyst', 'Useful helper', 'Quiet optimizer'],
    keywords: ['Clarity', 'Service', 'Detail']
  },
  {
    name: 'Libra',
    dates: 'Sep 23 - Oct 22',
    element: 'Air',
    planet: 'Venus',
    color: 'Rose',
    number: '7',
    mood: 'Balanced',
    energy: 80,
    traits: ['Graceful mediator', 'Beauty seeker', 'Fair decision maker'],
    keywords: ['Harmony', 'Beauty', 'Choice']
  },
  {
    name: 'Scorpio',
    dates: 'Oct 23 - Nov 21',
    element: 'Water',
    planet: 'Mars',
    color: 'Maroon',
    number: '8',
    mood: 'Focused',
    energy: 87,
    traits: ['Depth reader', 'Strategic protector', 'Transformational force'],
    keywords: ['Depth', 'Power', 'Truth']
  },
  {
    name: 'Sagittarius',
    dates: 'Nov 22 - Dec 21',
    element: 'Fire',
    planet: 'Jupiter',
    color: 'Purple',
    number: '3',
    mood: 'Adventurous',
    energy: 91,
    traits: ['Big thinker', 'Truth seeker', 'Optimistic explorer'],
    keywords: ['Learning', 'Travel', 'Faith']
  },
  {
    name: 'Capricorn',
    dates: 'Dec 22 - Jan 19',
    element: 'Earth',
    planet: 'Saturn',
    color: 'Charcoal',
    number: '10',
    mood: 'Strategic',
    energy: 84,
    traits: ['Long-range planner', 'Disciplined builder', 'Practical realist'],
    keywords: ['Discipline', 'Legacy', 'Structure']
  },
  {
    name: 'Aquarius',
    dates: 'Jan 20 - Feb 18',
    element: 'Air',
    planet: 'Saturn',
    color: 'Electric blue',
    number: '11',
    mood: 'Inventive',
    energy: 88,
    traits: ['Future thinker', 'Community spark', 'Original problem solver'],
    keywords: ['Innovation', 'Community', 'Freedom']
  },
  {
    name: 'Pisces',
    dates: 'Feb 19 - Mar 20',
    element: 'Water',
    planet: 'Jupiter',
    color: 'Sea green',
    number: '12',
    mood: 'Dreamy',
    energy: 76,
    traits: ['Compassionate dreamer', 'Creative channel', 'Mystic listener'],
    keywords: ['Dreams', 'Compassion', 'Flow']
  }
]

export const getSign = (name) => zodiacSigns.find((sign) => sign.name === name) || zodiacSigns[0]
export const signIndex = (name) => zodiacSigns.findIndex((sign) => sign.name === name)

// --- Accurate Zodiac Date Logic ---
export const getSignFromDateValue = (value) => {
  if (!value) return ''

  const dateParts = value.split('-')
  if (dateParts.length !== 3) return ''

  const [, mStr, dStr] = dateParts
  const month = parseInt(mStr, 10)
  const day = parseInt(dStr, 10)

  if (isNaN(month) || isNaN(day)) return ''

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries'
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus'
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini'
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer'
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo'
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo'
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra'
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio'
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius'
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn'
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius'
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces'

  return ''
}

// --- Deterministic PRNG Logic ---
// Mulberry32 generator
function mulberry32(a) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

function cyrb128(str) {
  let h1 = 1779033703, h2 = 3144134277,
      h3 = 1013904242, h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
      k = str.charCodeAt(i);
      h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
      h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
      h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
      h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  return (h1^h2^h3^h4) >>> 0;
}

const getSeededRandom = (seedString) => {
  const seed = cyrb128(seedString)
  return mulberry32(seed)
}

const pickRandom = (arr, randomFn) => arr[Math.floor(randomFn() * arr.length)]

export const clampScore = (value) => Math.max(48, Math.min(98, value))

export const getDynamicScore = (signName, dateSeed, baseEnergy, offset = 0) => {
  const randomFn = getSeededRandom(`${signName}-${dateSeed}-score-${offset}`)
  // Score fluctuates within +/- 15 of base energy
  const variance = Math.floor(randomFn() * 31) - 15
  return clampScore(baseEnergy + variance)
}

// --- Astrological Text Generators ---
const textFragments = {
  general: {
    Fire: [
      "A spark of inspiration changes your direction today.",
      "Your natural confidence opens doors that were previously shut.",
      "Patience isn't your strong suit, but today it is required.",
      "A bold move brings unexpected but welcomed results."
    ],
    Earth: [
      "Practical decisions lead to a deep sense of security.",
      "Your steady pace outlasts those who rush.",
      "Ground yourself before making the next significant commitment.",
      "The seeds you planted in the past are finally showing growth."
    ],
    Air: [
      "A sudden shift in perspective clarifies an old problem.",
      "Communication is your strongest tool; use it wisely.",
      "Don't let scattered thoughts distract from your core intention.",
      "A new piece of information connects the missing dots."
    ],
    Water: [
      "Your intuition is louder than any logic right now.",
      "Protect your emotional energy and avoid absorbing others' tension.",
      "A wave of creativity allows you to express what words cannot.",
      "Trust the subtle feelings you get about a new situation."
    ]
  },
  overview: [
    "The planetary alignment highlights a need for balance.",
    "Expect the unexpected as celestial energies shift.",
    "A period of reflection provides the clarity you've sought.",
    "Momentum is building behind the scenes."
  ],
  love: [
    "Vulnerability is your greatest strength in connection right now.",
    "A small, honest conversation prevents a larger misunderstanding.",
    "Focus on shared values rather than minor differences.",
    "Allow the relationship space to breathe and evolve naturally."
  ],
  career: [
    "Focus on completing one major task rather than multitasking.",
    "Your leadership is needed, even if it's in a subtle way.",
    "A structural approach solves a lingering professional roadblock.",
    "Collaboration yields better results than solo efforts today."
  ],
  health: [
    "Movement is essential; prioritize physical grounding.",
    "Mental rest is just as important as physical exertion.",
    "Hydration and simple routines restore your vitality.",
    "Listen to your body's subtle cues regarding rest."
  ],
  luck: [
    "Fortune favors the prepared mind and the open heart.",
    "An unexpected coincidence acts as a guiding sign.",
    "Your lucky break comes through a trusted connection.",
    "Stay observant; opportunities are hidden in mundane moments."
  ],
  weeklyContext: [
    "As the week unfolds, your ruling planet provides extra momentum.",
    "Mid-week brings a turning point requiring a decisive choice.",
    "Pacing yourself early ensures you finish the week strong."
  ],
  monthlyContext: [
    "This lunar cycle emphasizes long-term growth over quick wins.",
    "The themes of this month revolve around rebuilding and renewing.",
    "A subtle, steady progression defines the weeks ahead."
  ],
  yearlyContext: [
    "This year marks a significant cycle of transformation and shedding old skins.",
    "Expect profound lessons in resilience and building true foundations.",
    "A year defined by expansive growth and challenging your self-imposed limits."
  ]
}

const generateReading = (sign, category, seedString) => {
  const randomFn = getSeededRandom(seedString)
  const elementFragment = pickRandom(textFragments.general[sign.element], randomFn)
  const categoryFragment = pickRandom(textFragments[category] || textFragments.overview, randomFn)
  
  // Combine element-specific insight with category-specific insight
  return `${elementFragment} ${categoryFragment}`
}

// Generate an entire reading object (overview, love, career, health, luck)
export const getReadingSet = (signName, dateSeed, context = 'daily') => {
  const sign = getSign(signName)
  const randomFn = getSeededRandom(`${signName}-${dateSeed}-context`)
  
  let contextAddon = ""
  if (context === 'weekly') contextAddon = pickRandom(textFragments.weeklyContext, randomFn) + " "
  if (context === 'monthly') contextAddon = pickRandom(textFragments.monthlyContext, randomFn) + " "
  if (context === 'yearly') contextAddon = pickRandom(textFragments.yearlyContext, randomFn) + " "

  return {
    overview: contextAddon + generateReading(sign, 'overview', `${signName}-${dateSeed}-overview`),
    love: generateReading(sign, 'love', `${signName}-${dateSeed}-love`),
    career: generateReading(sign, 'career', `${signName}-${dateSeed}-career`),
    health: generateReading(sign, 'health', `${signName}-${dateSeed}-health`),
    luck: generateReading(sign, 'luck', `${signName}-${dateSeed}-luck`)
  }
}
