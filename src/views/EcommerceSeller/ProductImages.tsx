"use client";
import { Box } from "@mui/material";

export default function ProductImages({
  images,
  selectedImage,
  setselectedImage,
}: any) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start", // centers thumbnails + main image
        gap: 3,
      }}
    >
      {/* Thumbnails */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          maxHeight: 800,
          overflowY: "auto",
          pr: 1,
        }}
      >
        {images.map((img: string, idx: number) => (
          <Box
            key={idx}
            component="img"
            src={img}
            onClick={() => setselectedImage(img)}
            onMouseEnter={() => setselectedImage(img)}
            sx={{
              width: 80,
              height: 80,
              objectFit: "cover",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              border:
                selectedImage === img ? "2px solid #2874f0" : "1px solid #ddd",
            }}
          />
        ))}
      </Box>

      {/* Main Image */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          src={selectedImage}
          sx={{
            width: { xs: "100%", md: 420 },
            height: 420,
            objectFit: "contain",
            borderRadius: "12px",
            boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)", // zoom on hover
            },
          }}
        />
      </Box>
    </Box>
  );
}
