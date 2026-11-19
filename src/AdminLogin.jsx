import React, { useState } from "react";

import { supabase } from "./supabase";

 

export default function AdminLogin() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

 

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError("");

 

    try {

      const { error } = await supabase.auth.signInWithPassword({

        email,

        password,

      });

 

      if (error) {

        setError(error.message);

        return;

      }

 

      window.location.href = "/admin/dashboard";

    } catch (err) {

      setError(err.message || "Login failed");

    } finally {

      setLoading(false);

    }

  };

 

  return (

    <div style={{

      minHeight: "100vh",

      display: "flex",

      justifyContent: "center",

      alignItems: "center",

      background: "#f5f0e8",

      padding: "20px"

    }}>

      <form onSubmit={handleLogin} style={{

        background: "#fff",

        padding: "40px",

        borderRadius: "12px",

        width: "100%",

        maxWidth: "400px",

        boxShadow: "0 5px 25px #00000012"

      }}>

        <h2 style={{ textAlign: "center", color: "#594936" }}>

          TSK Admin Login

        </h2>

 

        <p style={{ textAlign: "center", color: "#777" }}>

          Owner Access Only

        </p>

 

        <label>Email</label>

        <input

          type="email"

          value={email}

          onChange={(e) => setEmail(e.target.value)}

          required

          style={{ width: "100%", padding: "12px", margin: "10px 0 20px" }}

        />

 

        <label>Password</label>

        <input

          type="password"

          value={password}

          onChange={(e) => setPassword(e.target.value)}

          required

          style={{ width: "100%", padding: "12px", margin: "10px 0 20px" }}

        />

 

        {error && (

          <p style={{ color: "red", fontSize: "14px" }}>{error}</p>

        )}

 

        <button

          type="submit"

          disabled={loading}

          style={{

            width: "100%",

            padding: "14px",

            background: "#8b7355",

            color: "white",

            border: "none",

            borderRadius: "6px",

            cursor: "pointer"

          }}

        >

          {loading ? "Logging in..." : "LOGIN"}

        </button>

      </form>

    </div>

  );

}