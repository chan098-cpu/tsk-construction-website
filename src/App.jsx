import React, { useEffect, useRef, useState } from "react";

 

import { supabase } from "./supabase.js";

 

import { Link, Routes, Route } from "react-router-dom";

 

import About from "./About.jsx";

 

import Services from "./services.jsx";

 

import Projects from "./projects.jsx";

 

import Packages from "./packages.jsx";

 

import AdminLogin from "./AdminLogin.jsx";

 

import AdminDashboard from "./AdminDashboard.jsx";

 

 

function useSiteMedia() {

  const [media, setMedia] = useState({});

  useEffect(() => {

    let mounted = true;

    async function loadMedia() {

      const { data, error } = await supabase

        .from("site_media")

        .select("media_key, image_url")

        .eq("is_active", true);

      if (!error && mounted) {

        const next = {};

        (data || []).forEach((item) => { next[item.media_key] = item.image_url; });

        setMedia(next);

      }

    }

    loadMedia();

    return () => { mounted = false; };

  }, []);

  return media;

}

 

const DEFAULT_CONTACT_PHONE = "9894432753";

 

const DEFAULT_WHATSAPP_PHONE = "919894432753";

 

function useSiteContactSettings() {

 

  const [settings, setSettings] = useState({

 

    contact_phone: DEFAULT_CONTACT_PHONE,

 

    whatsapp_phone: DEFAULT_WHATSAPP_PHONE,

 

  });

 

  useEffect(() => {

 

    let mounted = true;

 

    async function loadSettings() {

 

      const { data, error } = await supabase

 

        .from("site_contact_settings")

 

        .select("contact_phone, whatsapp_phone")

 

        .eq("id", "main")

 

        .maybeSingle();

 

      if (!error && data && mounted) {

 

        setSettings({

 

          contact_phone: data.contact_phone || DEFAULT_CONTACT_PHONE,

 

          whatsapp_phone: data.whatsapp_phone || DEFAULT_WHATSAPP_PHONE,

 

        });

 

      }

 

    }

 

    loadSettings();

 

    return () => { mounted = false; };

 

  }, []);

 

  return settings;

 

}

 

const projects = [

 

  {

 

    title: "Luxury Residence",

 

    category: "RESIDENTIAL",

 

    media_key: "home_project_1",

 

    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000"

 

  },

 

  {

 

    title: "Modern Villa",

 

    category: "RESIDENTIAL",

 

    media_key: "home_project_2",

 

    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1000"

 

  },

 

  {

 

    title: "Corporate Office",

 

    category: "COMMERCIAL",

 

    media_key: "home_project_3",

 

    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1000"

 

  },

 

  {

 

    title: "Commercial Building",

 

    category: "COMMERCIAL",

 

    media_key: "home_project_4",

 

    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000"

 

  },

 

  {

 

    title: "Luxury Living",

 

    category: "INTERIOR DESIGN",

 

    media_key: "home_project_5",

 

    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000"

 

  },

 

  {

 

    title: "Modern Interior",

 

    category: "INTERIOR DESIGN",

 

    media_key: "home_project_6",

 

    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000"

 

  },

 

  {

 

    title: "Elegant Renovation",

 

    category: "RENOVATION",

 

    media_key: "home_project_7",

 

    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000"

 

  }

 

];

 

