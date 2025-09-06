"use client";
import { useState } from "react";
import { Box, Button, Dialog, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward, Close } from "@mui/icons-material";

type ProductImagesProps = {
  images: string[];
  selectedImage: string | null;
  setSelectedImage: (img: string) => void;
};

export default function ProductImages({
  images,
  selectedImage,
  setSelectedImage,
}: ProductImagesProps) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(
    selectedImage ? images.indexOf(selectedImage) : 0
  );

  const handleOpen = (index: number) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const handleNext = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "flex-start",
          gap: { xs: 2, md: 1 },
          width: "100%",
        }}
      >
        {/* Thumbnails */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", sm: "column" },
            gap: 1.5,
            maxHeight: { sm: 800 },
            maxWidth: { xs: "100%", sm: 100 },
            overflowX: { xs: "auto", sm: "hidden" },
            overflowY: { xs: "hidden", sm: "auto" },
            // pr: { sm: 1 },
          }}
        >
          {images.map((img, idx) => (
            <Box
              key={idx}
              component="img"
              src={img}
              onClick={() => setSelectedImage(img)}
              onMouseEnter={() => setSelectedImage(img)}
              sx={{
                width: 80,
                height: 80,
                flexShrink: 0,
                objectFit: "cover",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                border:
                  selectedImage === img
                    ? "2px solid #2874f0"
                    : "1px solid #ddd",
              }}
            />
          ))}
        </Box>

        {/* Main Image */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={selectedImage ?? images[0]}
            onClick={() =>
              handleOpen(images.indexOf(selectedImage ?? images[0]))
            }
            sx={{
              width: { xs: "100%", sm: 400 },
              height: { xs: "auto", sm: 400 },
              maxHeight: 400,
              objectFit: "contain",
              borderRadius: "12px",
              boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
              cursor: "zoom-in",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
          {/* Buttons under image */}
          <Box
            sx={{
              mt: 3,
              width: { xs: "100%", sm: 400 }, // ✅ same as image width
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 1.5,
            }}
          >
            <Button
              fullWidth
              variant="outlined"
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 600,
                py: 1.2,
              }}
            >
              🛒 Add to Cart
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 600,
                py: 1.2,
                background: "linear-gradient(135deg, #ff5722, #ff9800)",
                "&:hover": {
                  background: "linear-gradient(135deg, #e64a19, #f57c00)",
                },
              }}
            >
              ⚡ Buy Now
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Lightbox Dialog */}
      <Dialog open={open} onClose={handleClose} fullScreen>
        {/* Close button */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            bgcolor: "rgba(0,0,0,0.5)",
            color: "#fff",
            "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
          }}
        >
          <Close />
        </IconButton>

        {/* Prev button */}
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            left: 20,
            top: "50%",
            transform: "translateY(-50%)",
            bgcolor: "rgba(0,0,0,0.5)",
            color: "#fff",
            "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
          }}
        >
          <ArrowBack />
        </IconButton>

        {/* Next button */}
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            right: 20,
            top: "50%",
            transform: "translateY(-50%)",
            bgcolor: "rgba(0,0,0,0.5)",
            color: "#fff",
            "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
          }}
        >
          <ArrowForward />
        </IconButton>

        {/* Zoomed Image */}
        <Box
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#000",
          }}
        >
          <Box
            component="img"
            src={images[currentIndex]}
            sx={{
              maxWidth: "95%",
              maxHeight: "95%",
              objectFit: "contain",
            }}
          />
        </Box>
      </Dialog>
    </>
  );
}
