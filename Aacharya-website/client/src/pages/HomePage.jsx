import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiShield, FiCheck, FiStar } from 'react-icons/fi'
import CobeGlobe from '../components/ui/CobeGlobe'
import ScaleLetterHeading from '../components/ui/ScaleLetterHeading'
import LinearCardGallery from '../components/ui/LinearCardGallery'
import harshitHeroImg from '../assets/harshit_hero.png'
import authorityFeaturedImg from '../assets/authority_reading_nakshatras.png'
import ajaiBhambiImg from '../assets/ajai_bhambi.png'
import deepakKapoorImg from '../assets/deepak_kapoor.png'
import gdVashistImg from '../assets/gd_vashist.png'
import hemantBaruaImg from '../assets/hemant_barua.png'
import induPrakashImg from '../assets/indu_prakash.png'
import knRaoImg from '../assets/kn_rao.png'
import premSharmaImg from '../assets/prem_sharma.png'
import sandeepKocharImg from '../assets/sandeep_kochar.png'
import sanjayJumaaniImg from '../assets/sanjay_jumaani.png'
import sohiniShastriImg from '../assets/sohini_shastri.png'
import marqueeEshaDeol from '../assets/marquee_esha_deol.png'
import marqueeMannara from '../assets/marquee_mannara.png'
import marqueeManojTiwari from '../assets/marquee_manoj_tiwari.png'
import marqueeAkhilendraMishra from '../assets/marquee_akhilendra_mishra.png'
import marqueeRajeevVerma from '../assets/marquee_rajeev_verma.png'
import marqueeGuest from '../assets/marquee_guest.png'
import marqueeTusharKapoor from '../assets/marquee_tushar_kapoor.png'
import marqueeDaisyShah from '../assets/marquee_daisy_shah.png'
import marqueeBhagyashree from '../assets/marquee_bhagyashree.png'
import marqueeAnchalMunjal from '../assets/marquee_anchal_munjal.png'
import cardLiveConsultation from '../assets/card_live_consultation.jpeg'
import cardFaceReading from '../assets/card_face_reading.jpeg'
import cardPalmistry from '../assets/card_palmistry.jpeg'
import cardNumerology from '../assets/card_numerology.jpeg'
import './HomePage.css'

