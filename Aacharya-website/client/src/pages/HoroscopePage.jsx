import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Activity,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Clock,
  Compass,
  Gem,
  Heart,
  Layers,
  Lock,
  Moon,
  RefreshCw,
  Sparkles,
  Star,
  Sun,
  Target,
  Trophy,
  Users,
} from 'lucide-react'

import zodiacAquarius from '../assets/AQUARIOUS.jpg.jpeg'
import zodiacAries from '../assets/ARIES.jpg.jpeg'
import zodiacCancer from '../assets/CANCER.jpg.jpeg'
import zodiacCapricorn from '../assets/CAPRICORN.jpg.jpeg'
import zodiacGemini from '../assets/GEMINI.jpg.jpeg'
import zodiacLeo from '../assets/ZODIACLEO.jpeg'
import zodiacLibra from '../assets/LIBRA.jpg.jpeg'
import zodiacPisces from '../assets/PISCES.jpg.jpeg'
import zodiacSagittarius from '../assets/SAGITTAURUS.jpg.jpeg'
import zodiacScorpio from '../assets/SCORPIO.jpg.jpeg'
import zodiacTaurus from '../assets/TAURUS.jpg.jpeg'
import zodiacVirgo from '../assets/VIRGO.jpg.jpeg'
import './HoroscopePage.css'

import {
  zodiacSigns as baseZodiacSigns,
  getSign as baseGetSign,
  signIndex,
  getSignFromDateValue,
  getReadingSet,
  getDynamicScore,
  clampScore
} from '../utils/horoscopeUtils'

const zodiacImages = {
  Aries: zodiacAries,
  Taurus: zodiacTaurus,
  Gemini: zodiacGemini,
  Cancer: zodiacCancer,
  Leo: zodiacLeo,
  Virgo: zodiacVirgo,
  Libra: zodiacLibra,
  Scorpio: zodiacScorpio,
  Sagittarius: zodiacSagittarius,
  Capricorn: zodiacCapricorn,
  Aquarius: zodiacAquarius,
  Pisces: zodiacPisces
}

const zodiacSigns = baseZodiacSigns.map(sign => ({
  ...sign,
  image: zodiacImages[sign.name]
}))

const pageLinks = [
  { type: 'daily', label: 'Today' },
  { type: 'weekly', label: 'Weekly' },
  { type: 'monthly', label: 'Monthly' },
  { type: 'yearly', label: 'Yearly' },
  { type: 'zodiac-signs', label: 'Zodiac Signs' },
]

const focusAreas = [
  { key: 'overview', label: 'Overview', icon: Sparkles },
  { key: 'love', label: 'Love', icon: Heart },
  { key: 'career', label: 'Career', icon: Briefcase },
  { key: 'health', label: 'Health', icon: Activity },
  { key: 'luck', label: 'Luck', icon: Star },
]

const weeklyDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const monthAreas = ['Love', 'Career', 'Health', 'Luck']
const moonPhases = ['Seed', 'Rise', 'Peak', 'Release']
const quarters = ['Q1 Foundation', 'Q2 Growth', 'Q3 Visibility', 'Q4 Integration']

const getSign = (name) => {
  const sign = baseGetSign(name);
  return { ...sign, image: zodiacImages[sign.name] };
}

const getTodayLabel = () =>
  new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

const getMonthLabel = () =>
  new Intl.DateTimeFormat('en-IN', {
    month: 'long',
    year: 'numeric',
  }).format(new Date())

const getWeeklyDateLabel = (dayIndex) => {
  const date = new Date()
  const currentDay = date.getDay()
  const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay
  
  const targetDate = new Date(date)
  targetDate.setDate(date.getDate() + distanceToMonday + dayIndex)
  
  return new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' }).format(targetDate)
}

const dayModes = [
  { key: 'Morning', label: 'Morning', note: 'Start with one clean priority and keep the first hour focused.' },
  { key: 'Afternoon', label: 'Afternoon', note: 'Handle conversations, updates, and practical follow-through.' },
  { key: 'Night', label: 'Night', note: 'Slow the pace, note what worked, and leave tomorrow lighter.' },
]

const monthlyPrompts = {
  Seed: 'Set one honest intention and choose the smallest first step.',
  Rise: 'Build momentum with steady routines and one useful conversation.',
  Peak: 'Show your work, ask clearly, and let visibility support progress.',
  Release: 'Clear clutter, close loops, and make room for a better pattern.',
}

const quarterMilestones = [
  ['Clean foundation', 'Start one habit', 'Ask for support'],
  ['Share your work', 'Grow one skill', 'Review money'],
  ['Be visible', 'Choose the right room', 'Protect energy'],
  ['Complete old loops', 'Celebrate progress', 'Plan gently'],
]

