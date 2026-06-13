import { motion } from "framer-motion";
import "./unlock-earth.scss";

export default function UnlockEarth() {
  return (
    <div className="coming-soon">
      <div className="bg-grid" />

      <motion.div
        className="content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* HERO */}
        <motion.div
          className="badge"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          🌎 Beta Launching Soon
        </motion.div>

        <h1>
          Unlock <span>Earth</span>
        </h1>

        <p>
          Track your adventures, complete travel quests, collect memories,
          and build your personal story across the globe. Unlock the world one place at a time.
        </p>

        {/* STATS */}
        <div className="stats">
          <div>
            <h2>195+</h2>
            <span>Countries</span>
          </div>
          <div>
            <h2>50+</h2>
            <span>States</span>
          </div>
          <div>
            <h2>∞</h2>
            <span>Adventures</span>
          </div>
        </div>

        {/* TAGLINE */}
        <div className="tagline">
          Turn travel into a game. Track, explore, and unlock the Earth.
        </div>

        {/* BRAND */}
        <motion.div
          className="brand"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Built for explorers</h2>

          <div className="logo-box">
            <img src="/images/unlock-earth.png" alt="Unlock Earth Logo" />
            <p>Unlock Earth</p>
          </div>
        </motion.div>

        {/* MOCKUPS */}
        <motion.div
          className="mockups"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Mobile experience</h2>
          <p>Designed for travel on the go.</p>

          <div className="mockup-grid">
            <div className="phone">
              <img
                src="/images/unlock-earth_homepage.png"
                alt="iPhone preview 1"
              />
            </div>

            <div className="phone">
              <img
                src="/images/unlock-earth_world_map.png"
                alt="iPhone preview 2"
              />
            </div>

            <div className="phone">
              <img
                src="/images/unlock-eath_quest.png"
                alt="iPhone preview 3"
              />
            </div>
          </div>
        </motion.div>

        {/* FEATURES */}
        <motion.div
          className="features"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>What you can do</h2>

          <div className="feature-grid">
            <div className="feature-card">
              <h3>🗺️ Explore the Map</h3>
              <p>Tap countries and states to unlock them as you travel.</p>
            </div>

            <div className="feature-card">
              <h3>🎯 Travel Quests</h3>
              <p>Complete challenges like visiting continents or landmarks.</p>
            </div>

            <div className="feature-card">
              <h3>📸 Memory Log</h3>
              <p>Save photos and stories tied to every place you visit.</p>
            </div>
          </div>
        </motion.div>

        {/* ROADMAP */}
        <motion.div
          className="roadmap"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Coming next</h2>

          <ul>
            <li>🌍 Global leaderboard for explorers</li>
            <li>🤝 Friend travel sharing & co-quests</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}