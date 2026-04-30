import styles from './Enquiries.module.css';

export default function Enquiries() {
  return (
    <section className={styles.enquiries} id="enquiries">
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.tag}>Reach Out</div>
          <h2>
            Connect With Us <em>Directly</em>
          </h2>
          <div className={styles.detail}>
            <div className={styles.icon}>📞</div>
            <div className={styles.text}>
              <span className={styles.label}>Phone / WhatsApp</span>
              <span className={styles.value}>
                <a href="tel:+233551552283">+233 551 552 283</a><br />
                <a href="tel:+233209768114">+233 209 768 114</a>
              </span>
            </div>
          </div>
          <div className={styles.detail}>
            <div className={styles.icon}>✉️</div>
            <div className={styles.text}>
              <span className={styles.label}>Email Address</span>
              <span className={styles.value}>
                <a href="mailto:lovevibestudio726@gmail.com">lovevibestudio726@gmail.com</a>
              </span>
            </div>
          </div>

          <div className={styles.detail}>
            <div className={styles.icon}>🌐</div>
            <div className={styles.text}>
              <span className={styles.label}>Social Media</span>
              <span className={styles.value}>
                @LoveVibeStudios on YouTube, TikTok &amp; Instagram
              </span>
            </div>
          </div>
        </div>

        <div className={styles.qrWrap}>
          <div className={styles.qrFrame}>
            {/* Place QR code image at /public/assets/qr.png */}
            <img src="/qr_code.jpeg" alt="Scan to Enrol" width={200} height={200} />
          </div>
          <div className={styles.qrLabel}>
            Scan to Enrol
            <span>Point your camera at the code to access our enrolment form</span>
          </div>
        </div>
      </div>
    </section>
  );
}
