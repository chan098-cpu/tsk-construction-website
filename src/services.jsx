import React, { useEffect, useState } from "react";

import { supabase } from "./supabase.js";

 

import { Link } from "react-router-dom";

 

 

 

const services = [

 

  {

 

    number: "01",

 

    title: "Residential Construction",

 

    subtitle: "BUILDING YOUR DREAM HOME",

 

    description:

 

      "Thoughtfully planned residential construction designed around your lifestyle, requirements and vision.",

 

    image:

 

      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200"

 

  },

 

  {

 

    number: "02",

 

    title: "Commercial Construction",

 

    subtitle: "BUILDING BUSINESS SPACES",

 

    description:

 

      "Functional and elegant commercial spaces designed to support businesses and everyday operations.",

 

    image:

 

      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200"

 

  },

 

  {

 

    number: "03",

 

    title: "Interior Design & Execution",

 

    subtitle: "DESIGNED, DETAILED & DELIVERED",

 

    description:

 

      "Complete interior solutions, from concept development and space planning to material selection, detailed coordination and on-site execution.",

 

    image:

 

      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200"

 

  },

 

 

 

  {

 

    number: "04",

 

    title: "Project Management Consultancy",

 

    subtitle: "PLANNED, COORDINATED & CONTROLLED",

 

    description:

 

      "Professional project guidance and coordination to help keep construction work organised, on schedule and aligned with the agreed scope and budget.",

 

    points: [

 

      "Project planning, scheduling and milestone tracking",

 

      "Budget estimation and cost monitoring",

 

      

    ],

 

    image:

 

      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200"

 

  }

 

];

 

 

 

