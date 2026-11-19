import React, { useCallback, useEffect, useState } from "react";

 

 

 

import { useNavigate } from "react-router-dom";

 

 

 

import { supabase } from "./supabase.js";

 

 

 

const OWNER_EMAIL = "er.tskconstruction@gmail.com";

 

 

 

const initialForm = {

 

 

 

  title: "",

 

 

 

  video_url: "",

 

 

 

  platform: "instagram",

 

 

 

  is_active: true,

 

 

 

};

 

 

 

function validateVideoUrl(platform, value) {

 

 

 

  try {

 

 

 

    const url = new URL(value);

 

 

 

    const host = url.hostname.replace(/^www\./, "");

 

 

 

    if (platform === "instagram") {

 

 

 

      if (host !== "instagram.com" || !/^\/(reel|reels)\//.test(url.pathname)) {

 

 

 

        return "Valid Instagram Reel URL (/reel/...) enter pannunga.";

 

 

 

      }

 

 

 

    } else {

 

 

 

      if (!["youtube.com", "m.youtube.com", "youtu.be"].includes(host)) {

 

 

 

        return "Valid YouTube video URL enter pannunga.";

 

 

 

      }

 

 

 

      if (host === "youtu.be" && !url.pathname.slice(1)) {

 

 

 

        return "YouTube video ID missing.";

 

 

 

      }

 

 

 

      if (host.includes("youtube.com") && !url.searchParams.get("v") &&

 

 

 

          !url.pathname.startsWith("/embed/") && !url.pathname.startsWith("/shorts/")) {

 

 

 

        return "Valid YouTube video URL enter pannunga.";

 

 

 

      }

 

 

 

    }

 

 

 

    return "";

 

 

 

  } catch {

 

 

 

    return "Full URL with https:// enter pannunga.";

 

 

 

  }

 

 

 

}

 

 

 

