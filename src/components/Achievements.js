import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice, faUsers, faCalendarAlt, faTv } from '@fortawesome/free-solid-svg-icons';
import './Achievements.css';

const Achievements = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    events: 0,
    participants: 0,
    regular: 0,
    media: 0
  });
  const sectionRef = useRef(null);
  const hasAnimated = useRef(false);

  const achievements = [
    {
      id: 1,
      icon: faDice,
      number: 81,
      suffix: '+',
      label: '開催イベント数',
      key: 'events'
    },
    {
      id: 2,
      icon: faUsers,
      number: 1100,
      suffix: '+',
      label: '累計参加者数',
      key: 'participants'
    },
    {
      id: 3,
      icon: faCalendarAlt,
      number: 64,
      suffix: '+',
      label: '定例会開催回数',
      key: 'regular'
    },
    {
      id: 4,
      icon: faTv,
      number: 9,
      suffix: '+',
      label: 'メディア掲載',
      key: 'media'
    }
  ];

  // Intersection Observer for scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            setIsVisible(true);
            hasAnimated.current = true;
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Count up animation
  useEffect(() => {
    if (isVisible) {
      achievements.forEach((achievement) => {
        const duration = 2000; // 2秒
        const steps = 60;
        const increment = achievement.number / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
          currentStep++;
          if (currentStep <= steps) {
            setCounts((prev) => ({
              ...prev,
              [achievement.key]: Math.floor(increment * currentStep)
            }));
          } else {
            setCounts((prev) => ({
              ...prev,
              [achievement.key]: achievement.number
            }));
            clearInterval(timer);
          }
        }, duration / steps);

        return () => clearInterval(timer);
      });
    }
  }, [isVisible]);

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <section id="achievements" className="achievements section" ref={sectionRef}>
      <div className="section-container">
        <h2 className="section-title">数字で見るYOLUBE</h2>
        <p className="section-subtitle-en">Achievement in Numbers</p>

        <div className="achievements-grid">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`achievement-item ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${achievement.id * 0.1}s` }}
            >
              <div className="achievement-icon">
                <FontAwesomeIcon icon={achievement.icon} />
              </div>
              <div className="achievement-number">
                {formatNumber(counts[achievement.key])}
                <span className="achievement-suffix">{achievement.suffix}</span>
              </div>
              <div className="achievement-label">{achievement.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
