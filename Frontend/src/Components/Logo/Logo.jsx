const Logo = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {/* Lightning icon */}
      <div style={{
        width: "36px",
        height: "36px",
        borderRadius: "8px",
        background: "#ff4b1e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }}>
        <svg width="20" height="20" viewBox="0 0 30 30" fill="none">
          <path d="M18 3L8 16H15L12 27L22 14H15L18 3Z"
            fill="white" stroke="white" strokeWidth="0.5" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Wordmark */}
      <span style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 900,
        fontSize: "32px",
        letterSpacing: "-1px",
        textTransform: "uppercase",
        lineHeight: 1
      }}>
        <span style={{ color: "#ff4b1e" }}>Zip</span>
        <span style={{ color: "#ffffff" }}>Food</span>
        <span style={{ color: "#ff4b1e" }}>.</span>
      </span>
    </div>
  );
};

export default Logo;