export default function AdminDashboard() {

 

 

 

  const navigate = useNavigate();

 

 

 

  const [checking, setChecking] = useState(true);

 

 

 

  const [owner, setOwner] = useState(null);

 

  const [activeManager, setActiveManager] = useState("");

 

 

 

  const [platform, setPlatform] = useState("instagram");

 

 

 

  const [videos, setVideos] = useState([]);

 

 

 

  const [form, setForm] = useState(initialForm);

 

 

 

  const [editingId, setEditingId] = useState(null);

 

 

 

  const [loading, setLoading] = useState(false);

 

 

 

  const [saving, setSaving] = useState(false);

 

 

 

  const [notice, setNotice] = useState("");

 

 

 

  const [error, setError] = useState("");

 

 

 

  // Project Gallery Management

 

  const PROJECT_CATEGORIES = [

 

    "Completed Projects",

 

    "Ongoing Projects",

 

    "Residential Buildings",

 

    "Commercial Projects",

 

    "Interior Projects",

 

  ];

 

  const [galleryCategory, setGalleryCategory] = useState(PROJECT_CATEGORIES[0]);

 

  const [galleryItems, setGalleryItems] = useState([]);

 

  const [galleryCover, setGalleryCover] = useState(null);

 

  const [galleryFiles, setGalleryFiles] = useState([]);

 

  const [galleryLoading, setGalleryLoading] = useState(false);

 

  const [galleryUploading, setGalleryUploading] = useState(false);

 

  const [galleryMessage, setGalleryMessage] = useState("");

 

  const [galleryError, setGalleryError] = useState("");

 

 

 

  // Website contact settings

 

  const [contactSettings, setContactSettings] = useState({

 

    contact_phone: "",

 

    whatsapp_phone: "",

 

  });

 

  const [contactLoading, setContactLoading] = useState(false);

 

  const [contactSaving, setContactSaving] = useState(false);

 

  const [contactNotice, setContactNotice] = useState("");

 

  const [contactError, setContactError] = useState("");

 

 

 

 

 

  useEffect(() => {

 

 

 

    let mounted = true;

 

 

 

    async function verifyOwner() {

 

 

 

      const { data, error: authError } = await supabase.auth.getUser();

 

 

 

      if (!mounted) return;

 

 

 

      if (authError || !data?.user ||

 

 

 

          data.user.email?.toLowerCase() !== OWNER_EMAIL) {

 

 

 

        navigate("/admin", { replace: true });

 

 

 

        return;

 

 

 

      }

 

 

 

      setOwner(data.user);

 

 

 

      setChecking(false);

 

 

 

    }

 

 

 

    verifyOwner();

 

 

 

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {

 

 

 

      const user = session?.user;

 

 

 

      if (!user || user.email?.toLowerCase() !== OWNER_EMAIL) {

 

 

 

        navigate("/admin", { replace: true });

 

 

 

      } else {

 

 

 

        setOwner(user);

 

 

 

      }

 

 

 

    });

 

 

 

    return () => {

 

 

 

      mounted = false;

 

 

 

      listener?.subscription?.unsubscribe();

 

 

 

    };

 

 

 

  }, [navigate]);

 

 

 

  const loadVideos = useCallback(async () => {

 

 

 

    setLoading(true);

 

 

 

    setError("");

 

 

 

    const { data, error: queryError } = await supabase

 

 

 

      .from("social_media_videos")

 

 

 

      .select("*")

 

 

 

      .order("display_order", { ascending: true })

 

 

 

      .order("created_at", { ascending: false });

 

 

 

    if (queryError) {

 

 

 

      setError("Video list load aagala. Supabase SQL setup / RLS check pannunga: " + queryError.message);

 

 

 

      setVideos([]);

 

 

 

    } else {

 

 

 

      setVideos(data || []);

 

 

 

    }

 

 

 

    setLoading(false);

 

 

 

  }, []);

 

 

 

  useEffect(() => {

 

 

 

    if (owner) loadVideos();

 

 

 

  }, [owner, loadVideos]);

 

 

 

 

 

  const loadProjectGallery = useCallback(async () => {

 

    setGalleryLoading(true);

 

    setGalleryError("");

 

    const { data, error: loadError } = await supabase

 

      .from("project_gallery_images")

 

      .select("*")

 

      .eq("category", galleryCategory)

 

      .order("image_type", { ascending: true })

 

      .order("display_order", { ascending: true })

 

      .order("created_at", { ascending: true });

 

 

 

    if (loadError) {

 

      setGalleryError("Gallery load aagala: " + loadError.message);

 

      setGalleryItems([]);

 

    } else {

 

      setGalleryItems(data || []);

 

    }

 

    setGalleryLoading(false);

 

  }, [galleryCategory]);

 

 

 

  useEffect(() => {

 

    if (owner) loadProjectGallery();

 

  }, [owner, loadProjectGallery]);

 

 

 

  function chooseGalleryFiles(event) {

 

    const selected = Array.from(event.target.files || []);

 

    const currentCount = galleryItems.filter(

 

      (item) => item.image_type === "gallery"

 

    ).length;

 

    const remaining = Math.max(0, 20 - currentCount);

 

    const valid = selected.filter((file) => file.type.startsWith("image/"));

 

    if (valid.length > remaining) {

 

      setGalleryError(`Indha category-la ${remaining} photos mattum add panna mudiyum. Maximum 20 photos.`);

 

    } else {

 

      setGalleryError("");

 

    }

 

    setGalleryFiles(valid.slice(0, remaining));

 

  }

 

 

 

  async function uploadProjectGallery(event) {

 

    event.preventDefault();

 

    setGalleryMessage("");

 

    setGalleryError("");

 

 

 

    if (!galleryCover && galleryFiles.length === 0) {

 

      setGalleryError("Cover photo அல்லது gallery photos select pannunga.");

 

      return;

 

    }

 

 

 

    const currentGalleryCount = galleryItems.filter(

 

      (item) => item.image_type === "gallery"

 

    ).length;

 

    if (currentGalleryCount + galleryFiles.length > 20) {

 

      setGalleryError("Oru category-ku maximum 20 gallery photos mattum upload panna mudiyum.");

 

      return;

 

    }

 

 

 

    setGalleryUploading(true);

 

    let uploadedCount = 0;

 

    const safeCategory = galleryCategory.toLowerCase().replace(/[^a-z0-9]+/g, "-");

 

 

 

    async function uploadOne(file, imageType, order) {

 

      const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");

 

      const storagePath = `project-gallery/${safeCategory}/${imageType}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${cleanName}`;

 

      const { error: storageError } = await supabase.storage

 

        .from("project-photos")

 

        .upload(storagePath, file, {

 

          cacheControl: "3600",

 

          upsert: false,

 

          contentType: file.type,

 

        });

 

      if (storageError) throw storageError;

 

 

 

      const { data: publicData } = supabase.storage

 

        .from("project-photos")

 

        .getPublicUrl(storagePath);

 

 

 

      const { error: insertError } = await supabase

 

        .from("project_gallery_images")

 

        .insert({

 

          category: galleryCategory,

 

          image_url: publicData.publicUrl,

 

          image_type: imageType,

 

          display_order: order,

 

          is_active: true,

 

        });

 

      if (insertError) throw insertError;

 

      uploadedCount += 1;

 

    }

 

 

 

    try {

 

      const existingCover = galleryItems.find((item) => item.image_type === "cover");

 

      if (galleryCover) {

 

        if (existingCover) {

 

          const { error: deleteError } = await supabase

 

            .from("project_gallery_images")

 

            .delete()

 

            .eq("id", existingCover.id);

 

          if (deleteError) throw deleteError;

 

        }

 

        await uploadOne(galleryCover, "cover", 0);

 

      }

 

 

 

      const nextOrder = galleryItems.filter(

 

        (item) => item.image_type === "gallery"

 

      ).length;

 

      for (let index = 0; index < galleryFiles.length; index += 1) {

 

        await uploadOne(galleryFiles[index], "gallery", nextOrder + index + 1);

 

      }

 

 

 

      setGalleryMessage(`${uploadedCount} photo(s) upload aagivittathu.`);

 

      setGalleryCover(null);

 

      setGalleryFiles([]);

 

      const coverInput = document.getElementById("project-gallery-cover-input");

 

      const photosInput = document.getElementById("project-gallery-photos-input");

 

      if (coverInput) coverInput.value = "";

 

      if (photosInput) photosInput.value = "";

 

      await loadProjectGallery();

 

    } catch (uploadError) {

 

      setGalleryError("Upload panna mudiyala: " + uploadError.message);

 

    }

 

    setGalleryUploading(false);

 

  }

 

 

 

  async function toggleProjectGalleryItem(item) {

 

    const { error: updateError } = await supabase

 

      .from("project_gallery_images")

 

      .update({ is_active: !item.is_active })

 

      .eq("id", item.id);

 

    if (updateError) setGalleryError(updateError.message);

 

    else {

 

      setGalleryMessage(item.is_active ? "Photo website-la hide panniyachu." : "Photo website-la visible aagum.");

 

      await loadProjectGallery();

 

    }

 

  }

 

 

 

  async function deleteProjectGalleryItem(item) {

 

    if (!window.confirm("Indha photo-va delete pannava?")) return;

 

    const { error: deleteError } = await supabase

 

      .from("project_gallery_images")

 

      .delete()

 

      .eq("id", item.id);

 

    if (deleteError) {

 

      setGalleryError("Delete panna mudiyala: " + deleteError.message);

 

      return;

 

    }

 

    setGalleryMessage("Photo delete aagivittathu.");

 

    await loadProjectGallery();

 

  }

 

 

 

  async function moveProjectGalleryItem(item, direction) {

 

    const photos = galleryItems

 

      .filter((entry) => entry.image_type === "gallery")

 

      .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

 

    const index = photos.findIndex((entry) => entry.id === item.id);

 

    const target = index + direction;

 

    if (target < 0 || target >= photos.length) return;

 

    const first = photos[index];

 

    const second = photos[target];

 

    const firstOrder = first.display_order || index + 1;

 

    const secondOrder = second.display_order || target + 1;

 

    const [a, b] = await Promise.all([

 

      supabase.from("project_gallery_images").update({ display_order: secondOrder }).eq("id", first.id),

 

      supabase.from("project_gallery_images").update({ display_order: firstOrder }).eq("id", second.id),

 

    ]);

 

    if (a.error || b.error) setGalleryError(a.error?.message || b.error?.message);

 

    else await loadProjectGallery();

 

  }

 

 

 

  const loadContactSettings = useCallback(async () => {

 

    setContactLoading(true);

 

    setContactError("");

 

    const { data, error: loadError } = await supabase

 

      .from("site_contact_settings")

 

      .select("contact_phone, whatsapp_phone")

 

      .eq("id", "main")

 

      .maybeSingle();

 

 

 

    if (loadError) {

 

      setContactError("Contact settings load aagala: " + loadError.message);

 

    } else if (data) {

 

      setContactSettings({

 

        contact_phone: data.contact_phone || "",

 

        whatsapp_phone: data.whatsapp_phone || "",

 

      });

 

    }

 

    setContactLoading(false);

 

  }, []);

 

 

 

  useEffect(() => {

 

    if (owner) loadContactSettings();

 

  }, [owner, loadContactSettings]);

 

 

 

  async function saveContactSettings(event) {

 

 

 

    event.preventDefault();

 

 

 

    setContactNotice("");

 

 

 

    setContactError("");

 

 

 

    const contactPhone = contactSettings.contact_phone.trim();

 

 

 

    const whatsappPhone = contactSettings.whatsapp_phone.replace(/\D/g, "");

 

 

 

    if (!contactPhone) {

 

 

 

      setContactError("Contact Number enter pannunga.");

 

 

 

      return;

 

 

 

    }

 

 

 

    if (whatsappPhone.length < 10 || whatsappPhone.length > 15) {

 

 

 

      setContactError("WhatsApp Number country code-oda 10 to 15 digits irukkanum. Example: 919894432753");

 

 

 

      return;

 

 

 

    }

 

 

 

    setContactSaving(true);

 

 

 

    const { error: saveError } = await supabase

 

 

 

      .from("site_contact_settings")

 

 

 

      .update({

 

 

 

        contact_phone: contactPhone,

 

 

 

        whatsapp_phone: whatsappPhone,

 

 

 

        updated_at: new Date().toISOString(),

 

 

 

      })

 

 

 

      .eq("id", "main");

 

 

 

    if (saveError) {

 

 

 

      setContactError("Save panna mudiyala: " + saveError.message);

 

 

 

    } else {

 

 

 

      setContactSettings({

 

 

 

        contact_phone: contactPhone,

 

 

 

        whatsapp_phone: whatsappPhone,

 

 

 

      });

 

 

 

      setContactNotice("Contact Number & WhatsApp Number save aagivittathu. Website-la update aagum.");

 

 

 

    }

 

 

 

    setContactSaving(false);

 

 

 

  }

 

 

 

  function clearForm(nextPlatform = platform) {

 

 

 

    setForm({ ...initialForm, platform: nextPlatform });

 

 

 

    setEditingId(null);

 

 

 

  }

 

 

 

  function editVideo(item) {

 

 

 

    setPlatform(item.platform);

 

 

 

    setForm({

 

 

 

      title: item.title || "",

 

 

 

      video_url: item.video_url || "",

 

 

 

      platform: item.platform,

 

 

 

      is_active: Boolean(item.is_active),

 

 

 

    });

 

 

 

    setEditingId(item.id);

 

 

 

    setNotice("");

 

 

 

    setError("");

 

 

 

    window.scrollTo({ top: 0, behavior: "smooth" });

 

 

 

  }

 

 

 

  async function saveVideo(event) {

 

 

 

    event.preventDefault();

 

 

 

    setNotice("");

 

 

 

    setError("");

 

 

 

    const validation = validateVideoUrl(form.platform, form.video_url.trim());

 

 

 

    if (validation) {

 

 

 

      setError(validation);

 

 

 

      return;

 

 

 

    }

 

 

 

    setSaving(true);

 

 

 

    const payload = {

 

 

 

      title: form.title.trim() || (form.platform === "instagram" ? "Instagram Reel" : "YouTube Video"),

 

 

 

      video_url: form.video_url.trim(),

 

 

 

      platform: form.platform,

 

 

 

      is_active: Boolean(form.is_active),

 

 

 

    };

 

 

 

    const result = editingId

 

 

 

      ? await supabase.from("social_media_videos").update(payload).eq("id", editingId)

 

 

 

      : await supabase.from("social_media_videos").insert(payload);

 

 

 

    if (result.error) {

 

 

 

      setError("Save panna mudiyala: " + result.error.message);

 

 

 

    } else {

 

 

 

      setNotice(editingId ? "Video updated." : "Video link added.");

 

 

 

      clearForm(form.platform);

 

 

 

      await loadVideos();

 

 

 

    }

 

 

 

    setSaving(false);

 

 

 

  }

 

 

 

  async function toggleVisibility(item) {

 

 

 

    setNotice("");

 

 

 

    setError("");

 

 

 

    const { error: updateError } = await supabase

 

 

 

      .from("social_media_videos")

 

 

 

      .update({ is_active: !item.is_active })

 

 

 

      .eq("id", item.id);

 

 

 

    if (updateError) setError(updateError.message);

 

 

 

    else {

 

 

 

      setNotice(item.is_active ? "Website-la irundhu hide panniyachu." : "Website-la display aagum.");

 

 

 

      await loadVideos();

 

 

 

    }

 

 

 

  }

 

 

 

  async function removeVideo(item) {

 

 

 

    if (!window.confirm(`"${item.title}" link-ai delete pannava?`)) return;

 

 

 

    setNotice("");

 

 

 

    setError("");

 

 

 

    const { error: deleteError } = await supabase

 

 

 

      .from("social_media_videos")

 

 

 

      .delete()

 

 

 

      .eq("id", item.id);

 

 

 

    if (deleteError) setError("Delete panna mudiyala: " + deleteError.message);

 

 

 

    else {

 

 

 

      setNotice("Video link deleted.");

 

 

 

      if (editingId === item.id) clearForm();

 

 

 

      await loadVideos();

 

 

 

    }

 

 

 

  }

 

 

 

  async function logout() {

 

 

 

    await supabase.auth.signOut();

 

 

 

    navigate("/admin", { replace: true });

 

 

 

  }

 

 

 

  const currentVideos = videos.filter((item) => item.platform === platform);

 

 

 

  if (checking) return <main style={S.page}>Owner access verify pannugirோம்...</main>;

 

 

 

  return (

 

 

 

    <main style={S.page}>

 

 

 

      <header style={S.header}>

 

 

 

        <div>

 

 

 

          <p style={S.eyebrow}>TSK CONSTRUCTION & INTERIORS</p>

 

 

 

          <h1 style={S.heading}>Admin Dashboard</h1>

 

 

 

          <p style={S.muted}>Welcome to Owner Administration</p>

 

 

 

          <small style={S.muted}>{owner?.email}</small>

 

 

 

        </div>

 

 

 

        <button type="button" style={S.outlineButton} onClick={logout}>LOG OUT</button>

 

 

 

      </header>

 

 

 

      <section style={S.cards}>

 

        {[

 

          ["🏗️", "Projects", "Manage completed and ongoing projects"],

 

          ["🖼️", "Photos", "Upload and manage project photos"],

 

          ["🎬", "Social Videos", "Manage Instagram Reels and YouTube links"],

 

          ["🛠️", "Services", "Edit construction services"],

 

          ["📦", "Packages", "Edit packages and prices"],

 

          ["📝", "Website Content", "Manage website information"],

 

          ["📷", "Site Images", "Change every photo used across the website"],

 

        ].map(([icon, title, description]) => (

 

          <button

 

            key={title}

 

            type="button"

 

            style={{ ...S.card, textAlign: "left", cursor: "pointer", font: "inherit" }}

 

            onClick={() => {

 

              if (title === "Social Videos") {

 

                document.getElementById("social-video-management")?.scrollIntoView({ behavior: "smooth", block: "start" });

 

              } else {

 

                setActiveManager(title);

 

                setTimeout(() => document.getElementById("dashboard-management-editor")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);

 

              }

 

            }}

 

          >

 

            <div style={{ fontSize: 30 }}>{icon}</div>

 

            <h2 style={S.cardTitle}>{title}</h2>

 

            <p style={S.muted}>{description}</p>

 

          </button>

 

        ))}

 

      </section>

 

 

 

      {activeManager && (

 

        <section id="dashboard-management-editor" style={{ ...S.panel, marginBottom: 24 }}>

 

          <div style={S.listHeader}>

 

            <div>

 

              <p style={S.eyebrow}>OWNER CONTENT MANAGEMENT</p>

 

              <h2 style={S.sectionTitle}>{activeManager}</h2>

 

            </div>

 

            <button type="button" style={S.outlineButton} onClick={() => setActiveManager("")}>CLOSE</button>

 

          </div>

 

          {activeManager === "Site Images"

 

            ? <SiteImagesManager />

 

            : <SupabaseTableManager section={activeManager} />}

 

        </section>

 

      )}

 

 

 

 

 

      <section style={{ ...S.panel, marginBottom: 24 }}>

 

        <p style={S.eyebrow}>PROJECT GALLERY MANAGEMENT</p>

 

        <h2 style={S.sectionTitle}>Project Category Photos</h2>

 

        <p style={S.muted}>

 

          Category select செய்து cover photo மற்றும் maximum 20 gallery photos direct-a upload pannalaam.

 

          Image URL type panna thevai illai.

 

        </p>

 

 

 

        <div style={{ ...S.actions, margin: "18px 0" }}>

 

          {PROJECT_CATEGORIES.map((category) => (

 

            <button

 

              key={category}

 

              type="button"

 

              onClick={() => {

 

                setGalleryCategory(category);

 

                setGalleryCover(null);

 

                setGalleryFiles([]);

 

                setGalleryMessage("");

 

                setGalleryError("");

 

              }}

 

              style={galleryCategory === category ? S.activeTab : S.outlineButton}

 

            >

 

              {category}

 

            </button>

 

          ))}

 

        </div>

 

 

 

        <form onSubmit={uploadProjectGallery} style={S.form}>

 

          <label style={S.label}>

 

            Cover Photo (one per category)

 

            <input

 

              id="project-gallery-cover-input"

 

              type="file"

 

              accept="image/*"

 

              style={S.input}

 

              onChange={(event) => setGalleryCover(event.target.files?.[0] || null)}

 

            />

 

          </label>

 

          {galleryCover && (

 

            <div style={S.muted}>Selected cover: {galleryCover.name}</div>

 

          )}

 

 

 

          <label style={S.label}>

 

            Gallery Photos (up to 20 per category)

 

            <input

 

              id="project-gallery-photos-input"

 

              type="file"

 

              accept="image/*"

 

              multiple

 

              style={S.input}

 

              onChange={chooseGalleryFiles}

 

            />

 

          </label>

 

          {galleryFiles.length > 0 && (

 

            <div style={S.muted}>{galleryFiles.length} photo(s) selected</div>

 

          )}

 

 

 

          <button type="submit" disabled={galleryUploading} style={S.primaryButton}>

 

            {galleryUploading ? "UPLOADING..." : "UPLOAD SELECTED PHOTOS"}

 

          </button>

 

        </form>

 

 

 

        {galleryMessage && <p style={S.success}>{galleryMessage}</p>}

 

        {galleryError && <p style={S.error}>{galleryError}</p>}

 

 

 

        <div style={S.listHeader}>

 

          <div>

 

            <h3 style={S.sectionTitle}>{galleryCategory}</h3>

 

            <p style={S.muted}>

 

              {galleryItems.filter((item) => item.image_type === "gallery").length}/20 gallery photos

 

            </p>

 

          </div>

 

          <button type="button" style={S.outlineButton} onClick={loadProjectGallery}>

 

            REFRESH

 

          </button>

 

        </div>

 

 

 

        {galleryLoading ? (

 

          <p style={S.empty}>Loading project photos...</p>

 

        ) : galleryItems.length === 0 ? (

 

          <p style={S.empty}>Indha category-la photos innum upload pannala.</p>

 

        ) : (

 

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 14, marginTop: 18 }}>

 

            {galleryItems.map((item) => (

 

              <article key={item.id} style={{ border: "1px solid #E9DFD0", borderRadius: 6, padding: 10, background: "#FFFEFC" }}>

 

                <img

 

                  src={item.image_url}

 

                  alt={galleryCategory}

 

                  style={{ width: "100%", height: 145, objectFit: "cover", display: "block", borderRadius: 4 }}

 

                />

 

                <p style={{ fontSize: 11, color: "#827665", margin: "9px 0" }}>

 

                  {item.image_type === "cover" ? "CATEGORY COVER" : `GALLERY PHOTO · ${item.display_order || ""}`}

 

                </p>

 

                <p style={item.is_active ? S.visible : S.hidden}>

 

                  {item.is_active ? "VISIBLE ON WEBSITE" : "HIDDEN FROM WEBSITE"}

 

                </p>

 

                <div style={S.actions}>

 

                  <button type="button" style={S.textButton} onClick={() => toggleProjectGalleryItem(item)}>

 

                    {item.is_active ? "HIDE" : "SHOW"}

 

                  </button>

 

                  {item.image_type === "gallery" && (

 

                    <>

 

                      <button type="button" style={S.textButton} onClick={() => moveProjectGalleryItem(item, -1)}>MOVE UP</button>

 

                      <button type="button" style={S.textButton} onClick={() => moveProjectGalleryItem(item, 1)}>MOVE DOWN</button>

 

                    </>

 

                  )}

 

                  <button type="button" style={S.deleteButton} onClick={() => deleteProjectGalleryItem(item)}>DELETE</button>

 

                </div>

 

              </article>

 

            ))}

 

          </div>

 

        )}

 

      </section>

 

 

 

      <section style={{ ...S.panel, marginBottom: 24 }}>

 

 

 

        <p style={S.eyebrow}>WEBSITE CONTACT SETTINGS</p>

 

 

 

        <h2 style={S.sectionTitle}>Contact Number Management</h2>

 

 

 

        <p style={S.muted}>Inga number change panni SAVE pannina, website contact details and WhatsApp enquiry number update aagum.</p>

 

 

 

        <form onSubmit={saveContactSettings} style={S.form}>

 

 

 

          <label style={S.label}>

 

 

 

            Website Contact Number

 

 

 

            <input

 

 

 

              style={S.input}

 

 

 

              type="tel"

 

 

 

              value={contactSettings.contact_phone}

 

 

 

              onChange={(event) => setContactSettings((current) => ({

 

 

 

                ...current,

 

 

 

                contact_phone: event.target.value,

 

 

 

              }))}

 

 

 

              placeholder="9894432753"

 

 

 

              required

 

 

 

            />

 

 

 

          </label>

 

 

 

          <label style={S.label}>

 

 

 

            WhatsApp Number (country code-oda, + symbol illama)

 

 

 

            <input

 

 

 

              style={S.input}

 

 

 

              type="tel"

 

 

 

              value={contactSettings.whatsapp_phone}

 

 

 

              onChange={(event) => setContactSettings((current) => ({

 

 

 

                ...current,

 

 

 

                whatsapp_phone: event.target.value,

 

 

 

              }))}

 

 

 

              placeholder="919894432753"

 

 

 

              required

 

 

 

            />

 

 

 

          </label>

 

 

 

          <div style={S.actions}>

 

 

 

            <button type="submit" disabled={contactSaving || contactLoading} style={S.primaryButton}>

 

 

 

              {contactSaving ? "SAVING..." : "SAVE CONTACT SETTINGS"}

 

 

 

            </button>

 

 

 

            <button type="button" style={S.outlineButton} onClick={loadContactSettings}>

 

 

 

              REFRESH

 

 

 

            </button>

 

 

 

          </div>

 

 

 

        </form>

 

 

 

        {contactLoading && <p style={S.muted}>Loading contact settings...</p>}

 

 

 

        {contactNotice && <p style={S.success}>{contactNotice}</p>}

 

 

 

        {contactError && <p style={S.error}>{contactError}</p>}

 

 

 

      </section>

 

 

 

      <section style={S.panel}>

 

 

 

        <p style={S.eyebrow}>HOMEPAGE VIDEO CONTROL</p>

 

 

 

        <h2 style={S.sectionTitle}>Social Video Management</h2>

 

 

 

        <p style={S.muted}>Owner select pannum videos mattum website-la display aagum.</p>

 

 

 

        <div style={S.tabs}>

 

 

 

          <button type="button" style={platform === "instagram" ? S.activeTab : S.tab}

 

 

 

            onClick={() => { setPlatform("instagram"); clearForm("instagram"); setNotice(""); setError(""); }}>

 

 

 

            Instagram Reels

 

 

 

          </button>

 

 

 

          <button type="button" style={platform === "youtube" ? S.activeTab : S.tab}

 

 

 

            onClick={() => { setPlatform("youtube"); clearForm("youtube"); setNotice(""); setError(""); }}>

 

 

 

            YouTube Videos

 

 

 

          </button>

 

 

 

        </div>

 

 

 

        <form onSubmit={saveVideo} style={S.form}>

 

 

 

          <label style={S.label}>

 

 

 

            Video title (optional)

 

 

 

            <input style={S.input} value={form.title}

 

 

 

              onChange={(e) => setForm({ ...form, title: e.target.value })}

 

 

 

              placeholder="Enter a video title" />

 

 

 

          </label>

 

 

 

          <label style={S.label}>

 

 

 

            {platform === "instagram" ? "Instagram Reel URL" : "YouTube Video URL"}

 

 

 

            <input style={S.input} type="url" required value={form.video_url}

 

 

 

              onChange={(e) => setForm({ ...form, video_url: e.target.value })}

 

 

 

              placeholder={platform === "instagram"

 

 

 

                ? "https://www.instagram.com/reel/..."

 

 

 

                : "https://www.youtube.com/watch?v=..."} />

 

 

 

          </label>

 

 

 

          <label style={S.checkbox}>

 

 

 

            <input type="checkbox" checked={form.is_active}

 

 

 

              onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />

 

 

 

            Show this video on website

 

 

 

          </label>

 

 

 

          <div style={S.actions}>

 

 

 

            <button type="submit" disabled={saving} style={S.primaryButton}>

 

 

 

              {saving ? "SAVING..." : editingId ? "UPDATE VIDEO" : "ADD VIDEO"}

 

 

 

            </button>

 

 

 

            {editingId && <button type="button" style={S.outlineButton} onClick={() => clearForm()}>

 

 

 

              CANCEL

 

 

 

            </button>}

 

 

 

          </div>

 

 

 

        </form>

 

 

 

        {notice && <p style={S.success}>{notice}</p>}

 

 

 

        {error && <p style={S.error}>{error}</p>}

 

 

 

        <div style={S.listHeader}>

 

 

 

          <h3 style={S.cardTitle}>{platform === "instagram" ? "Instagram Reels" : "YouTube Videos"}</h3>

 

 

 

          <button type="button" style={S.textButton} onClick={loadVideos}>REFRESH</button>

 

 

 

        </div>

 

 

 

        {loading ? <p style={S.muted}>Loading...</p> :

 

 

 

          currentVideos.length === 0 ? <p style={S.empty}>Innum video link add pannala.</p> :

 

 

 

          <div style={S.list}>

 

 

 

            {currentVideos.map((item) => (

 

 

 

              <article key={item.id} style={S.videoRow}>

 

 

 

                <div style={{ minWidth: 0, flex: 1 }}>

 

 

 

                  <strong>{item.title}</strong>

 

 

 

                  <a href={item.video_url} target="_blank" rel="noreferrer" style={S.url}>{item.video_url}</a>

 

 

 

                  <small style={item.is_active ? S.visible : S.hidden}>

 

 

 

                    {item.is_active ? "VISIBLE ON WEBSITE" : "HIDDEN FROM WEBSITE"}

 

 

 

                  </small>

 

 

 

                </div>

 

 

 

                <div style={S.actions}>

 

 

 

                  <button type="button" style={S.textButton} onClick={() => editVideo(item)}>EDIT</button>

 

 

 

                  <button type="button" style={S.textButton} onClick={() => toggleVisibility(item)}>

 

 

 

                    {item.is_active ? "HIDE" : "SHOW"}

 

 

 

                  </button>

 

 

 

                  <button type="button" style={S.deleteButton} onClick={() => removeVideo(item)}>DELETE</button>

 

 

 

                </div>

 

 

 

              </article>

 

 

 

            ))}

 

 

 

          </div>

 

 

 

        }

 

 

 

      </section>

 

 

 

      <CustomerTestimonialManager />

 

 

 

    </main>

 

 

 

  );

 

 

 

}

 

 

 