const defaultTestimonialItems = [

 

  { customer_name: "Mr.R.Mahendra prabhu", location: "Alanganallur", media_key: "testimonial_1", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700" },

 

  { customer_name: "Mrs.S.Rukshanabanu", location: "Jaihindpuram", media_key: "testimonial_2", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=700" },

 

  { customer_name: "Mr.D.Vasanthakumar", location: "Palamedu", media_key: "testimonial_3", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=700" },

 

  { customer_name: "Mr.P.Kameshwaran", location: "Valluvar Colony", media_key: "testimonial_4", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=700" },

 

  { customer_name: "Mr.Prasath", location: "Sellur", media_key: "testimonial_5", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700" },

 

  { customer_name: "Mr.Soloman Rajan", location: "Kadachanendhal", media_key: "testimonial_6", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=700" },

 

  { customer_name: "Mr.Subburaj", location: "Sattur", media_key: "testimonial_7", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700" },

 

  { customer_name: "Mr.Elango", location: "Thayilpatti", media_key: "testimonial_8", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=700" },

 

  { customer_name: "Mr.Vasanth", location: "Virudhunagar", media_key: "testimonial_9", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=700" },

 

  { customer_name: "Mr.Paulraj", location: "Pudhukottai", media_key: "testimonial_10", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=700" }

 

];

 

function TestimonialsGallery() {

 

  const media = useSiteMedia();

 

  const [videos, setVideos] = useState([]);

 

  const [loading, setLoading] = useState(true);

 

  useEffect(() => {

 

    let mounted = true;

 

    async function loadTestimonials() {

 

      const { data, error } = await supabase

 

        .from("customer_testimonial_videos")

 

        .select("id, customer_name, location, video_url, is_active, display_order")

 

        .eq("is_active", true)

 

        .order("display_order", { ascending: true })

 

        .order("created_at", { ascending: true });

 

      if (error) {

 

        console.error("Unable to load customer testimonial videos:", error.message);

 

      }

 

      if (mounted) {

 

        setVideos(error ? [] : (data || []));

 

        setLoading(false);

 

      }

 

    }

 

    loadTestimonials();

 

    return () => { mounted = false; };

 

  }, []);

 

  const items = defaultTestimonialItems.map((customer, index) => {

 

    const uploaded = videos.find(

 

      (video) => video.customer_name === customer.customer_name &&

 

        video.location === customer.location

 

    );

 

    return { ...customer, image: media[customer.media_key] || customer.image, video: uploaded?.video_url || "" };

 

  });

 

  return (

 

    <section className="section video-section testimonial-section" id="testimonials">

 

      <div className="video-heading">

 

        <div>

 

          <div className="eyebrow">WHAT OUR CLIENTS SAY</div>

 

          <h2 className="section-title">Customer Testimonials</h2>

 

          <p className="description">

 

            Hear directly from the people who trusted us with their homes.

 

          </p>

 

        </div>

 

      </div>

 

      {loading ? (

 

        <p className="video-footnote">Loading customer videos...</p>

 

      ) : (

 

        <div className="video-window">

 

          <div className="video-track">

 

            {[...items, ...items].map((item, index) => (

 

              <article className="video-card" key={`${item.customer_name}-${index}`}>

 

                <div className="video-frame">

 

                  {item.video ? (

 

                    <video src={item.video} controls playsInline preload="metadata" />

 

                  ) : (

 

                    <>

 

                      <img src={item.image} alt={`${item.customer_name} ${item.location}`} />

 

                      <div className="video-placeholder">

 

                        <span className="video-play">▶</span>

 

                        <span>TESTIMONIAL {String((index % 10) + 1).padStart(2, "0")}</span>

 

                      </div>

 

                    </>

 

                  )}

 

                </div>

 

                <h3>{item.customer_name} ({item.location})</h3>

 

              </article>

 

            ))}

 

          </div>

 

        </div>

 

      )}

 

    </section>

 

  );

 

}

 

function getSocialEmbedUrl(platform, videoUrl) {

 

  const value = (videoUrl || "").trim();

 

  if (platform === "youtube") {

 

    let videoId = "";

 

    try {

 

      const parsed = new URL(value);

 

      if (parsed.hostname.includes("youtu.be")) {

 

        videoId = parsed.pathname.split("/").filter(Boolean)[0] || "";

 

      } else if (parsed.hostname.includes("youtube.com")) {

 

        videoId = parsed.searchParams.get("v") || "";

 

        if (!videoId) {

 

          const parts = parsed.pathname.split("/").filter(Boolean);

 

          const markerIndex = parts.findIndex((part) =>

 

            ["embed", "shorts", "live"].includes(part)

 

          );

 

          if (markerIndex >= 0) videoId = parts[markerIndex + 1] || "";

 

        }

 

      }

 

    } catch {

 

      return "";

 

    }

 

    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";

 

  }

 

  if (platform === "instagram") {

 

    try {

 

      const parsed = new URL(value);

 

      if (!parsed.hostname.includes("instagram.com")) return "";

 

      const parts = parsed.pathname.split("/").filter(Boolean);

 

      const markerIndex = parts.findIndex((part) =>

 

        ["reel", "reels", "p"].includes(part)

 

      );

 

      const shortcode = markerIndex >= 0 ? parts[markerIndex + 1] : "";

 

      return shortcode

 

        ? `https://www.instagram.com/${parts[markerIndex]}/${shortcode}/embed`

 

        : "";

 

    } catch {

 

      return "";

 

    }

 

  }

 

  return "";

 

}

 

function SocialVideosSection({ platform, title, eyebrow, description }) {

 

  const [videos, setVideos] = useState([]);

 

  const [loading, setLoading] = useState(true);

 

  useEffect(() => {

 

    let isMounted = true;

 

    async function loadVideos() {

 

      setLoading(true);

 

      const { data, error } = await supabase

 

        .from("social_media_videos")

 

        .select("id, title, platform, video_url, is_active, display_order")

 

        .eq("platform", platform)

 

        .eq("is_active", true)

 

        .order("display_order", { ascending: true })

 

        .order("created_at", { ascending: false });

 

      if (error) {

 

        console.error(`Unable to load ${platform} videos:`, error.message);

 

        if (isMounted) setVideos([]);

 

      } else if (isMounted) {

 

        setVideos(data || []);

 

      }

 

      if (isMounted) setLoading(false);

 

    }

 

    loadVideos();

 

    return () => {

 

      isMounted = false;

 

    };

 

  }, [platform]);

 

  const isInstagram = platform === "instagram";

 

  return (

 

    <section

 

      className="section video-section social-video-section"

 

      id={isInstagram ? "instagram-reels" : "youtube-videos"}

 

    >

 

      <div className="video-heading">

 

        <div>

 

          <div className="eyebrow">{eyebrow}</div>

 

          <h2 className="section-title">{title}</h2>

 

          <p className="description">{description}</p>

 

        </div>

 

      </div>

 

      {loading ? (

 

        <p className="social-video-note">Loading selected videos...</p>

 

      ) : videos.length === 0 ? (

 

        <p className="social-video-note">

 

          No {isInstagram ? "Instagram Reels" : "YouTube videos"} are currently

 

          selected for display.

 

        </p>

 

      ) : (

 

        <div

 

          className="social-video-marquee"

 

        >

 

          <div className={`social-video-track ${isInstagram ? "reels-track" : "youtube-track"}`}>

 

            {[0, 1].map((copy) => (

 

              <div className="social-video-group" key={`video-group-${copy}`} aria-hidden={copy === 1}>

 

                {videos.map((video) => {

 

                  const embedUrl = getSocialEmbedUrl(platform, video.video_url);

 

                  return (

 

                    <article

 

                      className={isInstagram ? "social-reel-card" : "social-youtube-card"}

 

                      key={`${copy}-${video.id}`}

 

                    >

 

                      <div className={isInstagram ? "social-reel-media" : "social-youtube-media"}>

 

                        {embedUrl ? (

 

                          <iframe

 

                            src={embedUrl}

 

                            title={video.title || title}

 

                            loading="lazy"

 

                            tabIndex={copy === 1 ? -1 : 0}

 

                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"

 

                            allowFullScreen

 

                            referrerPolicy="strict-origin-when-cross-origin"

 

                          />

 

                        ) : (

 

                          <a className="social-video-open-link" href={video.video_url} target="_blank" rel="noreferrer" tabIndex={copy === 1 ? -1 : 0}>

 

                            Open video

 

                          </a>

 

                        )}

 

                      </div>

 

                      <div className={isInstagram ? "social-reel-caption" : "social-youtube-caption"}>

 

                        <span className="social-platform">{isInstagram ? "INSTAGRAM" : "YOUTUBE"}</span>

 

                        <span className="social-placeholder-text">{video.title || "Watch our latest video"}</span>

 

                      </div>

 

                    </article>

 

                  );

 

                })}

 

              </div>

 

            ))}

 

          </div>

 

        </div>

 

      )}

 

    </section>

 

  );

 

}

 

function Header() {

 

  const media = useSiteMedia();

 

  return (

 

    <header className="nav">

 

      <div className="brand">

 

        <img

 

          className="brand-logo"

 

          src={media.company_logo || "/images/company-logo.png"}

 

          alt="TSK Company Logo"

 

        />

 

        <div className="brand-name">

 

          <span>ER. T. SABARIKANNAN</span>

 

          <small>CONSTRUCTION &amp; INTERIORS</small>

 

        </div>

 

      </div>

 

      <nav className="navlinks">

 

        <Link to="/">HOME</Link>

 

        <Link to="/about">ABOUT</Link>

 

        <Link to="/services">SERVICES</Link>

 

        <Link to="/projects">PROJECTS</Link>

 

        <Link to="/packages">PACKAGES</Link>

 

        <Link to="/contact">CONTACT</Link>

 

      </nav>

 

    </header>

 

  );

 

}

 

function Footer() {

 

  const { contact_phone } = useSiteContactSettings();

 

  return (

 

    <footer>

 

      <h3>ER. T. SABARIKANNAN</h3>

 

      <p>CONSTRUCTION & INTERIORS · MADURAI, TAMIL NADU</p>

 

      <p>Building dreams with quality and care.</p>

 

      <p>Contact: <a href={`tel:${contact_phone}`}>{contact_phone}</a></p>

 

      <p>© 2026 ER. T. SABARIKANNAN Construction &amp; Interiors. All Rights Reserved.</p>

 

      <p>Website Designed &amp; Developed by</p>

 

      <p className="zeta-studio-brand">ZETA.WEB STUDIO</p>

 

    </footer>

 

  );

 

}

 

function ContactEnquiry({ showAdminLogin = false }) {

 

  const { whatsapp_phone } = useSiteContactSettings();

 

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

 

      "_blank"

 

    );

 

  }

 

  return (

 

    <section className="section contact" id="contact">

 

      <div className="contact-inner">

 

        <div className="eyebrow">GET IN TOUCH</div>

 

        <h2 className="section-title">Let's discuss your project.</h2>

 

        <p className="description">

 

          Share your requirements with us. Our team will be happy to connect with you.

 

        </p>

 

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

 

        {showAdminLogin && (

 

          <div className="admin-login-contact">

 

            <Link to="/admin">ADMIN LOGIN</Link>

 

          </div>

 

        )}

 

      </div>

 

    </section>

 

  );

 

}

 

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

 

function Home() {

 

  const media = useSiteMedia();

 

  const galleryRef = useRef(null);

 

  const [heroImageUrl, setHeroImageUrl] = useState("");

 

 

 

  useEffect(() => {

 

    let mounted = true;

 

    async function loadHeroImage() {

 

      const { data, error } = await supabase

 

        .from("site_content")

 

        .select("content_value")

 

        .eq("content_key", "hero_image_url")

 

        .eq("is_public", true)

 

        .maybeSingle();

 

      if (!error && mounted) setHeroImageUrl(data?.content_value || "");

 

    }

 

    loadHeroImage();

 

    return () => { mounted = false; };

 

  }, []);

 

 

 

  function scrollGallery(direction) {

 

    if (galleryRef.current) {

 

      galleryRef.current.scrollBy({

 

        left: direction * 420,

 

        behavior: "smooth"

 

      });

 

    }

 

  }

 

  return (

 

    <>

 

      <Header />

 

      <main>

 

        <section

 

          className="hero"

 

          id="home"

 

          style={heroImageUrl ? {

 

            backgroundImage: `linear-gradient(90deg,rgba(45,35,25,.55),rgba(0,0,0,.08)), url("${heroImageUrl}")`

 

          } : undefined}

 

        >

 

          <div className="hero-content">

 

            <div className="eyebrow">

 

              MADURAI · CHENNAI · COIMBATORE · PUDHUKOTTAI · TRICHY · VIRUDHUNAGAR

 

            </div>

 

            <h1>your dream home deserves a TRUSTED BUILDER</h1>

 

            <p>

 

              Thoughtful construction and beautiful interiors,

 

              designed around the way you live.

 

            </p>

 

            <a href="#projects" className="button">

 

              EXPLORE OUR PROJECTS ↗

 

            </a>

 

          </div>

 

        </section>

 

        <section className="section about" id="about">

 

          <div>

 

            <div className="eyebrow">ABOUT OUR COMPANY</div>

 

            <h2 className="section-title">

 

              We create spaces with purpose.

 

            </h2>

 

          </div>

 

          <p className="description">

 

            ER. T. Sabarikannan Construction & Interiors is focused

 

            on bringing architectural ideas to life through quality

 

            construction, thoughtful planning and elegant interior

 

            spaces. Based in Madurai, Tamil Nadu.

 

          </p>

 

        </section>

 

        {/* HORIZONTAL PROJECT GALLERY */}

 

        <section className="section projects" id="projects">

 

          <div className="project-heading">

 

            <div>

 

              <div className="eyebrow">OUR WORK</div>

 

              <h2 className="section-title">Our Projects</h2>

 

              <p className="description">

 

                Explore our residential, commercial and interior projects.

 

              </p>

 

            </div>

 

            <div className="gallery-arrows">

 

              <button

 

                type="button"

 

                onClick={() => scrollGallery(-1)}

 

                aria-label="Scroll left"

 

              >

 

                ←

 

              </button>

 

              <button

 

                type="button"

 

                onClick={() => scrollGallery(1)}

 

                aria-label="Scroll right"

 

              >

 

                →

 

              </button>

 

            </div>

 

          </div>

 

          <div className="project-gallery" ref={galleryRef}>

 

            {projects.map((project, index) => (

 

              <article className="project-card" key={index}>

 

                <div className="project-image">

 

                  <img src={media[project.media_key] || project.image} alt={project.title} />

 

                </div>

 

                <p>{project.category}</p>

 

                <h3>{project.title}</h3>

 

              </article>

 

            ))}

 

          </div>

 

          <div className="gallery-note">

 

            SCROLL TO EXPLORE MORE PROJECTS →

 

          </div>

 

        </section>

 

        <SocialVideosSection

 

          platform="instagram"

 

          eyebrow="FOLLOW OUR WORK"

 

          title="Instagram Reels"

 

          description="Watch selected project updates and moments from our Instagram."

 

        />

 

        <SocialVideosSection

 

          platform="youtube"

 

          eyebrow="WATCH OUR VIDEOS"

 

          title="YouTube Videos"

 

          description="Explore our construction, completed projects and interior videos."

 

        />

 

          <ContactEnquiry />

 

      </main>

 

      <TestimonialsGallery />

 

      <Footer />

 

    </>

 

  );

 

}

 

function AboutPage() {

 

  return (

 

    <>

 

      <Header />

 

      <About />

 

      <TestimonialsGallery />

 

      <ContactEnquiry />

 

      <Footer />

 

    </>

 

  );

 

}

 

function ServicesPage() {

 

  return (

 

    <>

 

      <Header />

 

      <Services />

 

      <TestimonialsGallery />

 

      <ContactEnquiry />

 

      <Footer />

 

    </>

 

  );

 

}

 

function ProjectsPage() {

 

  return (

 

    <>

 

      <Header />

 

      <Projects />

 

      <TestimonialsGallery />

 

      <ContactEnquiry />

 

      <Footer />

 

    </>

 

  );

 

}

 

function PackagesPage() {

 

  return (

 

    <>

 

      <Header />

 

      <Packages />

 

      <TestimonialsGallery />

 

      <ContactEnquiry />

 

      <Footer />

 

    </>

 

  );

 

}

 

export default function App() {

 

  return (

 

    <>

 

      <style>{`

 

        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600&display=swap');

 

        * { box-sizing: border-box; }

 

        html { scroll-behavior: smooth; }

 

        body {

 

          margin: 0;

 

          font-family: 'DM Sans', sans-serif;

 

          color: #4A4036;

 

          background: #F8F6F1;

 

        }

 

        a {

 

          text-decoration: none;

 

          color: inherit;

 

        }

 

        .nav {

 

          min-height: 90px;

 

          padding: 18px 7%;

 

          display: flex;

 

          justify-content: space-between;

 

          align-items: center;

 

          background: #FFFFFF;

 

        }

 

        .brand {

 

          font-size: 19px;

 

          font-weight: 700;

 

          letter-spacing: 1px;

 

        }

 

        .brand {

 

           display: flex;

 

           align-items: center;

 

           gap: 14px;

 

           flex-shrink: 0;

 

         }

 

         .brand-logo {

 

           display: block;

 

           width: 76px;

 

           height: 68px;

 

           object-fit: contain;

 

           object-position: center;

 

           background: transparent;

 

         }

 

         .brand-name {

 

           display: flex;

 

           flex-direction: column;

 

           gap: 5px;

 

           color: #4A4036;

 

           white-space: nowrap;

 

         }

 

         .brand-name span {

 

           font-family: 'Playfair Display', serif;

 

           font-size: 17px;

 

           font-weight: 600;

 

           letter-spacing: 1.2px;

 

         }

 

         .brand-name small {

 

           display: block;

 

           font-size: 9px;

 

           letter-spacing: 2.5px;

 

           color: #827665;

 

         }

 

        .navlinks {

 

          display: flex;

 

          gap: 30px;

 

          font-size: 11px;

 

          letter-spacing: 1px;

 

        }

 

        .hero {

 

          min-height: 680px;

 

          display: flex;

 

          align-items: center;

 

          padding: 8%;

 

          color: white;

 

          background:

 

            linear-gradient(90deg,rgba(45,35,25,.55),rgba(0,0,0,.08)),

 

            url("https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=2000") center/cover;

 

        }

 

        .hero-content {

 

          max-width: 760px;

 

        }

 

        .eyebrow {

 

          font-size: 11px;

 

          letter-spacing: 4px;

 

        }

 

        .hero h1 {

 

          font-family: 'Playfair Display', serif;

 

          font-size: clamp(44px,7vw,88px);

 

          font-weight: 400;

 

          line-height: 1.08;

 

          margin: 25px 0;

 

        }

 

        .hero p {

 

          max-width: 480px;

 

          line-height: 1.9;

 

          font-size: 14px;

 

          color: #F5F0E8;

 

        }

 

        .button {

 

          display: inline-block;

 

          margin-top: 25px;

 

          padding: 17px 28px;

 

          background: #E9DFD0;

 

          color: #4A4036;

 

          font-size: 10px;

 

          letter-spacing: 2px;

 

        }

 

        .section {

 

          padding: 105px 9%;

 

        }

 

        .section-title {

 

          font-family: 'Playfair Display', serif;

 

          font-weight: 400;

 

          font-size: clamp(34px,5vw,55px);

 

          line-height: 1.2;

 

        }

 

        .about {

 

          display: grid;

 

          grid-template-columns: 1fr 1fr;

 

          gap: 75px;

 

          align-items: center;

 

          background: #FFFFFF;

 

        }

 

        .description {

 

          color: #827665;

 

          font-size: 14px;

 

          line-height: 2;

 

        }

 

        /* PROJECT GALLERY */

 

        .projects {

 

          background: #E9DFD0;

 

          overflow: hidden;

 

        }

 

        .project-heading {

 

          display: flex;

 

          justify-content: space-between;

 

          align-items: end;

 

          gap: 25px;

 

          margin-bottom: 40px;

 

        }

 

        .project-heading .section-title {

 

          margin: 15px 0;

 

        }

 

        .gallery-arrows {

 

          display: flex;

 

          gap: 12px;

 

          padding-bottom: 10px;

 

        }

 

        .gallery-arrows button {

 

          width: 48px;

 

          height: 48px;

 

          border: 1px solid #827665;

 

          background: transparent;

 

          color: #4A4036;

 

          font-size: 22px;

 

          cursor: pointer;

 

          transition: .3s;

 

        }

 

        .gallery-arrows button:hover {

 

          background: #4A4036;

 

          color: #FFFFFF;

 

        }

 

        .project-gallery {

 

          display: flex;

 

          gap: 25px;

 

          overflow-x: auto;

 

          scroll-behavior: smooth;

 

          scroll-snap-type: x mandatory;

 

          padding-bottom: 20px;

 

          scrollbar-width: thin;

 

          scrollbar-color: #827665 transparent;

 

        }

 

        .project-card {

 

          flex: 0 0 360px;

 

          scroll-snap-align: start;

 

        }

 

        .project-image {

 

          width: 100%;

 

          height: 340px;

 

          overflow: hidden;

 

          background: #FFFFFF;

 

        }

 

        .project-image img {

 

          width: 100%;

 

          height: 100%;

 

          object-fit: cover;

 

          transition: transform .6s;

 

        }

 

        .project-card:hover img {

 

          transform: scale(1.06);

 

        }

 

        .project-card p {

 

          font-size: 10px;

 

          letter-spacing: 2px;

 

          color: #827665;

 

          margin: 20px 0 8px;

 

        }

 

        .project-card h3 {

 

          font-family: 'Playfair Display', serif;

 

          font-size: 25px;

 

          font-weight: 400;

 

          margin: 0;

 

          color: #4A4036;

 

        }

 

        .gallery-note {

 

          margin-top: 25px;

 

          font-size: 10px;

 

          letter-spacing: 2px;

 

          color: #827665;

 

        }

 

        .video-section {

 

          background: #FFFFFF;

 

          overflow: hidden;

 

        }

 

        .video-heading {

 

          display: flex;

 

          justify-content: space-between;

 

          align-items: end;

 

          gap: 25px;

 

          margin-bottom: 38px;

 

        }

 

        .video-scroll-note,

 

        .video-footnote {

 

          color: #827665;

 

          font-size: 10px;

 

          letter-spacing: 2px;

 

        }

 

        .video-window {

 

          width: 100%;

 

          overflow: hidden;

 

        }

 

        .video-track {

 

          display: flex;

 

          width: max-content;

 

          gap: 22px;

 

          animation: videoMarquee 65s linear infinite;

 

        }

 

        .video-window:hover .video-track {

 

          animation-play-state: paused;

 

        }

 

        .video-card {

 

          flex: 0 0 220px;

 

        }

 

        .video-frame {

 

          position: relative;

 

          width: 100%;

 

          aspect-ratio: 9 / 16;

 

          overflow: hidden;

 

          background: #E9DFD0;

 

        }

 

        .video-frame img,

 

        .video-frame video {

 

          display: block;

 

          width: 100%;

 

          height: 100%;

 

          object-fit: cover;

 

        }

 

        .video-placeholder {

 

          position: absolute;

 

          inset: 0;

 

          display: flex;

 

          flex-direction: column;

 

          align-items: center;

 

          justify-content: center;

 

          gap: 12px;

 

          color: #FFFFFF;

 

          font-size: 10px;

 

          letter-spacing: 2px;

 

          background: linear-gradient(180deg, rgba(30,24,18,.08), rgba(30,24,18,.55));

 

        }

 

        .video-play {

 

          display: grid;

 

          place-items: center;

 

          width: 48px;

 

          height: 48px;

 

          border: 1px solid rgba(255,255,255,.9);

 

          border-radius: 50%;

 

          font-size: 17px;

 

          padding-left: 3px;

 

        }

 

        .video-card h3 {

 

          margin: 14px 0 0;

 

          color: #4A4036;

 

          font-family: 'Playfair Display', serif;

 

          font-size: 18px;

 

          font-weight: 400;

 

        }

 

        .video-footnote {

 

          margin-top: 25px;

 

        }

 

        @keyframes videoMarquee {

 

          from { transform: translateX(0); }

 

          to { transform: translateX(-50%); }

 

        }

 

        .social-video-section {

 

          background: #FFFFFF;

 

          overflow: hidden;

 

        }

 

        .social-video-marquee {

 

          width: 100%;

 

          overflow: hidden;

 

          padding: 4px 0 16px;

 

          position: relative;

 

        }

 

        .social-video-track {

 

          display: flex;

 

          width: max-content;

 

          gap: 22px;

 

          will-change: transform;

 

          animation: social-video-scroll 42s linear infinite;

 

        }

 

        .social-video-group {

 

          display: flex;

 

          flex: 0 0 auto;

 

          align-items: stretch;

 

          gap: 22px;

 

        }

 

        .social-video-marquee:hover .social-video-track,

 

        .social-video-marquee:focus-within .social-video-track {

 

          animation-play-state: paused;

 

        }

 

        .reels-track { animation-duration: 36s; }

 

        .youtube-track { animation-duration: 48s; }

 

        @keyframes social-video-scroll {

 

          from { transform: translateX(0); }

 

          to { transform: translateX(-50%); }

 

        }

 

        @media (prefers-reduced-motion: reduce) {

 

          .social-video-track { animation: none; }

 

          .social-video-marquee { overflow-x: auto; }

 

        }

 

        .social-reel-card, .social-youtube-card {

 

          flex: 0 0 auto;

 

          overflow: hidden;

 

          border: 1px solid #E8E1D5;

 

          background: #FBFAF7;

 

          scroll-snap-align: start;

 

        }

 

        .social-reel-card { width: 218px; }

 

        .social-reel-media iframe,

 

        .social-youtube-media iframe {

 

          display: block;

 

          width: 100%;

 

          height: 100%;

 

          border: 0;

 

          background: #FFFFFF;

 

        }

 

        .social-video-open-link {

 

          display: grid;

 

          place-items: center;

 

          width: 100%;

 

          height: 100%;

 

          color: #4A4036;

 

          font-size: 13px;

 

          text-decoration: underline;

 

        }

 

        .social-reel-media {

 

          position: relative;

 

          display: flex;

 

          align-items: center;

 

          justify-content: center;

 

          aspect-ratio: 9 / 16;

 

          background: linear-gradient(145deg, #EDE8D8, #DCD2BE);

 

        }

 

        .social-youtube-card { width: min(460px, 78vw); }

 

        .social-youtube-media {

 

          position: relative;

 

          display: flex;

 

          align-items: center;

 

          justify-content: center;

 

          aspect-ratio: 16 / 9;

 

          background: linear-gradient(145deg, #EDE8D8, #DCD2BE);

 

        }

 

        .social-play-icon {

 

          width: 0; height: 0;

 

          border-top: 13px solid transparent;

 

          border-bottom: 13px solid transparent;

 

          border-left: 19px solid #8B775C;

 

          margin-left: 5px;

 

          filter: drop-shadow(0 1px 2px rgba(0,0,0,.12));

 

        }

 

        .social-media-label {

 

          position: absolute;

 

          left: 12px; bottom: 12px;

 

          color: #786A56;

 

          font-size: 9px;

 

          letter-spacing: 1.8px;

 

        }

 

        .social-reel-caption, .social-youtube-caption {

 

          display: flex;

 

          flex-direction: column;

 

          gap: 7px;

 

          padding: 14px 15px 16px;

 

        }

 

        .social-platform {

 

          color: #9A8567;

 

          font-size: 9px;

 

          letter-spacing: 1.8px;

 

          font-weight: 600;

 

        }

 

        .social-placeholder-text {

 

          color: #6F6558;

 

          font-size: 12px;

 

          line-height: 1.6;

 

        }

 

        .social-video-note {

 

          margin-top: 14px;

 

          color: #8A7D6B;

 

          font-size: 11px;

 

          letter-spacing: .2px;

 

        }

 

        .contact {

 

          background: #F8F6F1;

 

          color: #4A4036;

 

        }

 

        .contact-inner {

 

          max-width: 850px;

 

          margin: auto;

 

        }

 

        .form {

 

          display: grid;

 

          grid-template-columns: 1fr 1fr;

 

          gap: 17px;

 

          margin-top: 35px;

 

        }

 

        .form input,

 

        .form select,

 

        .form textarea {

 

          width: 100%;

 

          padding: 18px;

 

          border: 1px solid #C9BBA8;

 

          background: #FFFFFF;

 

          color: #4A4036;

 

          font-family: inherit;

 

          font-size: 13px;

 

        }

 

        .form input::placeholder,

 

        .form textarea::placeholder {

 

          color: #968A7B;

 

        }

 

        .form select option {

 

          color: #4A4036;

 

        }

 

        .form textarea {

 

          grid-column: 1/-1;

 

          min-height: 130px;

 

        }

 

        .form button {

 

          padding: 18px;

 

          border: 1px solid #827665;

 

          background: #E9DFD0;

 

          color: #4A4036;

 

          font-weight: 700;

 

          letter-spacing: 2px;

 

          cursor: pointer;

 

        }

 

        footer {

 

          background: #E9DFD0;

 

          color: #4A4036;

 

          padding: 55px 9%;

 

        }

 

        footer p {

 

          color: #827665;

 

          font-size: 12px;

 

          line-height: 2;

 

        }

 

        footer .zeta-studio-brand {

 

          color: #30261F;

 

          font-size: 15px;

 

          font-weight: 800;

 

          letter-spacing: 0.7px;

 

          line-height: 1.5;

 

          margin-top: 2px;

 

        }

 

        .admin-login-contact {

 

          margin-top: 22px;

 

          text-align: center;

 

          font-size: 10px;

 

          letter-spacing: 1.5px;

 

        }

 

        .admin-login-contact a {

 

          color: #827665;

 

          text-decoration: none;

 

          opacity: 0.8;

 

        }

 

        .admin-login-contact a:hover {

 

          color: #4A4036;

 

          text-decoration: underline;

 

          text-underline-offset: 4px;

 

        }

 

        .testimonial-section {

 

          background: #F8F6F1;

 

          border-top: 1px solid #E9DFD0;

 

        }

 

        .testimonial-section .video-card {

 

          flex-basis: 220px;

 

        }

 

        @media(max-width:750px) {

 

           .brand-logo {

 

             width: 58px;

 

             height: 54px;

 

           }

 

           .brand-name span {

 

             font-size: 14px;

 

           }

 

           .brand-name small {

 

             font-size: 8px;

 

             letter-spacing: 1.7px;

 

           }

 

          .video-heading {

 

            align-items: flex-start;

 

            flex-direction: column;

 

          }

 

          .video-card {

 

            flex-basis: 190px;

 

          }

 

          .nav {

 

            flex-direction: column;

 

            gap: 20px;

 

          }

 

          .navlinks {

 

            gap: 15px;

 

            flex-wrap: wrap;

 

            justify-content: center;

 

          }

 

          .hero {

 

            min-height: 560px;

 

          }

 

          .section {

 

            padding: 70px 7%;

 

          }

 

          .about {

 

            grid-template-columns: 1fr;

 

            gap: 30px;

 

          }

 

          .project-heading {

 

            align-items: start;

 

          }

 

          .project-card {

 

            flex: 0 0 82%;

 

          }

 

          .project-image {

 

            height: 280px;

 

          }

 

          .form {

 

            grid-template-columns: 1fr;

 

          }

 

          .form textarea {

 

            grid-column: auto;

 

          }

 

        }

 

      `}</style>

 

      <Routes>

 

        <Route path="/" element={<Home />} />

 

        <Route path="/about" element={<AboutPage />} />

 

        <Route path="/services" element={<ServicesPage />} />

 

        <Route path="/projects" element={<ProjectsPage />} />

 

        <Route path="/packages" element={<PackagesPage />} />

 

        <Route path="/contact" element={<ContactPage />} />

 

        <Route path="/admin" element={<AdminLogin />} />

 

        <Route path="/admin/dashboard" element={<AdminDashboard />} />

 

      </Routes>

 

    </>

 

  );

 

}