const useStoredState = (key, initialValue) => {
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') return initialValue

    try {
      const saved = window.localStorage.getItem(key)
      const parsed = saved ? JSON.parse(saved) : null
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
        ? { ...initialValue, ...parsed }
        : initialValue
    } catch {
      return initialValue
    }
  })
  const [savedAt, setSavedAt] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      window.localStorage.setItem(key, JSON.stringify(state))
      setSavedAt(new Intl.DateTimeFormat('en-IN', {
        hour: 'numeric',
        minute: '2-digit',
      }).format(new Date()))
    } catch {
      // Storage is optional for the experience.
    }
  }, [key, state])

  return [state, setState, savedAt]
}

const getInfoCardOffset = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return 16

  const rootStyles = window.getComputedStyle(document.documentElement)
  const headerHeight = Number.parseFloat(rootStyles.getPropertyValue('--header-height')) || 0
  return headerHeight + 16
}

const scrollInfoCardIntoView = (element) => {
  if (typeof window === 'undefined' || !element) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const top = element.getBoundingClientRect().top + window.scrollY - getInfoCardOffset()

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
  })
}

const useInfoCardScroll = () => {
  const infoCardRef = useRef(null)

  const revealInfoCard = () => {
    if (!infoCardRef.current) return
    scrollInfoCardIntoView(infoCardRef.current)
  }

  return { infoCardRef, revealInfoCard }
}

const HoroscopeNav = ({ activeType }) => (
  <nav className="horo-mode-tabs" aria-label="Horoscope pages">
    {pageLinks.map((item) => (
      <Link
        key={item.type}
        to={`/horoscope/${item.type}`}
        className={`horo-mode-tab ${activeType === item.type ? 'is-active' : ''}`}
        aria-current={activeType === item.type ? 'page' : undefined}
      >
        {item.label}
      </Link>
    ))}
  </nav>
)

const PageHero = ({ activeType, eyebrow, title, subtitle, description, icon: Icon, children }) => (
  <section className="horo-hero" aria-labelledby={`${activeType}-title`}>
    <div className="container horo-hero-inner">
      <div className="horo-hero-copy">
        <div className="horo-eyebrow">
          <Icon aria-hidden="true" />
          <span>{eyebrow}</span>
        </div>
        <h1 id={`${activeType}-title`}>{title}</h1>
        <p className="horo-hero-subtitle">{subtitle}</p>
        <p className="horo-hero-description">{description}</p>
        <HoroscopeNav activeType={activeType} />
      </div>
      <div className="horo-hero-visual">
        {children}
      </div>
    </div>
  </section>
)

const GuidePanel = ({ savedAt, steps, status, onReset }) => (
  <div className="container">
    <div className="horo-guide-panel">
      <div className="horo-guide-item">
        <CheckCircle2 aria-hidden="true" />
        <div>
          <strong>Guided experience</strong>
          <span>{status}</span>
        </div>
      </div>
      <div className="horo-guide-item">
        <Clock aria-hidden="true" />
        <div>
          <strong>{savedAt ? `Autosaved ${savedAt}` : 'Autosave ready'}</strong>
          <span>Your choices stay on this device only.</span>
        </div>
      </div>
      <div className="horo-guide-steps" aria-label="Quick steps">
        {steps.map((step, index) => (
          <span key={step}>
            <b>{index + 1}</b>
            {step}
          </span>
        ))}
      </div>
      {onReset && (
        <button type="button" className="horo-outline-button" onClick={onReset}>
          <RefreshCw aria-hidden="true" />
          <span>Reset</span>
        </button>
      )}
    </div>
  </div>
)

const ZodiacMiniCard = ({ sign, isActive, onClick, compact = false }) => (
  <button
    type="button"
    className={`horo-zodiac-mini ${isActive ? 'is-active' : ''} ${compact ? 'is-compact' : ''}`}
    onClick={() => onClick(sign.name)}
    aria-pressed={isActive}
  >
    <img src={sign.image} alt="" aria-hidden="true" />
    <span>
      <strong>{sign.name}</strong>
      <small>{sign.element} - {sign.planet}</small>
    </span>
  </button>
)

const EmptyWheel = ({ label, value }) => (
  <div className="horo-wheel-card" aria-label={label}>
    <div className="horo-wheel">
      <div className="horo-wheel-ring horo-wheel-ring-outer" />
      <div className="horo-wheel-ring horo-wheel-ring-inner" />
      <Sun className="horo-wheel-sun" aria-hidden="true" />
      {Array.from({ length: 8 }).map((_, index) => (
        <span
          key={index}
          className="horo-wheel-mark"
          style={{ '--mark-index': index }}
          aria-hidden="true"
        />
      ))}
    </div>
    <div className="horo-hero-stats">
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
      <div>
        <strong>12</strong>
        <span>Signs</span>
      </div>
      <div>
        <strong>Free</strong>
        <span>Interactive</span>
      </div>
    </div>
  </div>
)