const TESTIMONIAL_MAX_BYTES = 500 * 1024 * 1024;

 

 

 

const TESTIMONIAL_BUCKET = "customer-testimonial-videos";

 

 

 

const TESTIMONIAL_CUSTOMERS = [

 

 

 

  ["Mr.R.Mahendra prabhu", "Alanganallur"],

 

 

 

  ["Mrs.S.Rukshanabanu", "Jaihindpuram"],

 

 

 

  ["Mr.D.Vasanthakumar", "Palamedu"],

 

 

 

  ["Mr.P.Kameshwaran", "Valluvar Colony"],

 

 

 

  ["Mr.Prasath", "Sellur"],

 

 

 

  ["Mr.Soloman Rajan", "Kadachanendhal"],

 

 

 

  ["Mr.Subburaj", "Sattur"],

 

 

 

  ["Mr.Elango", "Thayilpatti"],

 

 

 

  ["Mr.Vasanth", "Virudhunagar"],

 

 

 

  ["Mr.Paulraj", "Pudhukottai"]

 

 

 

];

 

 

 

 

 

const SITE_IMAGE_SLOTS = [

 

  { key: "company_logo", label: "Company Logo" },

 

  ...Array.from({ length: 7 }, (_, i) => ({ key: `home_project_${i + 1}`, label: `Homepage Project Photo ${i + 1}` })),

 

  ...Array.from({ length: 10 }, (_, i) => ({ key: `testimonial_${i + 1}`, label: `Customer Testimonial Photo ${i + 1}` })),

 

  ...Array.from({ length: 4 }, (_, i) => ({ key: `service_${i + 1}`, label: `Service Photo ${i + 1}` })),

 

];

 

 

 

