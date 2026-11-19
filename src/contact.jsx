function ContactPage() {

  const { contact_phone, whatsapp_phone } = useSiteContactSettings();

  const companyEmail = "er.tskconstruction@gmail.com";

  const officeAddress = "2/6, SMS Complex, Opp. to Jeyam Theatre, Palaganatham, Madurai - 625 003";

  const mapLink = "https://maps.app.goo.gl/G6TU7W3uTpXWyZzE7";

  const mapEmbed = "https://www.google.com/maps?q=2%2F6%2C%20SMS%20Complex%2C%20Opposite%20Jeyam%20Theatre%2C%20Palaganatham%2C%20Madurai%20625003&output=embed";

 

  function handleSubmit(e) {

    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const message = `

NEW WEBSITE ENQUIRY

 

Name: ${data.get("name")}

Phone: ${data.get("phone")}

Email: ${data.get("email")}

Location: ${data.get("location")}

Project: ${data.get("project")}

Message: ${data.get("message")}

`;

    window.open(

      `https://wa.me/${whatsapp_phone}?text=${encodeURIComponent(message)}`,

      "_blank",

      "noopener,noreferrer"

    );

  }

 

  return (

    <>

      <Header />

      <main className="contact-page">

        <style>{`

          .contact-page { background:#F8F6F1; color:#4A4036; }

          .contact-hero { padding:90px 8%; text-align:center; background:#EDE8D0; }

          .contact-hero h1 { font-family:'Playfair Display',serif; font-size:clamp(38px,6vw,64px); font-weight:400; margin:18px 0; }

          .contact-hero p { max-width:680px; margin:0 auto; line-height:1.9; color:#756B5D; }

          .contact-details-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:18px; margin-top:35px; }

          .contact-detail-card { background:#fff; border:1px solid #E8E0D2; padding:24px; border-radius:8px; }

          .contact-detail-card h3 { font-family:'Playfair Display',serif; font-size:22px; font-weight:400; margin:0 0 12px; }

          .contact-detail-card p { margin:0; line-height:1.8; color:#827665; overflow-wrap:anywhere; }

          .contact-actions { display:flex; flex-wrap:wrap; justify-content:center; gap:12px; margin-top:28px; }

          .contact-action { display:inline-block; padding:13px 20px; border:1px solid #B8A88F; background:#fff; color:#4A4036; font-size:12px; letter-spacing:1px; }

          .contact-content-grid { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:35px; align-items:start; }

          .contact-map-frame { width:100%; min-height:390px; border:0; border-radius:8px; background:#fff; }

          .contact-map-link { display:inline-block; margin-top:14px; color:#6B5944; text-decoration:underline; }

          .contact-page .contact-inner { max-width:1100px; margin:0 auto; }

          .contact-page .form { margin-top:25px; }

          .contact-page .admin-login-contact { margin-top:24px; text-align:center; }

          .contact-page .admin-login-contact a { color:#756B5D; font-size:11px; letter-spacing:2px; text-decoration:underline; }

          @media(max-width:760px) {

            .contact-details-grid,.contact-content-grid { grid-template-columns:1fr; }

            .contact-hero { padding:65px 7%; }

            .contact-map-frame { min-height:320px; }

          }

        `}</style>

 

        <section className="contact-hero">

          <div className="eyebrow">ER. T. SABARIKANNAN CONSTRUCTION &amp; INTERIORS</div>

          <h1>Let's Build Your Dream Home</h1>

          <p>Have a construction or interior project in mind? Contact our team and share your requirements. We will be happy to connect with you.</p>

          <div className="contact-actions">

            <a className="contact-action" href={`tel:${contact_phone}`}>CALL US</a>

            <a className="contact-action" href={`https://wa.me/${whatsapp_phone}`} target="_blank" rel="noreferrer">WHATSAPP</a>

            <a className="contact-action" href={`mailto:${companyEmail}`}>EMAIL US</a>

          </div>

        </section>

 

        <section className="section">

          <div className="contact-inner">

            <div className="eyebrow">CONTACT DETAILS</div>

            <h2 className="section-title">We're Here to Help</h2>

            <div className="contact-details-grid">

              <article className="contact-detail-card">

                <h3>Visit Our Office</h3>

                <p>{officeAddress}</p>

              </article>

              <article className="contact-detail-card">

                <h3>Call / WhatsApp</h3>

                <p><a href={`tel:${contact_phone}`}>{contact_phone}</a></p>

                <p><a href={`https://wa.me/${whatsapp_phone}`} target="_blank" rel="noreferrer">Chat with us on WhatsApp</a></p>

              </article>

              <article className="contact-detail-card">

                <h3>Email</h3>

                <p><a href={`mailto:${companyEmail}`}>{companyEmail}</a></p>

              </article>

            </div>

          </div>

        </section>

 

        <section className="section" style={{background:"#FFFFFF"}}>

          <div className="contact-inner contact-content-grid">

            <div>

              <div className="eyebrow">SEND AN ENQUIRY</div>

              <h2 className="section-title">Tell Us About Your Project</h2>

              <p className="description">Fill in the details below. Your enquiry will open in WhatsApp so you can send it directly to our team.</p>

              <form className="form" onSubmit={handleSubmit}>

                <input name="name" placeholder="Your Full Name" required />

                <input name="phone" type="tel" placeholder="Phone Number" required />

                <input name="email" type="email" placeholder="Email Address" />

                <input name="location" placeholder="Project Location" />

                <select name="project" required defaultValue="">

                  <option value="" disabled>Select Project Type</option>

                  <option value="Residential Construction">Residential Construction</option>

                  <option value="Commercial Construction">Commercial Construction</option>

                  <option value="Interior Design">Interior Design</option>

                  <option value="Renovation">Renovation</option>

                </select>

                <textarea name="message" placeholder="Tell us about your project..." />

                <button type="submit">SUBMIT ENQUIRY ↗</button>

              </form>

              <div className="admin-login-contact">

                <Link to="/admin">ADMIN LOGIN</Link>

              </div>

            </div>

 

            <div>

              <div className="eyebrow">FIND OUR OFFICE</div>

              <h2 className="section-title">Our Location</h2>

              <p className="description">{officeAddress}</p>

              <iframe

                className="contact-map-frame"

                title="ER. T. Sabarikannan Construction & Interiors office location map"

                src={mapEmbed}

                loading="lazy"

                referrerPolicy="no-referrer-when-downgrade"

                allowFullScreen

              />

              <a className="contact-map-link" href={mapLink} target="_blank" rel="noreferrer">GET DIRECTIONS ON GOOGLE MAPS ↗</a>

            </div>

          </div>

        </section>

      </main>

      <Footer />

    </>

  );

}

 