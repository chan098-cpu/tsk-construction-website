import React from "react";

 

 

 

export default function About() {

 

  return (

 

    <>

 

      <style>{`

 

        .about-page {

 

          background: #F8F6F1;

 

          color: #4A4036;

 

          width: 100%;

 

        }

 

 

 

        .about-hero {

 

          min-height: 420px;

 

          padding: 100px 20px;

 

          display: flex;

 

          flex-direction: column;

 

          justify-content: center;

 

          align-items: center;

 

          text-align: center;

 

          background: #E9DFD0;

 

        }

 

 

 

        .about-hero h1 {

 

          font-family: 'Playfair Display', serif;

 

          font-size: clamp(45px, 7vw, 76px);

 

          font-weight: 400;

 

          margin: 0 0 25px;

 

          letter-spacing: 2px;

 

        }

 

 

 

        .about-hero p {

 

          font-size: 14px;

 

          letter-spacing: 2px;

 

          margin: 0;

 

          line-height: 2;

 

        }

 

 

 

        .about-content {

 

          max-width: 1100px;

 

          margin: auto;

 

          padding: 110px 8%;

 

          text-align: center;

 

        }

 

 

 

        .about-content h2,

 

        .about-values h2 {

 

          font-family: 'Playfair Display', serif;

 

          font-size: clamp(32px, 5vw, 48px);

 

          font-weight: 400;

 

          margin: 0 0 35px;

 

        }

 

 

 

        .about-content p {

 

          max-width: 780px;

 

          margin: auto;

 

          color: #827665;

 

          font-size: 15px;

 

          line-height: 2.3;

 

        }

 

 

 

        .about-values {

 

          padding: 100px 8%;

 

          background: #FFFFFF;

 

          text-align: center;

 

        }

 

 

 

        .value-grid {

 

          max-width: 1100px;

 

          margin: 55px auto 0;

 

          display: grid;

 

          grid-template-columns: repeat(3, 1fr);

 

          gap: 30px;

 

        }

 

 

 

        .value-card {

 

          padding: 55px 30px;

 

          background: #F8F6F1;

 

          border: 1px solid #E9DFD0;

 

          min-height: 220px;

 

          display: flex;

 

          flex-direction: column;

 

          justify-content: center;

 

          transition: transform .3s;

 

        }

 

 

 

        .value-card:hover {

 

          transform: translateY(-7px);

 

        }

 

 

 

        .value-card h3 {

 

          font-family: 'Playfair Display', serif;

 

          font-size: 27px;

 

          font-weight: 400;

 

          margin: 0 0 22px;

 

        }

 

 

 

        .value-card p {

 

          color: #827665;

 

          font-size: 14px;

 

          line-height: 2;

 

          margin: 0;

 

        }

 

 

 

        /* New customer statistics section */

 

        .about-stats {

 

          padding: 85px 8%;

 

          background: #F8F6F1;

 

          text-align: center;

 

        }

 

 

 

        .about-stats h2 {

 

          font-family: 'Playfair Display', serif;

 

          font-size: clamp(30px, 4vw, 44px);

 

          font-weight: 400;

 

          margin: 0 0 45px;

 

        }

 

 

 

        .stats-grid {

 

          max-width: 900px;

 

          margin: auto;

 

          display: grid;

 

          grid-template-columns: repeat(2, 1fr);

 

          gap: 25px;

 

        }

 

 

 

        .stat-card {

 

          padding: 35px 20px;

 

          background: #FFFFFF;

 

          border: 1px solid #E9DFD0;

 

        }

 

 

 

        .stat-card strong {

 

          display: block;

 

          color: #66513D;

 

          font-family: 'Playfair Display', serif;

 

          font-size: clamp(38px, 5vw, 52px);

 

          font-weight: 400;

 

          margin-bottom: 12px;

 

        }

 

 

 

        .stat-card p {

 

          color: #827665;

 

          font-size: 13px;

 

          letter-spacing: 1px;

 

          line-height: 1.8;

 

          margin: 0;

 

        }

 

 

 

        /* New brand promise section */

 

        .about-promise {

 

          padding: 85px 8%;

 

          background: #E9DFD0;

 

          text-align: center;

 

        }

 

 

 

        .about-promise h2 {

 

          max-width: 850px;

 

          margin: 0 auto 25px;

 

          font-family: 'Playfair Display', serif;

 

          font-size: clamp(28px, 4vw, 42px);

 

          font-weight: 400;

 

          line-height: 1.4;

 

        }

 

 

 

        .about-promise p {

 

          color: #66594C;

 

          font-size: 14px;

 

          line-height: 2;

 

          margin: 8px 0;

 

          letter-spacing: .5px;

 

        }

 

 

 

        @media(max-width: 750px) {

 

          .about-hero {

 

            min-height: 330px;

 

            padding: 75px 20px;

 

          }

 

 

 

          .about-content {

 

            padding: 75px 7%;

 

          }

 

 

 

          .about-values {

 

            padding: 75px 7%;

 

          }

 

 

 

          .value-grid {

 

            grid-template-columns: 1fr;

 

            gap: 20px;

 

            margin-top: 35px;

 

          }

 

 

 

          .value-card {

 

            padding: 40px 25px;

 

          }

 

 

 

          .about-stats,

 

          .about-promise {

 

            padding: 65px 7%;

 

          }

 

 

 

          .stats-grid {

 

            grid-template-columns: 1fr;

 

            gap: 16px;

 

          }

 

        }

 

      `}</style>

 

 

 

      <div className="about-page">

 

 

 

        <section className="about-hero">

 

          <h1>ABOUT US</h1>

 

          <p>Building Dreams With Purpose</p>

 

        </section>

 

 

 

        <section className="about-content">

 

          <h2>Who We Are</h2>

 

 

 

          <p>

 

            ER. T. Sabarikannan Construction & Interiors is dedicated

 

            to creating thoughtful spaces with quality, care and design.

 

            We believe every dream deserves a strong foundation.

 

          </p>

 

        </section>

 

 

 

        <section className="about-values">

 

          <h2>What We Believe</h2>

 

 

 

          <div className="value-grid">

 

 

 

            <div className="value-card">

 

              <h3>Quality</h3>

 

              <p>Focus on quality in every detail.</p>

 

            </div>

 

 

 

            <div className="value-card">

 

              <h3>Trust</h3>

 

              <p>Building lasting relationships through trust.</p>

 

            </div>

 

 

 

            <div className="value-card">

 

              <h3>Design</h3>

 

              <p>Creating spaces with thoughtful design.</p>

 

            </div>

 

 

 

          </div>

 

        </section>

 

 

 

        {/* Added section: customer statistics */}

 

        <section className="about-stats">

 

          <h2>Our Achievements</h2>

 

 

 

          <div className="stats-grid">

 

            <div className="stat-card">

 

              <strong>5K+</strong>

 

              <p>Happy Customer Consultations</p>

 

            </div>

 

 

 

            <div className="stat-card">

 

              <strong>100+</strong>

 

              <p>Successful Projects Completed</p>

 

            </div>

 

          </div>

 

        </section>

 

 

 

        {/* Added section: brand promise and service highlights */}

 

        <section className="about-promise">

 

          <h2>Your Dream Home Deserves a Trusted Builder.</h2>

 

          <p>Quality Construction | Trusted Service | Lasting Relationships</p>

 

          <p>Building Trust, Creating Landmarks.</p>

 

          <p>Turning Your Vision Into Reality.</p>

 

        </section>

 

 

 

      </div>

 

    </>

 

  );

 

}