function SiteImagesManager() {

 

  const [rows, setRows] = useState([]);

 

  const [selectedKey, setSelectedKey] = useState(SITE_IMAGE_SLOTS[0].key);

 

  const [file, setFile] = useState(null);

 

  const [loading, setLoading] = useState(true);

 

  const [uploading, setUploading] = useState(false);

 

  const [notice, setNotice] = useState("");

 

  const [error, setError] = useState("");

 

 

 

  const load = useCallback(async () => {

 

    setLoading(true);

 

    const { data, error: loadError } = await supabase

 

      .from("site_media").select("*").order("media_key", { ascending: true });

 

    if (loadError) setError(loadError.message);

 

    else setRows(data || []);

 

    setLoading(false);

 

  }, []);

 

 

 

  useEffect(() => { load(); }, [load]);

 

 

 

  async function upload(event) {

 

    event.preventDefault();

 

    setNotice("");

 

    setError("");

 

    if (!file || !file.type.startsWith("image/")) {

 

      setError("Image file select pannunga.");

 

      return;

 

    }

 

    setUploading(true);

 

    const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");

 

    const path = `site-media/${selectedKey}/${Date.now()}-${cleanName}`;

 

    const { error: storageError } = await supabase.storage

 

      .from("project-photos")

 

      .upload(path, file, { upsert: false, contentType: file.type, cacheControl: "3600" });

 

    if (storageError) {

 

      setError(storageError.message);

 

      setUploading(false);

 

      return;

 

    }

 

    const { data: publicData } = supabase.storage.from("project-photos").getPublicUrl(path);

 

    const { error: saveError } = await supabase.from("site_media").upsert({

 

      media_key: selectedKey,

 

      image_url: publicData.publicUrl,

 

      storage_path: path,

 

      is_active: true,

 

      updated_at: new Date().toISOString(),

 

    }, { onConflict: "media_key" });

 

    if (saveError) setError(saveError.message);

 

    else {

 

      setNotice("Photo website-la update aagivittathu.");

 

      setFile(null);

 

      const input = document.getElementById("site-media-file");

 

      if (input) input.value = "";

 

      await load();

 

    }

 

    setUploading(false);

 

  }

 

 

 

  async function setVisibility(row) {

 

    const { error: updateError } = await supabase.from("site_media")

 

      .update({ is_active: !row.is_active }).eq("media_key", row.media_key);

 

    if (updateError) setError(updateError.message);

 

    else await load();

 

  }

 

 

 

  const current = rows.find((row) => row.media_key === selectedKey);

 

  return (

 

    <div style={{ display: "grid", gap: 18 }}>

 

      <p style={S.muted}>Website-la irukkira logo, homepage project photos, service photos, testimonial photos ellam inga select panni replace pannalaam. Project category cover/gallery photos separate Project Gallery Manager-la irukkum.</p>

 

      <form onSubmit={upload} style={S.form}>

 

        <label style={S.label}>Photo location

 

          <select value={selectedKey} onChange={(e) => setSelectedKey(e.target.value)} style={S.input}>

 

            {SITE_IMAGE_SLOTS.map((slot) => <option key={slot.key} value={slot.key}>{slot.label}</option>)}

 

          </select>

 

        </label>

 

        {current?.image_url && (

 

          <div>

 

            <p style={S.muted}>Current photo</p>

 

            <img src={current.image_url} alt="Current website media" style={{ width: "min(100%, 360px)", maxHeight: 190, objectFit: "contain", background: "#F8F6F1", border: "1px solid #E9DFD0" }} />

 

          </div>

 

        )}

 

        <label style={S.label}>Choose replacement image

 

          <input id="site-media-file" type="file" accept="image/*" style={S.input} onChange={(e) => setFile(e.target.files?.[0] || null)} />

 

        </label>

 

        {file && <p style={S.muted}>Selected: {file.name}</p>}

 

        <button type="submit" disabled={uploading} style={S.primaryButton}>{uploading ? "UPLOADING..." : "UPLOAD / REPLACE PHOTO"}</button>

 

      </form>

 

      {notice && <p style={S.success}>{notice}</p>}

 

      {error && <p style={S.error}>{error}</p>}

 

      <div>

 

        <h3 style={S.sectionTitle}>Website Image Slots</h3>

 

        {loading ? <p style={S.muted}>Loading...</p> : (

 

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 12 }}>

 

            {SITE_IMAGE_SLOTS.map((slot) => {

 

              const row = rows.find((item) => item.media_key === slot.key);

 

              return (

 

                <article key={slot.key} style={{ border: "1px solid #E9DFD0", padding: 10, borderRadius: 5 }}>

 

                  <strong style={{ fontSize: 12 }}>{slot.label}</strong>

 

                  {row?.image_url ? <img src={row.image_url} alt={slot.label} style={{ width: "100%", height: 110, objectFit: "cover", marginTop: 8 }} /> : <div style={{ height: 110, display: "grid", placeItems: "center", background: "#F3EFE7", color: "#827665", marginTop: 8 }}>Default photo</div>}

 

                  <p style={S.muted}>{row ? (row.is_active ? "Custom photo active" : "Custom photo hidden") : "Using existing default"}</p>

 

                  {row && <button type="button" style={S.textButton} onClick={() => setVisibility(row)}>{row.is_active ? "USE DEFAULT PHOTO" : "SHOW CUSTOM PHOTO"}</button>}

 

                  <button type="button" style={S.textButton} onClick={() => setSelectedKey(slot.key)}>SELECT TO REPLACE</button>

 

                </article>

 

              );

 

            })}

 

          </div>

 

        )}

 

      </div>

 

    </div>

 

  );

 

}

 

 

 

 

 

