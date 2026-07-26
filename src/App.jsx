import React from 'react';
import CyberpunkButton from './components/CyberpunkButton';
import './App.css';

function App() {
  return (
    <>
      <div className="app-container">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="bg-video">
        <source src="/Edgerunners_KV_Animation.webm" type="video/webm" />
      </video>

      {/* Top Navbar */}
      <nav className="navbar">
        <div className="nav-logo-container">
          <h1>CYBERPUNK</h1>
          {/* Replace h1 with <img src="/logo.png" alt="Logo" /> if you have the image */}
        </div>
        
        <div className="nav-menu-wrapper">
          <ul className="nav-menu">
            <li>GAMES ▾</li>
            <li>SHOWS ▾</li>
            <li>NEWS</li>
            <li>COMMUNITY ▾</li>
            <li>MORE ▾</li>
            <li>EN ▾</li>
          </ul>
        </div>
      </nav>

      {/* Main Hero Content */}
      <main className="hero">
        {/* Placeholder for the Anime Awards graphic */}
        <div className="awards-badge">
          2023<br />GRAND WINNER<br />ANIME OF THE YEAR
        </div>

        <div className="button-group">
          <CyberpunkButton 
            href="#" 
            className="hero-btn"
            icon={<span style={{color: 'red', fontWeight: 'bold', fontSize: '24px'}}>N</span>}
          >
            WATCH NOW ON
          </CyberpunkButton>

          <CyberpunkButton href="#" className="hero-btn">
            VIEW TRAILER
          </CyberpunkButton>
        </div>

        {/* Partner Logos Placeholder */}
        <div className="partner-logos">
          <div>CD PROJEKT RED</div>
          <div>x</div>
          <div>TRIGGER</div>
          <div>x</div>
          <div style={{color: 'red'}}>NETFLIX</div>
        </div>
      </main>

      {/* Bottom Jagged Bar */}
      <div className="footer-bar"></div>
    </div>

    {/* About / What's New Section */}
    <section className="about-section">
      <div className="about-header">
        <div className="welcome-text">WELCOME TO NIGHT CITY</div>
        <h2>ABOUT THE SHOW</h2>
        <p className="about-description">
          Cyberpunk: Edgerunners tells a standalone, 10-episode story about a street kid trying to survive in a<br/>
          technology and body modification-obsessed city of the future.<br/>
          Having everything to lose, he chooses to stay alive by becoming an edgerunner—a mercenary outlaw<br/>
          also known as a cyberpunk.
        </p>
      </div>

      <div className="tabs-container">
        <div className="tab active">WHAT'S NEW</div>
        <div className="tab">MANGA</div>
        <div className="tab">STORY</div>
        <div className="tab">CHARACTERS</div>
        <div className="tab">CREATORS</div>
      </div>

      <div className="content-box">
        <div className="content-image">
          <img src="/whatsnew-4229ff06.jpg" alt="What's New" />
        </div>
        <div className="content-text">
          <h3>WHAT'S NEW</h3>
          <p>
            It's official! Brace yourself for another trip to Night<br/>
            City as Cyberpunk: Edgerunners 2 airs in Fall 2026,<br/>
            exclusively on Netflix. Check out the teaser to see<br/>
            what's in store as CD PROJEKT RED and TRIGGER<br/>
            bring an all-new story that promises to take things<br/>
            further than ever before.
          </p>
          <CyberpunkButton href="#" className="learn-more-btn" icon={<span style={{color: 'var(--cb-yellow)', fontWeight: 'bold'}}>►</span>}>
            LEARN MORE
          </CyberpunkButton>
        </div>
      </div>

      <div className="landscape-silhouette"></div>
    </section>
    </>
  );
}

export default App;
