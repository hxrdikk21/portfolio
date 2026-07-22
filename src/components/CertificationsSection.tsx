'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Navigation, Pagination, Keyboard } from 'swiper/modules'
import { FaChevronLeft, FaChevronRight, FaCertificate, FaArrowUpRightFromSquare } from 'react-icons/fa6'

// ─── Swiper CSS ───────────────────────────────────────────────
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// ─── Certificate Data ─────────────────────────────────────────
// Replace `image` values with actual certificate screenshot URLs.
// Aspect ratio of each image slot is 4:3 — 800×600 works best.
export interface Certificate {
  id: string
  image: string          // URL to certificate image
  title: string
  issuer: string
  date: string
  link?: string          // Verification / credential URL (optional)
}

const certificates: Certificate[] = [
  {
    id: 'ml-specialization',
    image: '/certificates/ml-specialisation.jpeg',
    title: 'Machine Learning Specialization',
    issuer: 'DeepLearning.AI · Coursera',
    date: '2026',
    link: 'https://www.coursera.org/account/accomplishments/specialization/certificate/LRZ1VFBNLI9E',
  },
  {
    id: 'kaggle-ml',
    image: '/certificates/kaggle-ml.png',
    title: 'Intro to Machine Learning',
    issuer: 'Kaggle',
    date: '2026',
    link: 'https://www.kaggle.com/learn/certification/hxrdiksachdeva/intro-to-machine-learning',
  },
  {
    id: 'kaggle-pandas',
    image: '/certificates/kaggle-pandas.png',
    title: 'Pandas',
    issuer: 'Kaggle',
    date: '2026',
    link: 'https://www.kaggle.com/learn/certification/hxrdiksachdeva/pandas',
  },
  {
    id: 'kaggle-visualisation',
    image: '/certificates/kaggle-visualisation.png',
    title: 'Data Visualisation',
    issuer: 'Kaggle',
    date: '2026',
    link: 'https://www.kaggle.com/learn/certification/hxrdiksachdeva/data-visualization',
  },
]

// ─── Fade-in variant (shared) ─────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
}

// ─── Placeholder card face when no image is provided ─────────
function CertPlaceholder({ title, issuer }: { title: string; issuer: string }) {
  return (
    <div className="cert-placeholder">
      <FaCertificate className="cert-placeholder__icon" aria-hidden="true" />
      <span className="cert-placeholder__title">{title}</span>
      <span className="cert-placeholder__issuer">{issuer}</span>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────
export default function CertificationsSection() {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  return (
    <section
      id="certifications"
      aria-label="Certifications"
      className="section-padding certifications-section"
    >
      {/* ── Header ── */}
      <div className="max-w-content">
        <motion.div
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          custom={0}
        >
          <span className="section-eyebrow" aria-hidden="true">04</span>
          <h2 className="section-title">
            Certifications &amp;&nbsp;
            <span className="gradient-text">Credentials</span>
          </h2>
          <p className="section-subtitle">
            Continuous learning through world-class programmes.
          </p>
        </motion.div>
      </div>

      {/* ── Carousel wrapper ── */}
      <motion.div
        className="coverflow-wrapper"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={fadeUp}
        custom={1}
      >
        {/* Custom nav buttons */}
        <button
          ref={prevRef}
          className="cf-nav cf-nav--prev"
          aria-label="Previous certificate"
        >
          <FaChevronLeft />
        </button>
        <button
          ref={nextRef}
          className="cf-nav cf-nav--next"
          aria-label="Next certificate"
        >
          <FaChevronRight />
        </button>

        <Swiper
          modules={[EffectCoverflow, Navigation, Pagination, Keyboard]}
          effect="coverflow"
          grabCursor
          centeredSlides
          keyboard={{ enabled: true }}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 40,        // degrees each slide is rotated
            stretch: 0,
            depth: 220,        // depth offset in px (inactive cards recede)
            modifier: 1,
            slideShadows: true,
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{
            clickable: true,
            el: '.cf-pagination',
          }}
          onBeforeInit={(swiper) => {
            // Wire custom nav buttons before Swiper init
            if (typeof swiper.params.navigation !== 'boolean') {
              swiper.params.navigation!.prevEl = prevRef.current
              swiper.params.navigation!.nextEl = nextRef.current
            }
          }}
          className="coverflow-swiper"
        >
          {certificates.map((cert) => (
            <SwiperSlide key={cert.id} className="cf-slide">
              {/* ── Card ── */}
              <div className="cf-card">
                {/* Image area */}
                <div className="cf-card__image-wrap">
                  {cert.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={cert.image}
                      alt={`${cert.title} certificate`}
                      className="cf-card__image"
                      onError={(e) => {
                        // Fallback to placeholder if URL 404s
                        ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                        const wrap = e.currentTarget.parentElement
                        if (wrap) wrap.classList.add('cf-card__image-wrap--fallback')
                      }}
                    />
                  ) : null}
                  <CertPlaceholder title={cert.title} issuer={cert.issuer} />
                </div>

                {/* Text block */}
                <div className="cf-card__body">
                  <p className="cf-card__title">{cert.title}</p>
                  <p className="cf-card__issuer">{cert.issuer}</p>
                  <p className="cf-card__date">{cert.date}</p>

                  {/* Verify button — only rendered when a link exists */}
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cf-card__verify-btn"
                      aria-label={`Verify ${cert.title} credential`}
                    >
                      <FaArrowUpRightFromSquare className="cf-card__verify-icon" aria-hidden="true" />
                      Verify Credential
                    </a>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination dots */}
        <div className="cf-pagination" role="tablist" aria-label="Certificate navigation" />
      </motion.div>
    </section>
  )
}