const DailyHoroscopePage = ({ todayLabel }) => {
  const { infoCardRef, revealInfoCard } = useInfoCardScroll()
  const [state, setState, savedAt] = useStoredState('daily-horoscope-state', {
    sign: 'Aries',
    focus: 'overview',
    ritual: 'Light schedule',
    pace: 'Morning',
  })

  const activeSign = getSign(state.sign)
  const activeFocus = focusAreas.find((area) => area.key === state.focus) || focusAreas[0]
  const ActiveIcon = activeFocus.icon
  const rituals = ['Light schedule', 'Focused call', 'Quiet walk', 'Gratitude note', 'Desk reset']
  const activeMode = dayModes.find((mode) => mode.key === state.pace) || dayModes[0]

  const currentReading = useMemo(() => getReadingSet(activeSign.name, todayLabel, 'daily'), [activeSign.name, todayLabel])

  const setSign = (sign) => {
    setState((prev) => ({ ...prev, sign }))
    revealInfoCard()
  }
  const setFocus = (focus) => setState((prev) => ({ ...prev, focus }))
  const shuffleRitual = () => {
    const nextIndex = (rituals.indexOf(state.ritual) + 1) % rituals.length
    setState((prev) => ({ ...prev, ritual: rituals[nextIndex] }))
  }

  return (
    <div className="page-wrapper horoscope-page">
      <PageHero
        activeType="daily"
        eyebrow="Daily cosmic briefing"
        title="Today's Horoscope"
        subtitle={`Fresh zodiac guidance for ${todayLabel}`}
        description="Pick your sign, switch focus areas, and keep a simple daily ritual that matches the mood of the stars."
        icon={Moon}
      >
        <EmptyWheel label="Today" value={activeSign.energy} />
      </PageHero>

      <GuidePanel
        savedAt={savedAt}
        status={`Start with ${activeSign.name}, then switch focus or day mode anytime.`}
        steps={['Pick sign', 'Choose focus', 'Save ritual']}
        onReset={() => setState({ sign: 'Aries', focus: 'overview', ritual: 'Light schedule', pace: 'Morning' })}
      />

      <section className="horo-section">
        <div className="container horo-daily-layout">
          <aside ref={infoCardRef} className="horo-reading-panel" aria-live="polite">
            <div className="horo-reading-header">
              <img src={activeSign.image} alt={`${activeSign.name} zodiac sign`} />
              <div>
                <span>{activeSign.dates}</span>
                <h2>{activeSign.name}</h2>
                <p>{activeSign.mood} energy with {activeSign.element.toLowerCase()} influence</p>
              </div>
            </div>

            <div className="horo-focus-tabs" role="tablist" aria-label={`${activeSign.name} focus`}>
              {focusAreas.map((area) => {
                const Icon = area.icon
                return (
                  <button
                    key={area.key}
                    type="button"
                    className={`horo-focus-tab ${state.focus === area.key ? 'is-active' : ''}`}
                    onClick={() => setFocus(area.key)}
                    role="tab"
                    aria-selected={state.focus === area.key}
                  >
                    <Icon aria-hidden="true" />
                    <span>{area.label}</span>
                  </button>
                )
              })}
            </div>

            <div className="horo-reading-body horo-typed">
              <div className="horo-reading-badge">
                <ActiveIcon aria-hidden="true" />
                <span>{activeFocus.label}</span>
              </div>
              <p>{currentReading[state.focus]}</p>
            </div>

            <div className="horo-score-list">
              {focusAreas.slice(1).map((area, index) => (
                <div className="horo-score-item" key={area.key}>
                  <span>{area.label}</span>
                  <div className="horo-score-track">
                    <span style={{ width: `${getDynamicScore(activeSign.name, todayLabel, activeSign.energy, index)}%` }} />
                  </div>
                  <strong>{getDynamicScore(activeSign.name, todayLabel, activeSign.energy, index)}%</strong>
                </div>
              ))}
            </div>

            <div className="horo-lucky-row">
              <span><Star aria-hidden="true" /> Lucky color: {activeSign.color}</span>
              <span><Compass aria-hidden="true" /> Lucky number: {activeSign.number}</span>
            </div>
          </aside>

          <div className="horo-signs-area">
            <div className="horo-section-heading">
              <span>Choose your sign</span>
              <h2>Daily Zodiac Deck</h2>
            </div>

            <div className="horo-sign-grid">
              {zodiacSigns.map((sign) => (
                <button
                  key={sign.name}
                  type="button"
                  className={`horo-sign-card ${activeSign.name === sign.name ? 'is-active' : ''}`}
                  onClick={() => setSign(sign.name)}
                  aria-pressed={activeSign.name === sign.name}
                >
                  <span className="horo-card-image">
                    <img src={sign.image} alt="" aria-hidden="true" />
                    <span className="horo-energy-pill">{sign.energy}% Energy</span>
                  </span>
                  <span className="horo-card-content">
                    <span className="horo-card-meta">{sign.dates}</span>
                    <strong>{sign.name}</strong>
                    <span>{sign.element} sign ruled by {sign.planet}</span>
                  </span>
                  <span className="horo-card-footer">
                    {sign.keywords.map((keyword) => (
                      <span key={keyword}>{keyword}</span>
                    ))}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="horo-support-grid">
            <div className="horo-free-tool horo-ritual-tool">
              <div>
                <span className="horo-mini-label">Daily ritual</span>
                <h3>{state.ritual}</h3>
                <p>{activeSign.name} benefits from a small action that makes the day feel intentional and light.</p>
              </div>
              <button type="button" className="horo-icon-button" onClick={shuffleRitual}>
                <RefreshCw aria-hidden="true" />
                <span>Refresh Ritual</span>
              </button>
            </div>

            <div className="horo-action-panel">
              <div>
                <span className="horo-mini-label">Day mode</span>
                <h3>{activeMode.label} guidance</h3>
                <p>{activeMode.note}</p>
              </div>
              <div className="horo-segmented" role="group" aria-label="Choose day mode">
                {dayModes.map((mode) => (
                  <button
                    key={mode.key}
                    type="button"
                    className={state.pace === mode.key ? 'is-active' : ''}
                    onClick={() => setState((prev) => ({ ...prev, pace: mode.key }))}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const WeeklyHoroscopePage = () => {
  const { infoCardRef, revealInfoCard } = useInfoCardScroll()
  const [state, setState, savedAt] = useStoredState('weekly-horoscope-state', {
    sign: 'Leo',
    day: 0,
    focus: 'career',
    completed: [],
    intention: '',
  })

  const activeSign = getSign(state.sign)
  const activeDay = weeklyDays[state.day] || weeklyDays[0]
  const activeFocus = focusAreas.find((area) => area.key === state.focus) || focusAreas[2]
  const weeklySeed = getWeeklyDateLabel(state.day) + '-week'
  const currentReading = useMemo(() => getReadingSet(activeSign.name, weeklySeed, 'weekly'), [activeSign.name, weeklySeed])
  
  const weeklyTasks = [
    `Lead with ${activeSign.keywords[0].toLowerCase()}`,
    `Protect one hour for ${activeFocus.label.toLowerCase()}`,
    `Use your ${activeSign.element.toLowerCase()} nature with discipline`,
  ]
  const dayEnergy = getDynamicScore(activeSign.name, weeklySeed, activeSign.energy, state.day + focusAreas.findIndex((area) => area.key === state.focus))
  const completedCount = weeklyTasks.filter((task) => state.completed.includes(task)).length
  const progress = Math.round((completedCount / weeklyTasks.length) * 100)

  const setPartial = (patch) => setState((prev) => ({ ...prev, ...patch }))
  const setPartialAndReveal = (patch) => {
    setPartial(patch)
    revealInfoCard()
  }
  const toggleTask = (task) => {
    setState((prev) => ({
      ...prev,
      completed: prev.completed.includes(task)
        ? prev.completed.filter((item) => item !== task)
        : [...prev.completed, task],
    }))
  }

  return (
    <div className="page-wrapper horoscope-page weekly-horoscope-page">
      <PageHero
        activeType="weekly"
        eyebrow="Week ahead"
        title="Weekly Horoscope"
        subtitle="Build a seven-day cosmic action plan"
        description="Choose a sign, tap through the week, and save an intention that stays ready when you return."
        icon={CalendarDays}
      >
        <div className="horo-week-visual">
          {weeklyDays.map((day, index) => (
            <button
              key={day}
              type="button"
              className={`horo-orbit-day ${state.day === index ? 'is-active' : ''}`}
              style={{ '--day-index': index }}
              onClick={() => setPartialAndReveal({ day: index })}
            >
              {day}
            </button>
          ))}
          <div className="horo-week-core">
            <CalendarDays aria-hidden="true" />
            <strong>{dayEnergy}%</strong>
            <span>Energy</span>
          </div>
        </div>
      </PageHero>

      <GuidePanel
        savedAt={savedAt}
        status={`${activeSign.name} is set for ${activeDay}. Your checklist is ${progress}% complete.`}
        steps={['Choose sign', 'Tap day', 'Track actions']}
        onReset={() => setState({ sign: 'Leo', day: 0, focus: 'career', completed: [], intention: '' })}
      />

      <section className="horo-section">
        <div className="container horo-week-layout">
          <div className="horo-side-selector">
            <div className="horo-section-heading">
              <span>Sign</span>
              <h2>Weekly Guide</h2>
            </div>
            <div className="horo-mini-grid">
              {zodiacSigns.map((sign) => (
                <ZodiacMiniCard
                  key={sign.name}
                  sign={sign}
                  isActive={activeSign.name === sign.name}
                  onClick={(signName) => setPartialAndReveal({ sign: signName })}
                />
              ))}
            </div>
          </div>

          <div ref={infoCardRef} className="horo-planner-panel horo-animate-in">
            <div className="horo-panel-topline">
              <span>{getWeeklyDateLabel(state.day)}</span>
              <strong>{activeSign.name} - {activeDay}</strong>
            </div>
            <h2>{activeSign.mood} choices shape your {activeFocus.label.toLowerCase()} rhythm.</h2>
            <p>
              {currentReading[state.focus]} For this week, lean into {activeSign.keywords[1].toLowerCase()} while keeping your plans flexible.
            </p>

            <div className="horo-focus-tabs horo-inline-tabs">
              {focusAreas.slice(1).map((area) => {
                const Icon = area.icon
                return (
                  <button
                    key={area.key}
                    type="button"
                    className={`horo-focus-tab ${state.focus === area.key ? 'is-active' : ''}`}
                    onClick={() => setPartial({ focus: area.key })}
                  >
                    <Icon aria-hidden="true" />
                    <span>{area.label}</span>
                  </button>
                )
              })}
            </div>

            <div className="horo-day-strip">
              {weeklyDays.map((day, index) => (
                <button
                  key={day}
                  type="button"
                  className={state.day === index ? 'is-active' : ''}
                  onClick={() => setPartial({ day: index })}
                >
                  <span>{day}</span>
                  <strong>{getDynamicScore(activeSign.name, weeklySeed, activeSign.energy, index)}%</strong>
                </button>
              ))}
            </div>

            <div className="horo-task-list">
              {weeklyTasks.map((task) => (
                <button
                  key={task}
                  type="button"
                  className={state.completed.includes(task) ? 'is-done' : ''}
                  onClick={() => toggleTask(task)}
                >
                  <CheckCircle2 aria-hidden="true" />
                  <span>{task}</span>
                </button>
              ))}
            </div>

            <div className="horo-progress-card">
              <div>
                <span className="horo-mini-label">Weekly progress</span>
                <strong>{completedCount}/{weeklyTasks.length} actions</strong>
              </div>
              <div className="horo-score-track">
                <span style={{ width: `${progress}%` }} />
              </div>
              <div className="horo-button-row">
                <button
                  type="button"
                  className="horo-outline-button"
                  onClick={() => setPartial({ completed: weeklyTasks })}
                >
                  Mark all
                </button>
                <button
                  type="button"
                  className="horo-outline-button"
                  onClick={() => setPartial({ completed: [] })}
                >
                  Clear
                </button>
              </div>
            </div>

            <label className="horo-field">
              <span>Weekly intention</span>
              <input
                value={state.intention}
                onChange={(event) => setPartial({ intention: event.target.value })}
                placeholder="I will move with clarity..."
              />
            </label>
          </div>
        </div>
      </section>
    </div>
  )
}

const MonthlyHoroscopePage = () => {
  const { infoCardRef, revealInfoCard } = useInfoCardScroll()
  const [state, setState, savedAt] = useStoredState('monthly-horoscope-state', {
    sign: 'Libra',
    day: 1,
    area: 'Love',
    phase: 'Seed',
    goal: '',
  })

  const activeSign = getSign(state.sign)
  const monthlySeed = getMonthLabel() + '-day-' + state.day
  const selectedDayEnergy = getDynamicScore(activeSign.name, monthlySeed, activeSign.energy, state.day + monthAreas.indexOf(state.area))
  const setPartial = (patch) => setState((prev) => ({ ...prev, ...patch }))
  const setPartialAndReveal = (patch) => {
    setPartial(patch)
    revealInfoCard()
  }

  return (
    <div className="page-wrapper horoscope-page monthly-horoscope-page">
      <PageHero
        activeType="monthly"
        eyebrow={getMonthLabel()}
        title="Monthly Horoscope"
        subtitle="A moon-map for goals, moods, and momentum"
        description="Tap a date, change the moon phase, and shape a monthly focus that feels practical and personal."
        icon={Moon}
      >
        <div className="horo-moon-visual">
          {moonPhases.map((phase, index) => (
            <button
              key={phase}
              type="button"
              className={`horo-moon-phase ${state.phase === phase ? 'is-active' : ''}`}
              onClick={() => setPartialAndReveal({ phase })}
            >
              <span style={{ '--phase': index }} />
              <strong>{phase}</strong>
            </button>
          ))}
        </div>
      </PageHero>

      <GuidePanel
        savedAt={savedAt}
        status={`${activeSign.name} day ${state.day} is tuned to ${state.area}.`}
        steps={['Pick sign', 'Tap date', 'Set focus']}
        onReset={() => setState({ sign: 'Libra', day: 1, area: 'Love', phase: 'Seed', goal: '' })}
      />

      <section className="horo-section">
        <div className="container horo-month-layout">
          <div className="horo-month-board">
            <div className="horo-section-heading">
              <span>{activeSign.name}</span>
              <h2>30 Day Energy Map</h2>
            </div>
            <div className="horo-sign-rail" aria-label="Choose monthly sign">
              {zodiacSigns.map((sign) => (
                <button
                  key={sign.name}
                  type="button"
                  className={activeSign.name === sign.name ? 'is-active' : ''}
                  onClick={() => setPartialAndReveal({ sign: sign.name })}
                >
                  <img src={sign.image} alt="" aria-hidden="true" />
                  <span>{sign.name}</span>
                </button>
              ))}
            </div>
            <div className="horo-month-grid">
              {Array.from({ length: 30 }).map((_, index) => {
                const day = index + 1
                const score = getDynamicScore(activeSign.name, getMonthLabel() + '-day-' + day, activeSign.energy, day)
                return (
                  <button
                    key={day}
                    type="button"
                    className={state.day === day ? 'is-active' : ''}
                    onClick={() => setPartialAndReveal({ day })}
                  >
                    <span>{day}</span>
                    <strong>{score}</strong>
                  </button>
                )
              })}
            </div>
          </div>

          <aside ref={infoCardRef} className="horo-month-panel horo-animate-in">
            <div className="horo-reading-header">
              <img src={activeSign.image} alt={`${activeSign.name} zodiac sign`} />
              <div>
                <span>{activeSign.dates}</span>
                <h2>{activeSign.name}</h2>
                <p>{state.phase} phase energy for day {state.day}</p>
              </div>
            </div>

            <div className="horo-area-pills">
              {monthAreas.map((area) => (
                <button
                  key={area}
                  type="button"
                  className={state.area === area ? 'is-active' : ''}
                  onClick={() => setPartial({ area })}
                >
                  {area}
                </button>
              ))}
            </div>

            <div className="horo-big-score">
              <div className="horo-score-ring" style={{ '--score': selectedDayEnergy }}>
                <strong>{selectedDayEnergy}</strong>
                <span>score</span>
              </div>
              <p>
                Day {state.day} highlights {state.area.toLowerCase()} through {activeSign.element.toLowerCase()} energy.
                Use {activeSign.keywords[0].toLowerCase()} before making the month's next move. {monthlyPrompts[state.phase]}
              </p>
            </div>

            <label className="horo-field">
              <span>Monthly focus</span>
              <input
                value={state.goal}
                onChange={(event) => setPartial({ goal: event.target.value })}
                placeholder="One thing I want to grow..."
              />
            </label>

            <div className="horo-unlock-row">
              {['Hidden pattern', 'Best date', 'Deep guidance'].map((item) => (
                <div key={item} className="horo-soft-lock">
                  <Lock aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}

const YearlyHoroscopePage = ({ currentYear }) => {
  const { infoCardRef, revealInfoCard } = useInfoCardScroll()
  const [state, setState, savedAt] = useStoredState('yearly-horoscope-state', {
    sign: 'Capricorn',
    quarter: 0,
    focus: 'Career',
    promise: '',
    milestones: [],
  })

  const activeSign = getSign(state.sign)
  const yearlySeed = currentYear + '-Q' + state.quarter
  const yearScore = getDynamicScore(activeSign.name, yearlySeed, activeSign.energy, state.quarter + monthAreas.indexOf(state.focus))
  const activeMilestones = quarterMilestones[state.quarter] || quarterMilestones[0]
  const setPartial = (patch) => setState((prev) => ({ ...prev, ...patch }))
  const setPartialAndReveal = (patch) => {
    setPartial(patch)
    revealInfoCard()
  }
  const spinFocus = () => {
    const nextIndex = (monthAreas.indexOf(state.focus) + 1) % monthAreas.length
    setPartial({ focus: monthAreas[nextIndex] })
  }
  const toggleMilestone = (milestone) => {
    const key = `${state.quarter}-${milestone}`
    setState((prev) => ({
      ...prev,
      milestones: prev.milestones.includes(key)
        ? prev.milestones.filter((item) => item !== key)
        : [...prev.milestones, key],
    }))
  }

  return (
    <div className="page-wrapper horoscope-page yearly-horoscope-page">
      <PageHero
        activeType="yearly"
        eyebrow={`${currentYear} forecast`}
        title={`Yearly Horoscope ${currentYear}`}
        subtitle="A full-year compass with quarters, milestones, and focus shifts"
        description="Choose your sign, move across the annual timeline, and spin a free yearly focus for a more playful reading."
        icon={Sun}
      >
        <div className="horo-year-compass">
          <div className="horo-compass-ring">
            {quarters.map((quarter, index) => (
            <button
              key={quarter}
              type="button"
              className={state.quarter === index ? 'is-active' : ''}
              onClick={() => setPartialAndReveal({ quarter: index })}
              style={{ '--quarter-index': index }}
            >
              Q{index + 1}
            </button>
            ))}
          </div>
          <div className="horo-compass-core">
            <Trophy aria-hidden="true" />
            <strong>{yearScore}</strong>
            <span>{state.focus}</span>
          </div>
        </div>
      </PageHero>

      <GuidePanel
        savedAt={savedAt}
        status={`${quarters[state.quarter]} is active for ${activeSign.name}.`}
        steps={['Choose sign', 'Open quarter', 'Save milestones']}
        onReset={() => setState({ sign: 'Capricorn', quarter: 0, focus: 'Career', promise: '', milestones: [] })}
      />

      <section className="horo-section">
        <div className="container horo-year-layout">
          <div ref={infoCardRef} className="horo-year-panel horo-animate-in">
            <div className="horo-section-heading">
              <span>{activeSign.name}</span>
              <h2>{quarters[state.quarter]}</h2>
            </div>
            <p>
              This part of {currentYear} asks {activeSign.name} to blend {activeSign.keywords[0].toLowerCase()} with
              {` ${activeSign.keywords[2].toLowerCase()}`}. Your strongest focus is {state.focus.toLowerCase()}.
            </p>

            <div className="horo-milestone-grid">
              {activeMilestones.map((milestone) => {
                const key = `${state.quarter}-${milestone}`
                return (
                  <button
                    key={milestone}
                    type="button"
                    className={state.milestones.includes(key) ? 'is-done' : ''}
                    onClick={() => toggleMilestone(milestone)}
                  >
                    <Target aria-hidden="true" />
                    <span>{milestone}</span>
                  </button>
                )
              })}
            </div>

            <div className="horo-year-months">
              {Array.from({ length: 12 }).map((_, index) => {
                const isActive = Math.floor(index / 3) === state.quarter
                return (
                  <button
                    key={index}
                    type="button"
                    className={isActive ? 'is-active' : ''}
                    onClick={() => setPartial({ quarter: Math.floor(index / 3) })}
                  >
                    <span>{new Intl.DateTimeFormat('en-IN', { month: 'short' }).format(new Date(currentYear, index, 1))}</span>
                    <strong>{getDynamicScore(activeSign.name, currentYear + '-M' + index, activeSign.energy, index)}</strong>
                  </button>
                )
              })}
            </div>

            <div className="horo-focus-spinner">
              <button type="button" className="horo-icon-button" onClick={spinFocus}>
                <RefreshCw aria-hidden="true" />
                <span>Spin Focus</span>
              </button>
              <div>
                <span className="horo-mini-label">Year focus</span>
                <strong>{state.focus}</strong>
              </div>
            </div>

            <label className="horo-field">
              <span>Year promise</span>
              <input
                value={state.promise}
                onChange={(event) => setPartial({ promise: event.target.value })}
                placeholder="This year I will..."
              />
            </label>
          </div>

          <div className="horo-side-selector">
            <div className="horo-mini-grid">
              {zodiacSigns.map((sign) => (
                <ZodiacMiniCard
                  key={sign.name}
                  sign={sign}
                  isActive={activeSign.name === sign.name}
                  onClick={(signName) => setPartialAndReveal({ sign: signName })}
                  compact
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const ZodiacSignsPage = () => {
  const { infoCardRef, revealInfoCard } = useInfoCardScroll()
  const [state, setState, savedAt] = useStoredState('zodiac-signs-state', {
    sign: 'Gemini',
    partner: 'Sagittarius',
    element: 'All',
    trait: 0,
    birthDate: '',
  })

  const activeSign = getSign(state.sign)
  const partnerSign = getSign(state.partner)
  const compatibility = clampScore(55 + ((activeSign.energy + partnerSign.energy + Math.abs(signIndex(state.sign) - signIndex(state.partner)) * 7) % 41))
  const filteredSigns = state.element === 'All'
    ? zodiacSigns
    : zodiacSigns.filter((sign) => sign.element === state.element)
  const elements = ['All', 'Fire', 'Earth', 'Air', 'Water']
  const setPartial = (patch) => setState((prev) => ({ ...prev, ...patch }))
  const setPartialAndReveal = (patch) => {
    setPartial(patch)
    revealInfoCard()
  }
  const applyBirthDate = () => {
    const detectedSign = getSignFromDateValue(state.birthDate)
    if (!detectedSign) return
    setPartialAndReveal({ sign: detectedSign, trait: 0, element: 'All' })
  }

  return (
    <div className="page-wrapper horoscope-page zodiac-signs-page">
      <PageHero
        activeType="zodiac-signs"
        eyebrow="Zodiac lab"
        title="Zodiac Signs"
        subtitle="Explore traits, elements, and compatibility in one interactive space"
        description="Filter by element, flip through personality traits, and compare two zodiac signs in the free compatibility lab."
        icon={Sparkles}
      >
        <div className="horo-compat-visual">
          <img src={activeSign.image} alt="" aria-hidden="true" />
          <div className="horo-compat-score">
            <Users aria-hidden="true" />
            <strong>{compatibility}%</strong>
          </div>
          <img src={partnerSign.image} alt="" aria-hidden="true" />
        </div>
      </PageHero>

      <GuidePanel
        savedAt={savedAt}
        status={`${activeSign.name} is open. Compatibility with ${partnerSign.name} is ${compatibility}%.`}
        steps={['Find sign', 'Explore traits', 'Compare match']}
        onReset={() => setState({ sign: 'Gemini', partner: 'Sagittarius', element: 'All', trait: 0, birthDate: '' })}
      />

      <section className="horo-section">
        <div className="container horo-zodiac-layout">
          <div className="horo-zodiac-browser">
            <div className="horo-section-heading">
              <span>Element filter</span>
              <h2>Choose A Sign</h2>
            </div>
            <div className="horo-birth-finder">
              <div>
                <span className="horo-mini-label">Not sure?</span>
                <h3>Find your sign by birth date</h3>
              </div>
              <div className="horo-birth-controls">
                <input
                  type="date"
                  value={state.birthDate}
                  onChange={(event) => setPartial({ birthDate: event.target.value })}
                  aria-label="Birth date"
                />
                <button type="button" className="horo-icon-button" onClick={applyBirthDate}>
                  <Sparkles aria-hidden="true" />
                  <span>Find Sign</span>
                </button>
              </div>
            </div>
            <div className="horo-area-pills">
              {elements.map((element) => (
                <button
                  key={element}
                  type="button"
                  className={state.element === element ? 'is-active' : ''}
                  onClick={() => setPartial({ element })}
                >
                  {element}
                </button>
              ))}
            </div>

            <div className="horo-mini-grid horo-zodiac-pick-grid">
              {filteredSigns.map((sign) => (
                <ZodiacMiniCard
                  key={sign.name}
                  sign={sign}
                  isActive={activeSign.name === sign.name}
                  onClick={(signName) => setPartialAndReveal({ sign: signName, trait: 0 })}
                />
              ))}
            </div>
          </div>

          <aside ref={infoCardRef} className="horo-zodiac-detail horo-animate-in">
            <div className="horo-reading-header">
              <img src={activeSign.image} alt={`${activeSign.name} zodiac sign`} />
              <div>
                <span>{activeSign.dates}</span>
                <h2>{activeSign.name}</h2>
                <p>{activeSign.element} sign ruled by {activeSign.planet}</p>
              </div>
            </div>

            <div className="horo-trait-cards">
              {activeSign.traits.map((trait, index) => (
                <button
                  key={trait}
                  type="button"
                  className={state.trait === index ? 'is-active' : ''}
                  onClick={() => setPartial({ trait: index })}
                >
                  <Gem aria-hidden="true" />
                  <span>{trait}</span>
                </button>
              ))}
            </div>

            <div className="horo-reading-body horo-typed">
              <div className="horo-reading-badge">
                <Layers aria-hidden="true" />
                <span>Trait reading</span>
              </div>
              <p>
                {activeSign.traits[state.trait]} gives {activeSign.name} a {activeSign.mood.toLowerCase()} edge.
                The best expression is {activeSign.keywords[state.trait % activeSign.keywords.length].toLowerCase()} without losing balance.
              </p>
            </div>

            <div className="horo-compat-lab">
              <label className="horo-field">
                <span>Compare with</span>
                <select
                  value={state.partner}
                  onChange={(event) => setPartial({ partner: event.target.value })}
                >
                  {zodiacSigns.map((sign) => (
                    <option key={sign.name} value={sign.name}>{sign.name}</option>
                  ))}
                </select>
              </label>

              <div className="horo-big-score">
                <div className="horo-score-ring" style={{ '--score': compatibility }}>
                  <strong>{compatibility}</strong>
                  <span>match</span>
                </div>
                <p>
                  {activeSign.name} and {partnerSign.name} connect through {activeSign.element} and {partnerSign.element}
                  patterns. The strongest bridge is {activeSign.keywords[1].toLowerCase()}.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}

const HoroscopePage = () => {
  const { type } = useParams()
  const todayLabel = useMemo(() => getTodayLabel(), [])
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  if (type === 'weekly') return <WeeklyHoroscopePage />
  if (type === 'monthly') return <MonthlyHoroscopePage />
  if (type === 'yearly') return <YearlyHoroscopePage currentYear={currentYear} />
  if (type === 'zodiac-signs') return <ZodiacSignsPage />

  return <DailyHoroscopePage todayLabel={todayLabel} />
}

export default HoroscopePage