const MANAGEMENT_TABLES = {

 

  Projects: { table: "site_projects", fields: [

 

    ["section", "Section", "text"], ["title", "Project title", "text"],

 

    ["category", "Category", "text"], ["subtitle", "Subtitle", "text"],

 

  ]},

 

  Photos: { table: "projects", fields: [

 

    ["title", "Photo title", "text"], ["location", "Location", "text"],

 

    ["description", "Description", "textarea"], ["status", "Status", "text"],

 

    ["image_path", "Image URL / storage path", "text"],

 

    ["is_active", "Show on website", "boolean"], ["display_order", "Display order", "number"],

 

  ]},

 

  Services: { table: "site_services", fields: [

 

    ["number", "Number", "text"], ["title", "Service title", "text"],

 

    ["subtitle", "Subtitle", "text"], ["description", "Description", "textarea"],

 

    ["image_path", "Image URL / storage path", "text"],

 

    ["is_active", "Show on website", "boolean"], ["display_order", "Display order", "number"],

 

  ]},

 

  Packages: { table: "site_packages", fields: [

 

    ["group_key", "Package group", "text"], ["title", "Package title", "text"],

 

    ["short_title", "Short title", "text"], ["description", "Description", "textarea"],

 

    ["standard_rate", "Standard rate", "number"], ["standard_note", "Standard note", "textarea"],

 

    ["premium_rate", "Premium rate", "number"], ["premium_note", "Premium note", "textarea"],

 

    ["elite_rate", "Elite rate", "number"], ["elite_note", "Elite note", "textarea"],

 

    ["is_active", "Show on website", "boolean"], ["display_order", "Display order", "number"],

 

  ]},

 

  "Website Content": { table: "site_content", fields: [

 

    ["content_key", "Content key", "text"], ["label", "Label", "text"],

 

    ["content_value", "Website text / value", "textarea"],

 

    ["is_public", "Public on website", "boolean"], ["display_order", "Display order", "number"],

 

  ]},

 

};

 