export default function Services() {

 

  return (

 

    <div className="services-page">

 

 

 

      <style>{`

 

        .services-page {

 

          background: #F8F6F1;

 

          color: #4A4036;

 

          width: 100%;

 

        }

 

 

 

        .services-hero {

 

          min-height: 420px;

 

          padding: 100px 8%;

 

          display: flex;

 

          flex-direction: column;

 

          justify-content: center;

 

          align-items: center;

 

          text-align: center;

 

          background: #E9DFD0;

 

        }

 

 

 

        .services-hero .eyebrow {

 

          font-size: 11px;

 

          letter-spacing: 4px;

 

        }

 

 

 

        .services-hero h1 {

 

          font-family: 'Playfair Display', serif;

 

          font-size: clamp(45px, 7vw, 76px);

 

          font-weight: 400;

 

          margin: 25px 0;

 

        }

 

 

 

        .services-hero p {

 

          font-size: 14px;

 

          letter-spacing: 1px;

 

          line-height: 2;

 

        }

 

 

 

        .services-intro {

 

          max-width: 850px;

 

          margin: auto;

 

          padding: 100px 8% 65px;

 

          text-align: center;

 

        }

 

 

 

        .services-intro h2 {

 

          font-family: 'Playfair Display', serif;

 

          font-size: clamp(32px, 5vw, 48px);

 

          font-weight: 400;

 

          margin: 20px 0;

 

        }

 

 

 

        .services-intro p {

 

          color: #827665;

 

          font-size: 14px;

 

          line-height: 2.2;

 

        }

 

 

 

        .services-list {

 

          padding: 30px 8% 110px;

 

          max-width: 1500px;

 

          margin: auto;

 

        }

 

 

 

        .service-item {

 

          display: grid;

 

          grid-template-columns: 1fr 1fr;

 

          gap: 65px;

 

          align-items: center;

 

          margin-bottom: 100px;

 

        }

 

 

 

        .service-item:nth-child(even) .service-image {

 

          order: 2;

 

        }

 

 

 

        .service-image {

 

          height: 390px;

 

          overflow: hidden;

 

          background: #E9DFD0;

 

        }

 

 

 

        .service-image img {

 

          width: 100%;

 

          height: 100%;

 

          object-fit: cover;

 

          transition: transform .6s;

 

        }

 

 

 

        .service-item:hover .service-image img {

 

          transform: scale(1.05);

 

        }

 

 

 

        .service-info .number {

 

          font-size: 12px;

 

          letter-spacing: 3px;

 

          color: #968A7B;

 

        }

 

 

 

        .service-info h2 {

 

          font-family: 'Playfair Display', serif;

 

          font-size: clamp(30px, 4vw, 43px);

 

          font-weight: 400;

 

          line-height: 1.2;

 

          margin: 20px 0;

 

        }

 

 

 

        .service-info .subtitle {

 

          font-size: 10px;

 

          letter-spacing: 3px;

 

          margin-bottom: 22px;

 

        }

 

 

 

        .service-info .description {

 

          font-size: 14px;

 

          line-height: 2.2;

 

          color: #827665;

 

        }

 

 

 

        .service-points {

 

          list-style: none;

 

          padding: 0;

 

          margin: 20px 0 0;

 

          display: grid;

 

          gap: 11px;

 

        }

 

 

 

        .service-points li {

 

          position: relative;

 

          padding-left: 20px;

 

          color: #6F6254;

 

          font-size: 13px;

 

          line-height: 1.8;

 

        }

 

 

 

        .service-points li::before {

 

          content: "—";

 

          position: absolute;

 

          left: 0;

 

          color: #968A7B;

 

        }

 

 

 

        .service-contact {

 

          display: inline-block;

 

          margin-top: 22px;

 

          padding: 15px 25px;

 

          border: 1px solid #827665;

 

          font-size: 10px;

 

          letter-spacing: 2px;

 

          transition: .3s;

 

        }

 

 

 

        .service-contact:hover {

 

          background: #4A4036;

 

          color: #FFFFFF;

 

        }

 

 

 

        .services-cta {

 

          padding: 90px 8%;

 

          text-align: center;

 

          background: #E9DFD0;

 

        }

 

 

 

        .services-cta h2 {

 

          font-family: 'Playfair Display', serif;

 

          font-size: clamp(32px, 5vw, 48px);

 

          font-weight: 400;

 

        }

 

 

 

        .services-cta p {

 

          color: #827665;

 

          line-height: 2;

 

          font-size: 14px;

 

        }

 

 

 

        .services-cta a {

 

          display: inline-block;

 

          margin-top: 20px;

 

          padding: 17px 30px;

 

          background: #4A4036;

 

          color: #FFFFFF;

 

          font-size: 10px;

 

          letter-spacing: 2px;

 

        }

 

 

 

        @media(max-width: 750px) {

 

          .services-hero {

 

            min-height: 330px;

 

            padding: 75px 7%;

 

          }

 

 

 

          .services-intro {

 

            padding: 75px 7% 40px;

 

          }

 

 

 

          .services-list {

 

            padding: 30px 7% 70px;

 

          }

 

 

 

          .service-item {

 

            grid-template-columns: 1fr;

 

            gap: 25px;

 

            margin-bottom: 70px;

 

          }

 

 

 

          .service-item:nth-child(even) .service-image {

 

            order: 0;

 

          }

 

 

 

          .service-image {

 

            height: 280px;

 

          }

 

 

 

          .services-cta {

 

            padding: 70px 7%;

 

          }

 

        }

 

      `}</style>

 

 

 

      <section className="services-hero">

 

        <div className="eyebrow">WHAT WE DO</div>

 

        <h1>Our Services</h1>

 

        <p>Thoughtful Construction. Timeless Design.</p>

 

      </section>

 

 

 

      <section className="services-intro">

 

        <div className="eyebrow">OUR EXPERTISE</div>

 

        <h2>Creating Spaces That Inspire.</h2>

 

        <p>

 

          From residential and commercial construction to

 

          interior design, project management consultancy and renovation,

 

          we focus on creating spaces with thoughtful planning and attention to detail.

 

        </p>

 

      </section>

 

 

 

      <section className="services-list">

 

        {displayServices.map((service) => (

 

          <article className="service-item" key={service.number}>

 

 

 

            <div className="service-image">

 

              <img src={service.image} alt={service.title} />

 

            </div>

 

 

 

            <div className="service-info">

 

              <div className="number">{service.number}</div>

 

 

 

              <h2>{service.title}</h2>

 

 

 

              <div className="subtitle">

 

                {service.subtitle}

 

              </div>

 

 

 

              <p className="description">

 

                {service.description}

 

              </p>

 

 

 

              {service.points && (

 

                <ul className="service-points">

 

                  {service.points.map((point) => (

 

                    <li key={point}>{point}</li>

 

                  ))}

 

                </ul>

 

              )}

 

 

 

              <Link to="/#contact" className="service-contact">

 

                ENQUIRE NOW ↗

 

              </Link>

 

            </div>

 

 

 

          </article>

 

        ))}

 

      </section>

 

 

 

      <section className="services-cta">

 

        <h2>Let's Build Something Meaningful.</h2>

 

        <p>

 

          Have a project in mind? Let's discuss your requirements.

 

        </p>

 

        <Link to="/#contact">

 

          DISCUSS YOUR PROJECT ↗

 

        </Link>

 

      </section>

 

 

 

    </div>

 

  );

 

}

 