export default function HomePage() {
    const heroMarqueeFaces = [
        { src: marqueeEshaDeol, alt: 'Esha Deol' },
        { src: marqueeMannara, alt: 'Mannara Chopra' },
        { src: marqueeManojTiwari, alt: 'Manoj Tiwari' },
        { src: marqueeAkhilendraMishra, alt: 'Akhilendra Mishra' },
        { src: marqueeRajeevVerma, alt: 'Rajeev Verma' },
        { src: marqueeGuest, alt: 'Guest' },
        { src: marqueeTusharKapoor, alt: 'Tushar Kapoor' },
        { src: marqueeDaisyShah, alt: 'Daisy Shah' },
        { src: marqueeBhagyashree, alt: 'Bhagyashree' },
        { src: marqueeAnchalMunjal, alt: 'Anchal Munjal' },
    ]

    const proofItems = [
        { image: ajaiBhambiImg, caption: 'With Industry CEOs at Global Leadership Summit' },
        { image: deepakKapoorImg, caption: 'Invited Speaker at National Governance Forum' },
        { image: gdVashistImg, caption: 'Awarded Best Astrologer 2023 (Public Recognition)' },
        { image: hemantBaruaImg, caption: 'Private Strategy Session with Startup Founders' },
        { image: induPrakashImg, caption: 'VIP Consultation Circle for Policy Advisors' },
        { image: knRaoImg, caption: 'Mentoring Next-Gen Business Leaders' },
        { image: premSharmaImg, caption: 'Exclusive Wealth Guidance Roundtable' },
        { image: sandeepKocharImg, caption: 'Invited Address at Entrepreneurship Conclave' },
        { image: sanjayJumaaniImg, caption: 'Featured Guest at Premium Investor Event' },
        { image: sohiniShastriImg, caption: 'High-Profile Consultation Panel Appearance' },
    ]

    const popularServices = [
        {
            title: 'Career & Business',
            subtitle: 'Growth, promotions & major decisions',
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
            badge: '🔥 Most Booked',
        },
        {
            title: 'Love & Relationships',
            subtitle: 'Marriage, compatibility & conflicts',
            image: 'https://images.unsplash.com/photo-1516589091380-5d8e87df6999?auto=format&fit=crop&w=1200&q=80',
            badge: '❤️ High Demand',
        },
        {
            title: 'Wealth & Finance',
            subtitle: 'Investments, income & financial stability',
            image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80',
            badge: '💰 Top Choice',
        },
        {
            title: 'Kundli Analysis',
            subtitle: 'Detailed life predictions & guidance',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
        },
        {
            title: 'Kundli Matching',
            subtitle: 'Compatibility & marriage timing',
            image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        },
        {
            title: 'Problems & Remedies',
            subtitle: 'Dosha, delays & life obstacles',
            image: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80',
        },
        {
            title: 'Foreign Opportunities',
            subtitle: 'Travel, job & settlement abroad',
            image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
        },
        {
            title: 'Spiritual Guidance',
            subtitle: 'Inner peace & life direction',
            image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
        },
    ]

    const videoProofItems = [
        {
            image: ajaiBhambiImg,
            title: 'Event Stage Highlights',
            subtitle: 'SPIRITUAL GROWTH SERIES',
        },
        {
            image: premSharmaImg,
            title: 'VIP Strategy Discussion',
            subtitle: 'EXCLUSIVE INTERVIEW',
        },
        {
            image: sohiniShastriImg,
            title: 'Panel Session Insights',
            subtitle: 'SPECIAL EPISODE',
        },
        {
            image: deepakKapoorImg,
            title: 'Leadership Forum Clip',
            subtitle: 'PUBLIC TALK FEATURE',
        },
        {
            image: sandeepKocharImg,
            title: 'Investor Roundtable',
            subtitle: 'PODCAST MOMENTS',
        },
    ]

    const focusFeatures = [
        'Career & Business',
        'Love & Relationships',
        'Marriage & Kundli Matching',
        'Wealth & Finance',
        'Kundli / Birth Chart Analysis',
        'Problems & Remedies',
        'Foreign Travel & Opportunities',
        'Spiritual & Life Guidance',
        'Child & Family',
        'Property & Assets',
        'Muhurat (Timing Services)',
        'Numerology & Name Correction',
        'Health & Well-Being',
    ]

    const [focusStartIndex, setFocusStartIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setFocusStartIndex((prev) => (prev + 2) % focusFeatures.length)
        }, 1000)

        return () => clearInterval(timer)
    }, [focusFeatures.length])

    const visibleFocusFeatures = Array.from({ length: 2 }, (_, i) =>
        focusFeatures[(focusStartIndex + i) % focusFeatures.length]
    )

    const mediaTabData = [
        {
            id: 'awards-summit',
            label: 'International Brilliance Awards Summit 2024',
            featured: true,
            content: {
                heading: 'International Brilliance Awards Summit 2024',
                body: 'Dr. Kunwar Harshit Rajveer was honoured at the prestigious International Brilliance Awards Summit 2024 — one of India\'s most celebrated recognition platforms for trailblazers in astrology, wellness, and spiritual guidance. This accolade recognises his decade-long dedication to delivering precise, life-changing Vedic astrology consultations to leaders across industries.',
                tags: ['Award Winner', 'Vedic Astrology', '2024', 'Leadership'],
            },
        },
        {
            id: 'national-tv',
            label: 'National TV',
            featured: false,
            content: {
                heading: 'National TV Appearances',
                body: 'Dr. Harshit Rajveer has graced several leading national television channels as a distinguished astrology expert. His in-depth analysis on planetary movements, celebrity birth charts, and upcoming cosmic events has earned him widespread recognition as one of India\'s most trusted on-screen astrologers.',
                tags: ['Television', 'Expert Panelist', 'Prime Time', 'Media'],
            },
        },
        {
            id: 'leadership-summit',
            label: 'Leadership Summit',
            featured: false,
            content: {
                heading: 'Leadership Summit',
                body: 'As a keynote speaker at multiple Leadership Summits across India, Dr. Harshit Rajveer bridges the world of ancient Vedic wisdom with modern leadership strategy. Business executives, entrepreneurs, and policymakers attend his sessions to gain clarity on timing key decisions using astrological insights.',
                tags: ['Keynote Speaker', 'Business', 'Strategy', 'Vedic Wisdom'],
            },
        },
        {
            id: 'astrology-awards',
            label: 'Astrology Awards',
            featured: false,
            content: {
                heading: 'Astrology Awards',
                body: 'Recognised by multiple astrology bodies and institutions, Dr. Harshit Rajveer has received numerous awards celebrating excellence in Vedic astrology, kundali analysis, and predictive accuracy. These honours reflect the trust and gratitude of over 500+ clients he has guided through pivotal life decisions.',
                tags: ['Recognised Expert', 'Vedic Science', 'Kundali', 'Excellence'],
            },
        },
        {
            id: 'entrepreneur-forum',
            label: 'Entrepreneur Forum',
            featured: false,
            content: {
                heading: 'Entrepreneur Forum',
                body: 'At leading Entrepreneur Forums and startup conclave events, Dr. Harshit Rajveer has shared how astrology can help founders choose auspicious timings for launches, partnerships, and funding rounds. His unique blend of ancient knowledge and modern business application has made him a sought-after advisor in entrepreneurial circles.',
                tags: ['Startups', 'Business Timing', 'Muhurat', 'Founders'],
            },
        },
    ]

    const [activeMediaTab, setActiveMediaTab] = useState('awards-summit')
    const activeTab = mediaTabData.find((t) => t.id === activeMediaTab)

    const authorityLinearGalleryItems = [
        {
            id: 1,
            url: { src: cardLiveConsultation },
            title: 'Get 1-on-1 Live Consultation',
            description:
                'Connect directly with Dr. Kunwar Harshit Rajveer for a personalised one-on-one live consultation. Get precise guidance on career, relationships, health, and major life decisions using authentic Vedic astrology, tailored specifically to your birth chart.',
            tags: ['Live Session', 'Vedic Astrology', 'Personalised', 'Birth Chart'],
        },
        {
            id: 2,
            url: { src: cardFaceReading },
            title: 'Face Reading',
            description:
                'Discover what your facial features reveal about your destiny. Dr. Harshit Rajveer\'s face reading service decodes personality traits, health indicators, and future possibilities through the ancient science of Samudrik Shastra.',
            tags: ['Samudrik Shastra', 'Personality', 'Destiny', 'Ancient Science'],
        },
        {
            id: 3,
            url: { src: cardPalmistry },
            title: 'Palmistry',
            description:
                'Your palm holds the map of your life. Through detailed palmistry analysis, Dr. Harshit Rajveer reads the lines, mounts, and patterns of your hand to reveal insights about your love life, career, health, and spiritual path.',
            tags: ['Palm Reading', 'Life Line', 'Career', 'Hast Rekha'],
        },
        {
            id: 4,
            url: { src: cardNumerology },
            title: 'Numerology',
            description:
                'Numbers govern the universe. Dr. Harshit Rajveer\'s numerology service analyses your birth number, name number, and destiny number to help you make powerful decisions, choose auspicious dates, and align with the cosmic energy of numbers.',
            tags: ['Birth Number', 'Name Correction', 'Lucky Numbers', 'Cosmic Alignment'],
        },
    ]

    return (
        <div className="home-page">
            {/* ── 1. Hero Section ── */}
            <section className="hero-section">
                <div className="hero-container hero-container--full">
                    <div className="hero-content">
                        <div className="hero-badge animate-in">
                            <span aria-hidden="true">🔱</span> India&apos;s Most Trusted Vedic Astrologer
                        </div>
                        <ScaleLetterHeading
                            as="h1"
                            className="hero-solid-title animate-in"
                            style={{ animationDelay: '0.1s' }}
                            parts={[
                                { text: 'Unlock Your ' },
                                { text: 'Cosmic Path', className: 'text-gradient' },
                            ]}
                        />
                        <div className="hero-focus-block animate-in" style={{ animationDelay: '0.15s' }}>
                            <span className="hero-focus-label">Focus:</span>
                            <div className="hero-focus-line" aria-label="Key focus areas">
                                {visibleFocusFeatures.map((feature) => (
                                    <span key={`${focusStartIndex}-${feature}`} className="hero-focus-item">
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="hero-message animate-in" style={{ animationDelay: '0.2s' }}>
                            <p className="hero-message-lead">
                                India&apos;s Most Trusted Vedic Astrologer for Life &amp; Business Decisions
                            </p>
                            <p className="hero-message-body">
                                Gain clarity on your career, relationships &amp; future with precise astrology
                                insights.
                            </p>
                        </div>
                        <p className="hero-authority animate-in" style={{ animationDelay: '0.24s' }}>
                            Trusted by 500+ Business Leaders, Celebrities & Government Officials
                        </p>
                        <div
                            className="hero-proof-marquee animate-in"
                            style={{ animationDelay: '0.28s' }}
                            aria-hidden="true"
                        >
                            <div className="hero-proof-marquee-viewport">
                                <div className="hero-proof-marquee-track">
                                    <div className="hero-proof-marquee-set">
                                        {heroMarqueeFaces.map((face, idx) => (
                                            <img key={`a-${idx}`} src={face.src} alt="" className="hero-proof-face" />
                                        ))}
                                    </div>
                                    <div className="hero-proof-marquee-set" aria-hidden="true">
                                        {heroMarqueeFaces.map((face, idx) => (
                                            <img key={`b-${idx}`} src={face.src} alt="" className="hero-proof-face" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hero-actions animate-in" style={{ animationDelay: '0.3s' }}>
                            <Link to="/book" className="btn btn-primary">
                                Get Your Reading <FiArrowRight />
                            </Link>
                            <Link to="/reports" className="btn btn-secondary">
                                View Sample Report
                            </Link>
                        </div>
                        <p className="hero-note animate-in" style={{ animationDelay: '0.4s' }}>
                            <FiStar className="text-gold" /> No birth time? We can help rectify it.
                        </p>
                    </div>

                    <div className="hero-right-visual animate-in" style={{ animationDelay: '0.5s' }}>
                        <img
                            src={harshitHeroImg}
                            alt="Harshit Rajveer"
                            className="hero-right-image"
                            draggable={false}
                        />
                    </div>
                </div>
            </section>

            {/* ── 2. Social Proof Wall ── */}
            <section className="authority-wall-section">
                <div className="container">
                    <div className="authority-top-row">
                        <ScaleLetterHeading
                            as="h2"
                            className="section-title authority-title"
                            text="Chosen by Leaders. Trusted by Decision Makers."
                        />
                    </div>
                    <div className="authority-featured">
                        <div className="authority-featured-top">

                            {/* LEFT+MIDDLE PANEL: gets the cream background */}
                            <div className="authority-main-panel">
                                {/* Col 1 Row 1: image */}
                                <div className="authority-featured-image-wrap">
                                    <img
                                        src={authorityFeaturedImg}
                                        alt="Dr. Kunwar Harshit Rajveer reading Nakshatras in Astrology"
                                        className="authority-featured-image"
                                    />
                                </div>
                                {/* Col 2 Row 1: trust copy */}
                                <div className="authority-featured-content authority-featured-content--beside">
                                    <h3 className="authority-subhead">
                                        Trusted Where{' '}
                                        <span className="authority-subhead-accent">Decisions</span>{' '}
                                        Matter Most
                                    </h3>
                                    <p className="authority-lead">
                                        <strong className="authority-strong">One wrong decision</strong> can cost{' '}
                                        <span className="authority-stat">years</span>.
                                    </p>
                                    <p>
                                        That&apos;s why those operating at{' '}
                                        <strong className="authority-strong">higher levels</strong> rely on{' '}
                                        <em className="authority-serif-pull">structured, precise guidance</em>
                                        {' '}
                                        <span className="authority-deemph">— not assumptions —</span>{' '}
                                        when it comes to{' '}
                                        <strong className="authority-strong">career, wealth, and life direction</strong>.
                                    </p>
                                </div>
                                {/* Row 2: Clarity text spans full panel width */}
                                <div className="authority-featured-bottom">
                                    <p className="authority-callout">
                                        <span className="authority-callout-keyword">Clarity</span> becomes critical when{' '}
                                        <strong className="authority-strong">the stakes are high</strong>. The higher you go,
                                        the fewer mistakes you can afford.
                                    </p>
                                    <p>
                                        <span className="authority-name">Dr. Harshit</span> provides{' '}
                                        <em className="authority-serif-pull">structured Vedic insights</em> to individuals who
                                        value{' '}
                                        <span className="authority-inline-gold">precision</span>,{' '}
                                        <span className="authority-inline-gold">timing</span>, and{' '}
                                        <strong className="authority-strong">informed decision-making</strong> in every aspect
                                        of life.
                                    </p>
                                    <ul className="authority-checklist">
                                        <li>
                                            <FiCheck className="authority-check-icon" aria-hidden />
                                            <span>
                                                <strong className="authority-check-lead">Strategic consultations</strong>
                                                {' '}for entrepreneurs and CXOs
                                            </span>
                                        </li>
                                        <li>
                                            <FiCheck className="authority-check-icon" aria-hidden />
                                            <span>
                                                <strong className="authority-check-lead">Invited speaker</strong>
                                                {' '}at premium leadership events
                                            </span>
                                        </li>
                                        <li>
                                            <FiCheck className="authority-check-icon" aria-hidden />
                                            <span>
                                                <strong className="authority-check-lead">Recognized</strong>
                                                {' '}for practical, <span className="authority-inline-gold">action-focused</span>{' '}
                                                guidance
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* RIGHT PANEL: card gallery */}
                            <div className="authority-featured-gallery">
                                <h3 className="authority-gallery-heading">
                                    Explore our astrology services
                                </h3>
                                <LinearCardGallery items={authorityLinearGalleryItems} />
                            </div>

                        </div>
                    </div>

                    <div className="proof-grid">
                        {proofItems.map((item, idx) => (
                            <div className="proof-item" key={idx}>
                                <img src={item.image} alt={item.caption} className="proof-image" />
                                <p className="proof-caption">{item.caption}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 3. Featured Moments ── */}
            <section className="featured-moments-section">
                <div className="container">
                    <ScaleLetterHeading as="h2" className="section-title" text="Featured Moments" />

                    <div className="featured-story-row">
                        <img src={deepakKapoorImg} alt="Trusted by top entrepreneurs" className="featured-story-image" />
                        <div className="featured-story-content">
                            <h3>Trusted by India&apos;s Top Entrepreneurs</h3>
                            <p>
                                Guided founders and investors on expansion timing, partnerships, and key financial decisions
                                through practical Vedic intelligence.
                            </p>
                        </div>
                    </div>

                    <div className="featured-story-row reverse">
                        <img src={sandeepKocharImg} alt="Government and public platform presence" className="featured-story-image" />
                        <div className="featured-story-content">
                            <h3>Invited on Public and Policy Platforms</h3>
                            <p>
                                Invited to share predictive frameworks and remedial insights in forums where clarity,
                                trust, and responsibility matter most.
                            </p>
                        </div>
                    </div>

                    <div className="featured-story-row">
                        <img src={knRaoImg} alt="Personalized guidance stories" className="featured-story-image" />
                        <div className="featured-story-content">
                            <h3>Personalized Guidance with Measurable Outcomes</h3>
                            <p>
                                Every consultation is tailored to individual timelines, helping clients convert uncertainty
                                into structured action plans.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 4. Media & Awards ── */}
            <section className="media-awards-section">
                <div className="container">
                    <ScaleLetterHeading as="h2" className="section-title" text="Media & Awards" />
                    <div className="media-logo-row">
                        {mediaTabData.map((tab) => (
                            <button
                                key={tab.id}
                                className={[
                                    'media-logo',
                                    tab.featured ? 'media-logo--featured' : '',
                                    activeMediaTab === tab.id ? 'media-logo--active' : '',
                                ].join(' ')}
                                onClick={() => setActiveMediaTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 4b. Tab Content Panel (full-width) ── */}
            <section className="plain-content-section">
                <div className="plain-content-inner">
                    {activeTab && (
                        <div className="media-tab-content">
                            <h3 className="media-tab-content__heading">{activeTab.content.heading}</h3>
                            <p className="media-tab-content__body">{activeTab.content.body}</p>
                            <ul className="media-tab-content__tags">
                                {activeTab.content.tags.map((tag) => (
                                    <li key={tag}>{tag}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </section>

            {/* ── 5. Popular Astrology Services ── */}
            <section className="exclusivity-section">
                <div className="container">
                    <ScaleLetterHeading as="h2" className="section-title" text="Popular Astrology Services" />
                    <div className="services-grid">
                        {popularServices.map((service) => (
                            <article
                                key={service.title}
                                className="service-card"
                                style={{ backgroundImage: `url(${service.image})` }}
                            >
                                {service.badge && <span className="service-badge">{service.badge}</span>}
                                <div className="service-overlay" />
                                <div className="service-content">
                                    <h3>{service.title}</h3>
                                    <p>{service.subtitle}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 6. Video Proof ── */}
            <section className="video-proof-section">
                <div className="container">
                    <ScaleLetterHeading
                        as="h2"
                        className="section-title video-proof-title"
                        parts={[
                            { text: 'Explore our ' },
                            { text: 'podcast', className: 'text-gold' },
                        ]}
                    />
                    <div className="video-proof-grid">
                        {videoProofItems.map((item, idx) => (
                            <div className="video-proof-card" key={`${item.title}-${idx}`}>
                                <img src={item.image} alt={`${item.title} thumbnail`} className="video-proof-thumb" />
                                <div className="video-proof-watch">◉ WATCH NOW</div>
                                <div className="video-proof-content">
                                    <h3>{item.title}</h3>
                                    <p>{item.subtitle}</p>
                                    <button type="button" className="video-proof-btn">Watch Episode</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Legacy Section Restored: Moving Globe + Insights ── */}
            <section className="preview-section">
                <div className="container">
                    <div className="preview-layout">
                        <div className="preview-content">
                            <ScaleLetterHeading as="h2" className="text-left" text="Crystal Clear Insights" />
                            <p>Most astrology reports are confusing. Ours are designed for clarity.</p>
                            <ul className="benefits-list">
                                <li><FiCheck className="text-gold" /> <strong>Plain English:</strong> No complex jargon without explanation.</li>
                                <li><FiCheck className="text-gold" /> <strong>Actionable Remedies:</strong> Simple rituals and gemstones.</li>
                                <li><FiCheck className="text-gold" /> <strong>5-Year Forecast:</strong> Know what's coming next.</li>
                            </ul>
                            <Link to="/reports" className="btn btn-primary">
                                See Detailed Features
                            </Link>
                        </div>
                        <div className="preview-visual preview-globe">
                            <CobeGlobe />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 7. Pricing ── */}
            <section className="pricing-section">
                <div className="container">
                    <ScaleLetterHeading
                        as="h2"
                        className="pricing-title-top section-title section-title--pricing"
                        text="Simple Pricing"
                    />
                    <div className="pricing-grid">
                        <div className="pricing-card glass-panel">
                            <h3>Basic Report</h3>
                            <div className="price">₹499</div>
                            <ul className="features-list">
                                <li><FiCheck /> Birth Chart Analysis</li>
                                <li><FiCheck /> Personality Insights</li>
                                <li><FiCheck /> Basic Remedies</li>
                            </ul>
                            <Link to="/book" className="btn btn-secondary width-full">Choose Basic</Link>
                        </div>
                        <div className="pricing-card glass-panel popular">
                            <div className="popular-tag">Most Popular</div>
                            <h3>Premium Guidance</h3>
                            <div className="price">₹999</div>
                            <ul className="features-list">
                                <li><FiCheck /> <strong>Everything in Basic</strong></li>
                                <li><FiCheck /> 5-Year Life Predictions</li>
                                <li><FiCheck /> Career & Love Analysis</li>
                                <li><FiCheck /> Detailed Gemstone Report</li>
                                <li><FiCheck /> Ask 3 Specific Questions</li>
                            </ul>
                            <Link to="/book" className="btn btn-primary width-full">Get Premium</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 8. Final CTA ── */}
            <section className="final-cta-section">
                <div className="container text-center">
                    <ScaleLetterHeading as="h2" className="cta-title" text="Start Your Cosmic Journey" />
                    <p className="cta-subtitle">
                        Don't leave your destiny to chance. Get the guidance you need today.
                    </p>
                    <Link to="/book" className="btn btn-primary btn-large">
                        Get Your Reading Now
                    </Link>
                    <p className="cta-guarantee">
                        <FiShield size={14} /> 100% Satisfaction Guarantee
                    </p>
                </div>
            </section>
        </div>
    )
}