function SupabaseTableManager({ section }) {

 

  const config = MANAGEMENT_TABLES[section];

 

  const [rows, setRows] = useState([]);

 

  const [form, setForm] = useState({});

 

  const [editingId, setEditingId] = useState(null);

 

  const [loading, setLoading] = useState(true);

 

  const [saving, setSaving] = useState(false);

 

  const [error, setError] = useState("");

 

  const [notice, setNotice] = useState("");

 

  const [photoFile, setPhotoFile] = useState(null);

 

  const [heroImageFile, setHeroImageFile] = useState(null);

 

  const loadRows = useCallback(async () => {

 

    if (!config) return;

 

    setLoading(true);

 

    setError("");

 

    const { data, error: loadError } = await supabase.from(config.table).select("*");

 

    if (loadError) {

 

      setError("Load panna mudiyala: " + loadError.message);

 

      setRows([]);

 

    } else {

 

      const sorted = [...(data || [])].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));

 

      setRows(sorted);

 

    }

 

    setLoading(false);

 

  }, [config]);

 

  useEffect(() => { loadRows(); }, [loadRows]);

 

  const fields = config?.fields || [];

 

  function startNew() {

 

    const values = {};

 

    fields.forEach(([key, , type]) => { values[key] = type === "boolean" ? true : type === "number" ? 0 : ""; });

 

    setForm(values);

 

    setEditingId(null);

 

    setPhotoFile(null);

 

    setHeroImageFile(null);

 

    setNotice("");

 

    setError("");

 

  }

 

  function startEdit(row) {

 

    const values = {};

 

    fields.forEach(([key, , type]) => { values[key] = row[key] ?? (type === "boolean" ? false : ""); });

 

    setForm(values);

 

    setEditingId(config.table === "site_content" ? row.content_key : row.id);

 

    setPhotoFile(null);

 

    setHeroImageFile(null);

 

    setNotice("");

 

    setError("");

 

  }

 

  async function saveRow(event) {

 

    event.preventDefault();

 

    if (config.table === "projects" && editingId === null && !photoFile) {

 

      setError("Photo file select pannunga.");

 

      return;

 

    }

 

    setSaving(true);

 

    setError("");

 

    setNotice("");

 

    const payload = {};

 

    fields.forEach(([key, , type]) => {

 

      const value = form[key];

 

      if (key === "image_path" && config.table === "projects") return;

 

      payload[key] = type === "number" ? (value === "" ? null : Number(value)) : type === "boolean" ? Boolean(value) : value;

 

    });

 

    if (config.table === "projects" && photoFile) {

 

      const safeName = photoFile.name.replace(/[^a-zA-Z0-9._-]/g, "-");

 

      const storagePath = `project-photos/${Date.now()}-${safeName}`;

 

      const { error: uploadError } = await supabase.storage

 

        .from("project-photos")

 

        .upload(storagePath, photoFile, { cacheControl: "3600", upsert: false });

 

      if (uploadError) {

 

        setError("Photo upload panna mudiyala: " + uploadError.message + ". Supabase Storage-la public 'project-photos' bucket create pannunga.");

 

        setSaving(false);

 

        return;

 

      }

 

      const { data: publicData } = supabase.storage.from("project-photos").getPublicUrl(storagePath);

 

      payload.image_path = publicData.publicUrl;

 

    }

 

    // Homepage hero image: upload into the existing public project-photos bucket

 

    // and save its public URL in site_content.content_value for hero_image_url.

 

    if (config.table === "site_content" && form.content_key === "hero_image_url" && heroImageFile) {

 

      const safeName = heroImageFile.name.replace(/[^a-zA-Z0-9._-]/g, "-");

 

      const storagePath = `homepage/hero-${Date.now()}-${safeName}`;

 

      const { error: uploadError } = await supabase.storage

 

        .from("project-photos")

 

        .upload(storagePath, heroImageFile, { cacheControl: "3600", upsert: true, contentType: heroImageFile.type });

 

      if (uploadError) {

 

        setError("Homepage image upload panna mudiyala: " + uploadError.message + ". Storage upload policy check pannunga.");

 

        setSaving(false);

 

        return;

 

      }

 

      const { data: publicData } = supabase.storage.from("project-photos").getPublicUrl(storagePath);

 

      payload.content_value = publicData.publicUrl;

 

    }

 

    const idColumn = config.table === "site_content" ? "content_key" : "id";

 

    const result = editingId !== null

 

      ? await supabase.from(config.table).update(payload).eq(idColumn, editingId)

 

      : await supabase.from(config.table).insert(payload);

 

    if (result.error) setError("Save panna mudiyala: " + result.error.message);

 

    else {

 

      setNotice(editingId !== null ? "Changes saved." : "New item added.");

 

      startNew();

 

      await loadRows();

 

    }

 

    setSaving(false);

 

  }

 

  async function deleteRow(row) {

 

    const idColumn = config.table === "site_content" ? "content_key" : "id";

 

    const rowId = row[idColumn];

 

    const title = row.title || row.label || row.content_key || "this item";

 

    if (!window.confirm(`"${title}" delete pannava?`)) return;

 

    const { error: deleteError } = await supabase.from(config.table).delete().eq(idColumn, rowId);

 

    if (deleteError) setError("Delete panna mudiyala: " + deleteError.message);

 

    else {

 

      setNotice("Item deleted.");

 

      if (editingId === rowId) startNew();

 

      await loadRows();

 

    }

 

  }

 

  if (!config) return <p style={S.error}>Management section configuration missing.</p>;

 

  return (

 

    <div>

 

      <p style={S.muted}>Supabase table: <strong>{config.table}</strong></p>

 

      <div style={{ ...S.actions, margin: "18px 0" }}>

 

        <button type="button" style={S.primaryButton} onClick={startNew}>ADD NEW</button>

 

        <button type="button" style={S.outlineButton} onClick={loadRows}>REFRESH</button>

 

      </div>

 

      <form onSubmit={saveRow} style={{ ...S.form, maxWidth: 900, padding: 18, border: "1px solid #E9DFD0", borderRadius: 8, marginBottom: 22 }}>

 

        <h3 style={S.cardTitle}>{editingId !== null ? "Edit item" : "Add new item"}</h3>

 

        {fields.map(([key, label, type]) => (

 

          <label key={key} style={S.label}>

 

            {label}

 

            {type === "boolean" ? (

 

              <input type="checkbox" checked={Boolean(form[key])}

 

                onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.checked }))} />

 

            ) : config.table === "site_content" && key === "content_value" && form.content_key === "hero_image_url" ? (

 

              <div>

 

                <input

 

                  style={S.input}

 

                  type="file"

 

                  accept="image/jpeg,image/png,image/webp"

 

                  onChange={(event) => setHeroImageFile(event.target.files?.[0] || null)}

 

                />

 

                <small style={S.muted}>

 

                  {heroImageFile ? `Selected: ${heroImageFile.name}` : (form.content_value ? "Current homepage image is saved. Select a new JPG, PNG or WEBP file to replace it." : "JPG, PNG or WEBP image select pannunga.")}

 

                </small>

 

                {form.content_value && <img src={form.content_value} alt="Current homepage heading" style={{ display: "block", width: "min(100%, 360px)", maxHeight: 180, objectFit: "cover", marginTop: 10, borderRadius: 6 }} />}

 

              </div>

 

            ) : type === "textarea" ? (

 

              <textarea style={{ ...S.input, minHeight: 90, resize: "vertical" }} value={form[key] ?? ""}

 

                onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))} />

 

            ) : key === "image_path" && config.table === "projects" ? (

 

              <div>

 

                <input

 

                  style={S.input}

 

                  type="file"

 

                  accept="image/jpeg,image/png,image/webp"

 

                  onChange={(event) => setPhotoFile(event.target.files?.[0] || null)}

 

                />

 

                <small style={S.muted}>

 

                  {photoFile ? `Selected: ${photoFile.name}` : (form.image_path ? "Current photo is saved. Select a new file only if you want to replace it." : "JPG, PNG or WEBP photo select pannunga. URL paste panna thevai illai.")}

 

                </small>

 

              </div>

 

            ) : (

 

              <input style={S.input} type={type === "number" ? "number" : "text"}

 

                step={type === "number" ? "0.01" : undefined} value={form[key] ?? ""}

 

                onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))} />

 

            )}

 

          </label>

 

        ))}

 

        <div style={S.actions}>

 

          <button type="submit" disabled={saving} style={S.primaryButton}>{saving ? (editingId !== null ? "UPDATING..." : "SAVING...") : editingId !== null ? "UPDATE ITEM" : "ADD ITEM"}</button>

 

          {editingId !== null && <button type="button" style={S.outlineButton} onClick={startNew}>CANCEL EDIT</button>}

 

        </div>

 

      </form>

 

      {notice && <p style={S.success}>{notice}</p>}

 

      {error && <p style={S.error}>{error}</p>}

 

      <div style={S.listHeader}><h3 style={S.cardTitle}>Saved items ({rows.length})</h3></div>

 

      {loading ? <p style={S.muted}>Loading...</p> : rows.length === 0 ? <p style={S.empty}>No records found in this table.</p> : (

 

        <div style={S.list}>

 

          {rows.map((row) => (

 

            <article key={row.id || row.content_key} style={S.videoRow}>

 

              <div style={{ minWidth: 0, flex: 1 }}>

 

                <strong>{row.title || row.label || row.content_key || row.location || "Untitled item"}</strong>

 

                <p style={S.muted}>{row.subtitle || row.description || row.content_value || row.image_path || row.location || ""}</p>

 

              </div>

 

              <div style={S.actions}>

 

                <button type="button" style={S.textButton} onClick={() => startEdit(row)}>EDIT</button>

 

                <button type="button" style={S.deleteButton} onClick={() => deleteRow(row)}>DELETE</button>

 

              </div>

 

            </article>

 

          ))}

 

        </div>

 

      )}

 

    </div>

 

  );

 

}

 

 

 

