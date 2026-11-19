import React, { useEffect, useMemo, useState } from "react";

import { supabase } from "./supabase.js";

 

const projectCategories = [

  {

    title: "Completed Projects",

    subtitle: "Our successfully completed projects",

    number: "01",

    fallback: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",

  },

  {

    title: "Ongoing Projects",

    subtitle: "Projects currently under construction",

    number: "02",

    fallback: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200",

  },

  {

    title: "Residential Buildings",

    subtitle: "Homes designed around your lifestyle",

    number: "03",

    fallback: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",

  },

  {

    title: "Commercial Projects",

    subtitle: "Spaces built for business and growth",

    number: "04",

    fallback: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200",

  },

  {

    title: "Interior Projects",

    subtitle: "Beautiful interiors with thoughtful details",

    number: "05",

    fallback: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200",

  },

];

 

export default function Projects() {

  const [galleryRows, setGalleryRows] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [loading, setLoading] = useState(true);

 

  useEffect(() => {

    let active = true;

    async function loadGallery() {

      const { data, error } = await supabase

        .from("project_gallery_images")

        .select("id, category, image_url, image_type, display_order")

        .eq("is_active", true)

        .order("display_order", { ascending: true });

      if (active && !error) setGalleryRows(data || []);

      if (active) setLoading(false);

    }

    loadGallery();

    return () => { active = false; };

  }, []);

 

  const categoriesWithImages = useMemo(() => projectCategories.map((category) => {

    const rows = galleryRows.filter((row) => row.category === category.title);

    const cover = rows.find((row) => row.image_type === "cover");

    const photos = rows

      .filter((row) => row.image_type === "gallery")

      .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

    return {

      ...category,

      image: cover?.image_url || category.fallback,

      photos,

    };

  }), [galleryRows]);

 

  const selected = categoriesWithImages.find((item) => item.title === selectedCategory);

 

  return (

    <main className="portfolio-page">

      <style>{`

        .portfolio-page { background:#F8F6F1; color:#4A4036; padding-bottom:100px; min-height:70vh; }

        .portfolio-hero { text-align:center; padding:110px 7% 85px; }

        .portfolio-hero .eyebrow { font-size:11px; letter-spacing:5px; color:#827665; margin-bottom:25px; }

        .portfolio-hero h1 { font-family:'Playfair Display',serif; font-size:clamp(42px,6vw,76px); font-weight:400; line-height:1.15; margin:0 auto 22px; max-width:950px; }

        .portfolio-hero p { font-size:14px; line-height:2; color:#827665; }

        .portfolio-content { max-width:1450px; margin:auto; padding:30px 8%; }

        .portfolio-heading { text-align:center; margin-bottom:75px; }

        .portfolio-heading span { font-size:10px; letter-spacing:5px; color:#827665; }

        .portfolio-heading h2 { font-family:'Playfair Display',serif; font-size:clamp(35px,4vw,52px); font-weight:400; margin:18px 0; }

        .portfolio-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); column-gap:55px; row-gap:100px; }

        .portfolio-card { min-width:0; cursor:pointer; }

        .portfolio-image { width:100%; height:390px; overflow:hidden; background:#E9DFD0; }

        .portfolio-image img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .8s ease; }

        .portfolio-card:hover .portfolio-image img { transform:scale(1.05); }

        .portfolio-number { font-size:11px; letter-spacing:3px; color:#827665; margin-top:27px; }

        .portfolio-card h3 { font-family:'Playfair Display',serif; font-size:clamp(26px,3vw,36px); font-weight:400; margin:12px 0 10px; color:#4A4036; }

        .portfolio-card p { font-size:12px; letter-spacing:1px; color:#827665; line-height:1.8; margin:0; }

        .portfolio-open { margin-top:18px; border:1px solid #B9AA96; color:#4A4036; background:transparent; padding:11px 18px; letter-spacing:1px; font-size:10px; cursor:pointer; }

        .gallery-overlay { position:fixed; inset:0; z-index:9999; background:rgba(35,30,25,.82); display:flex; align-items:center; justify-content:center; padding:22px; }

        .gallery-modal { background:#F8F6F1; color:#4A4036; width:min(1100px,100%); max-height:90vh; overflow:auto; padding:28px; position:relative; }

        .gallery-modal h2 { font-family:'Playfair Display',serif; font-weight:400; font-size:clamp(28px,4vw,42px); margin:0 40px 8px 0; }

        .gallery-modal p { color:#827665; font-size:13px; }

        .gallery-close { position:absolute; top:18px; right:18px; background:transparent; border:1px solid #B9AA96; color:#4A4036; padding:8px 12px; cursor:pointer; }

        .gallery-photo-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:14px; margin-top:22px; }

        .gallery-photo-grid img { width:100%; height:220px; object-fit:cover; display:block; }

        @media(max-width:750px) {

          .portfolio-hero { padding:75px 7% 55px; }

          .portfolio-content { padding:20px 7%; }

          .portfolio-heading { margin-bottom:45px; }

          .portfolio-grid { grid-template-columns:1fr; row-gap:65px; }

          .portfolio-image { height:300px; }

          .gallery-modal { padding:22px 16px; }

          .gallery-photo-grid { grid-template-columns:repeat(2,minmax(0,1fr)); gap:9px; }

          .gallery-photo-grid img { height:150px; }

        }

      `}</style>

 

      <section className="portfolio-hero">

        <div className="eyebrow">OUR WORK · OUR PASSION</div>

        <h1>Projects That Define Our Work</h1>

        <p>Explore our construction, residential, commercial and interior projects.</p>

      </section>

 

      <section className="portfolio-content">

        <div className="portfolio-heading">

          <span>OUR PORTFOLIO</span>

          <h2>Explore Our Projects</h2>

        </div>

 

        {loading && <p style={{ textAlign: "center", color: "#827665" }}>Loading projects...</p>}

 

        <div className="portfolio-grid">

          {categoriesWithImages.map((project) => (

            <article className="portfolio-card" key={project.number} onClick={() => setSelectedCategory(project.title)}>

              <div className="portfolio-image">

                <img src={project.image} alt={project.title} />

              </div>

              <div className="portfolio-number">PROJECT {project.number}</div>

              <h3>{project.title}</h3>

              <p>{project.subtitle}</p>

              <button className="portfolio-open" type="button" onClick={(event) => {

                event.stopPropagation();

                setSelectedCategory(project.title);

              }}>

                VIEW GALLERY ({project.photos.length})

              </button>

            </article>

          ))}

        </div>

      </section>

 

      {selected && (

        <div className="gallery-overlay" role="dialog" aria-modal="true" aria-label={`${selected.title} gallery`} onClick={() => setSelectedCategory(null)}>

          <section className="gallery-modal" onClick={(event) => event.stopPropagation()}>

            <button className="gallery-close" type="button" onClick={() => setSelectedCategory(null)}>CLOSE ✕</button>

            <h2>{selected.title}</h2>

            <p>{selected.photos.length} project photo(s)</p>

            {selected.photos.length === 0 ? (

              <p>Photos will be added soon.</p>

            ) : (

              <div className="gallery-photo-grid">

                {selected.photos.map((photo) => (

                  <img key={photo.id} src={photo.image_url} alt={`${selected.title} project`} loading="lazy" />

                ))}

              </div>

            )}

          </section>

        </div>

      )}

    </main>

  );

}