function CustomerTestimonialManager() {

 

 

 

  const [customerIndex, setCustomerIndex] = useState("0");

 

 

 

  const [file, setFile] = useState(null);

 

 

 

  const [videos, setVideos] = useState([]);

 

 

 

  const [loading, setLoading] = useState(false);

 

 

 

  const [uploading, setUploading] = useState(false);

 

 

 

  const [notice, setNotice] = useState("");

 

 

 

  const [error, setError] = useState("");

 

 

 

  const loadTestimonials = useCallback(async () => {

 

 

 

    setLoading(true);

 

 

 

    const { data, error: listError } = await supabase

 

 

 

      .from("customer_testimonial_videos")

 

 

 

      .select("*")

 

 

 

      .order("display_order", { ascending: true })

 

 

 

      .order("created_at", { ascending: true });

 

 

 

    if (listError) {

 

 

 

      setError("Customer video list load aagala: " + listError.message);

 

 

 

      setVideos([]);

 

 

 

    } else {

 

 

 

      setVideos(data || []);

 

 

 

    }

 

 

 

    setLoading(false);

 

 

 

  }, []);

 

 

 

  useEffect(() => { loadTestimonials(); }, [loadTestimonials]);

 

 

 

  async function uploadTestimonial(event) {

 

 

 

    event.preventDefault();

 

 

 

    setNotice("");

 

 

 

    setError("");

 

 

 

    if (!file) {

 

 

 

      setError("Upload panna video file select pannunga.");

 

 

 

      return;

 

 

 

    }

 

 

 

    if (file.size > TESTIMONIAL_MAX_BYTES) {

 

 

 

      setError("Video 500 MB-க்கு மேல் இருக்கக்கூடாது.");

 

 

 

      return;

 

 

 

    }

 

 

 

    if (!["video/mp4", "video/webm", "video/quicktime"].includes(file.type)) {

 

 

 

      setError("MP4, WEBM அல்லது MOV video file மட்டும் upload செய்யலாம்.");

 

 

 

      return;

 

 

 

    }

 

 

 

    const [customerName, location] = TESTIMONIAL_CUSTOMERS[Number(customerIndex)];

 

 

 

    const existing = videos.find((item) =>

 

 

 

      item.customer_name === customerName && item.location === location

 

 

 

    );

 

 

 

    setUploading(true);

 

 

 

    const extension = file.name.split(".").pop()?.toLowerCase() || "mp4";

 

 

 

    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;

 

 

 

    const storagePath = `${Number(customerIndex) + 1}/${safeName}`;

 

 

 

    const { error: uploadError } = await supabase.storage

 

 

 

      .from(TESTIMONIAL_BUCKET)

 

 

 

      .upload(storagePath, file, {

 

 

 

        cacheControl: "3600",

 

 

 

        upsert: false,

 

 

 

        contentType: file.type

 

 

 

      });

 

 

 

    if (uploadError) {

 

 

 

      setError("Upload fail aachu: " + uploadError.message);

 

 

 

      setUploading(false);

 

 

 

      return;

 

 

 

    }

 

 

 

    const { data: publicData } = supabase.storage

 

 

 

      .from(TESTIMONIAL_BUCKET)

 

 

 

      .getPublicUrl(storagePath);

 

 

 

    const payload = {

 

 

 

      customer_name: customerName,

 

 

 

      location,

 

 

 

      video_url: publicData.publicUrl,

 

 

 

      storage_path: storagePath,

 

 

 

      is_active: true,

 

 

 

      display_order: Number(customerIndex) + 1,

 

 

 

      updated_at: new Date().toISOString()

 

 

 

    };

 

 

 

    const saveResult = existing

 

 

 

      ? await supabase.from("customer_testimonial_videos").update(payload).eq("id", existing.id)

 

 

 

      : await supabase.from("customer_testimonial_videos").insert(payload);

 

 

 

    if (saveResult.error) {

 

 

 

      await supabase.storage.from(TESTIMONIAL_BUCKET).remove([storagePath]);

 

 

 

      setError("Database save fail aachu: " + saveResult.error.message);

 

 

 

    } else {

 

 

 

      setNotice(`${customerName} (${location}) video upload aagivittathu.`);

 

 

 

      setFile(null);

 

 

 

      const input = document.getElementById("customer-testimonial-file");

 

 

 

      if (input) input.value = "";

 

 

 

      await loadTestimonials();

 

 

 

    }

 

 

 

    setUploading(false);

 

 

 

  }

 

 

 

  async function toggleTestimonial(item) {

 

 

 

    setError("");

 

 

 

    setNotice("");

 

 

 

    const { error: updateError } = await supabase

 

 

 

      .from("customer_testimonial_videos")

 

 

 

      .update({ is_active: !item.is_active, updated_at: new Date().toISOString() })

 

 

 

      .eq("id", item.id);

 

 

 

    if (updateError) setError(updateError.message);

 

 

 

    else {

 

 

 

      setNotice(item.is_active ? "Website-la irundhu hide panniyachu." : "Website-la display aagum.");

 

 

 

      await loadTestimonials();

 

 

 

    }

 

 

 

  }

 

 

 

  async function deleteTestimonial(item) {

 

 

 

    if (!window.confirm(`${item.customer_name} video-va delete pannava?`)) return;

 

 

 

    setError("");

 

 

 

    setNotice("");

 

 

 

    const { error: storageError } = await supabase.storage

 

 

 

      .from(TESTIMONIAL_BUCKET)

 

 

 

      .remove([item.storage_path]);

 

 

 

    if (storageError) {

 

 

 

      setError("Storage delete fail aachu: " + storageError.message);

 

 

 

      return;

 

 

 

    }

 

 

 

    const { error: rowError } = await supabase

 

 

 

      .from("customer_testimonial_videos")

 

 

 

      .delete()

 

 

 

      .eq("id", item.id);

 

 

 

    if (rowError) setError("Record delete fail aachu: " + rowError.message);

 

 

 

    else {

 

 

 

      setNotice("Customer video deleted.");

 

 

 

      await loadTestimonials();

 

 

 

    }

 

 

 

  }

 

 

 

  return (

 

 

 

    <section style={S.panel}>

 

 

 

      <p style={S.eyebrow}>CUSTOMER TESTIMONIALS</p>

 

 

 

      <h2 style={S.sectionTitle}>Direct Video Upload</h2>

 

 

 

      <p style={S.muted}>

 

 

 

        Customer select செய்து video file-ஐ நேரடியாக upload செய்யலாம். ஒரு video-க்கு அதிகபட்சம் 500 MB.

 

 

 

        MP4, WEBM, MOV formats மட்டும்.

 

 

 

      </p>

 

 

 

      <form onSubmit={uploadTestimonial} style={S.form}>

 

 

 

        <label style={S.label}>

 

 

 

          Customer name

 

 

 

          <select style={S.input} value={customerIndex}

 

 

 

            onChange={(event) => setCustomerIndex(event.target.value)}>

 

 

 

            {TESTIMONIAL_CUSTOMERS.map(([name, location], index) => (

 

 

 

              <option key={name} value={String(index)}>{name} ({location})</option>

 

 

 

            ))}

 

 

 

          </select>

 

 

 

        </label>

 

 

 

        <label style={S.label}>

 

 

 

          Select video file (maximum 500 MB)

 

 

 

          <input id="customer-testimonial-file" style={S.input} type="file"

 

 

 

            accept="video/mp4,video/webm,video/quicktime"

 

 

 

            onChange={(event) => setFile(event.target.files?.[0] || null)} />

 

 

 

        </label>

 

 

 

        {file && <p style={S.muted}>Selected: {file.name} · {(file.size / (1024 * 1024)).toFixed(1)} MB</p>}

 

 

 

        <div style={S.actions}>

 

 

 

          <button type="submit" disabled={uploading || !file} style={S.primaryButton}>

 

 

 

            {uploading ? "UPLOADING..." : "UPLOAD CUSTOMER VIDEO"}

 

 

 

          </button>

 

 

 

          <button type="button" style={S.outlineButton} onClick={loadTestimonials}>REFRESH LIST</button>

 

 

 

        </div>

 

 

 

      </form>

 

 

 

      {notice && <p style={S.success}>{notice}</p>}

 

 

 

      {error && <p style={S.error}>{error}</p>}

 

 

 

      <div style={S.listHeader}><h3 style={S.cardTitle}>Uploaded Customer Videos</h3></div>

 

 

 

      {loading ? <p style={S.muted}>Loading...</p> : videos.length === 0 ? (

 

 

 

        <p style={S.empty}>Innum customer video upload pannala.</p>

 

 

 

      ) : (

 

 

 

        <div style={S.list}>

 

 

 

          {videos.map((item) => (

 

 

 

            <article key={item.id} style={S.videoRow}>

 

 

 

              <div style={{ minWidth: 0, flex: 1 }}>

 

 

 

                <strong>{item.customer_name} ({item.location})</strong>

 

 

 

                <a href={item.video_url} target="_blank" rel="noreferrer" style={S.url}>Open uploaded video</a>

 

 

 

                <small style={item.is_active ? S.visible : S.hidden}>

 

 

 

                  {item.is_active ? "VISIBLE ON WEBSITE" : "HIDDEN FROM WEBSITE"}

 

 

 

                </small>

 

 

 

              </div>

 

 

 

              <div style={S.actions}>

 

 

 

                <button type="button" style={S.textButton} onClick={() => toggleTestimonial(item)}>

 

 

 

                  {item.is_active ? "HIDE" : "SHOW"}

 

 

 

                </button>

 

 

 

                <button type="button" style={S.deleteButton} onClick={() => deleteTestimonial(item)}>DELETE</button>

 

 

 

              </div>

 

 

 

            </article>

 

 

 

          ))}

 

 

 

        </div>

 

 

 

      )}

 

 

 

    </section>

 

 

 

  );

 

 

 

}

 

 

 

const S = {

 

 

 

  page: { minHeight: "100vh", background: "#F8F6F1", color: "#4A4036", padding: "45px 7%", fontFamily: "'DM Sans', sans-serif" },

 

 

 

  header: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20, marginBottom: 40 },

 

 

 

  eyebrow: { letterSpacing: 3, fontSize: 11, margin: "0 0 10px" },

 

 

 

  heading: { fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 38, margin: "0 0 8px" },

 

 

 

  sectionTitle: { fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 30, margin: "0 0 8px" },

 

 

 

  muted: { color: "#827665", lineHeight: 1.7, margin: "6px 0" },

 

 

 

  cards: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18, marginBottom: 40 },

 

 

 

  card: { background: "#FFFFFF", padding: 24, border: "1px solid #E9DFD0", borderRadius: 8 },

 

 

 

  cardTitle: { fontSize: 19, fontWeight: 500, margin: "12px 0 6px" },

 

 

 

  panel: { background: "#FFFFFF", border: "1px solid #E9DFD0", borderRadius: 10, padding: 28 },

 

 

 

  tabs: { display: "flex", flexWrap: "wrap", gap: 10, borderBottom: "1px solid #E9DFD0", paddingBottom: 14, margin: "22px 0" },

 

 

 

  tab: { background: "#F8F6F1", border: "1px solid #E9DFD0", color: "#4A4036", padding: "11px 17px", cursor: "pointer", borderRadius: 5 },

 

 

 

  activeTab: { background: "#4A4036", border: "1px solid #4A4036", color: "#FFFFFF", padding: "11px 17px", cursor: "pointer", borderRadius: 5 },

 

 

 

  form: { display: "grid", gap: 16, maxWidth: 720 },

 

 

 

  label: { display: "grid", gap: 7, fontSize: 13, fontWeight: 600 },

 

 

 

  input: { width: "100%", padding: "13px 14px", border: "1px solid #D9CDBB", borderRadius: 5, background: "#FFFEFC", color: "#4A4036", font: "inherit", fontWeight: 400 },

 

 

 

  checkbox: { display: "flex", alignItems: "center", gap: 9, fontSize: 13 },

 

 

 

  actions: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 },

 

 

 

  primaryButton: { background: "#4A4036", color: "#FFFFFF", border: 0, borderRadius: 5, padding: "13px 20px", cursor: "pointer", letterSpacing: 1, fontSize: 11 },

 

 

 

  outlineButton: { background: "transparent", color: "#4A4036", border: "1px solid #827665", borderRadius: 5, padding: "12px 18px", cursor: "pointer", letterSpacing: 1, fontSize: 11 },

 

 

 

  success: { color: "#356B45", background: "#EEF5EF", padding: 12, borderRadius: 5, marginTop: 18 },

 

 

 

  error: { color: "#9A3D32", background: "#FBEFEC", padding: 12, borderRadius: 5, marginTop: 18, overflowWrap: "anywhere" },

 

 

 

  listHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginTop: 32, borderBottom: "1px solid #E9DFD0", paddingBottom: 12 },

 

 

 

  textButton: { background: "transparent", border: 0, color: "#6D5945", cursor: "pointer", fontSize: 11, letterSpacing: 1, padding: 8 },

 

 

 

  empty: { padding: 20, background: "#F8F6F1", color: "#827665", borderRadius: 5 },

 

 

 

  list: { display: "grid", gap: 12, marginTop: 16 },

 

 

 

  videoRow: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 18, flexWrap: "wrap", border: "1px solid #E9DFD0", borderRadius: 6, padding: 16 },

 

 

 

  url: { display: "block", color: "#827665", fontSize: 12, overflowWrap: "anywhere", margin: "6px 0" },

 

 

 

  visible: { color: "#356B45", fontSize: 10, letterSpacing: 1 },

 

 

 

  hidden: { color: "#9A6A35", fontSize: 10, letterSpacing: 1 },

 

 

 

  deleteButton: { background: "transparent", border: 0, color: "#A33F35", cursor: "pointer", fontSize: 11, letterSpacing: 1, padding: 8 },

 

 

 

};