"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Container,
  Typography,
  Box,
  Button,
  CircularProgress,
  Card,
} from "@mui/material";
import EcommerceHeader from "./EcommerceHeader";
import ProductImages from "./ProductImages";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category?: string;
  stock?: number;
  brand?: string;
  sku?: string;
  discountPrice?: number;
  rating?: number;
  reviewsCount?: number;
  weight?: string;
  dimensions?: string;
  warranty?: string;
  material?: string;
  colorOptions?: string[];
  images?: string[];
}

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setselectedImage] = useState(product?.images[0]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products?id=${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
        setselectedImage(data?.images[0] || data?.image);
      } catch (err) {
        console.error("❌ Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Typography variant="h6" align="center" mt={10}>
        Product not found
      </Typography>
    );
  }

  return (
    <>
      <EcommerceHeader />
      <Container sx={{ mt: 6, mb: 6 }}>
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            p: 3,
            borderRadius: "16px",
            boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          }}
        >
          {/* Left: Image + Buttons */}
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", gap: 4 }}>
              <ProductImages
                images={product?.images ?? []}
                selectedImage={selectedImage}
                setselectedImage={setselectedImage}
              />
              {/* <Box
                component="img"
                src={selectedImage || product?.images?.[0] || product.image}
                alt={product.name}
                sx={{
                  width: "100%",
                  height: 400,
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              /> */}
            </Box>

            {/* Buttons under image */}
            <Box
              sx={{
                mt: 2,
                display: "flex",
                gap: 1,
                justifyContent: "center",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  flex: 1,
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                🛒 Add to Cart
              </Button>
              <Button
                variant="contained"
                sx={{
                  flex: 1,
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: 600,
                  background: "linear-gradient(135deg, #ff5722, #ff9800)",
                }}
              >
                ⚡ Buy Now
              </Button>
            </Box>
          </Box>

          {/* Right: Details */}
          <Box sx={{ flex: 1, pl: { md: 4 }, mt: { xs: 3, md: 0 } }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              {product.name}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {product.category}
            </Typography>

            <Typography
              variant="h5"
              fontWeight="bold"
              color="error"
              sx={{ mb: 2 }}
            >
              ₹{product.price.toLocaleString()}
            </Typography>

            <Typography
              variant="body1"
              sx={{ mb: 3, lineHeight: 1.6, color: "text.secondary" }}
            >
              {product.description}
            </Typography>

            {product.stock !== undefined && (
              <Typography
                variant="body2"
                sx={{ mb: 3, color: product.stock > 0 ? "green" : "red" }}
              >
                {product.stock > 0
                  ? `In Stock: ${product.stock}`
                  : "Out of Stock"}
              </Typography>
            )}

            {/* Product Information */}
            <Card
              variant="outlined"
              sx={{
                mt: 4,
                p: 2,
                borderRadius: "12px",
                backgroundColor: "#fafafa",
              }}
            >
              <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
                sx={{ mb: 2 }}
              >
                Product Information
              </Typography>

              {[
                { label: "Brand", value: product?.brand },
                { label: "SKU", value: product?.sku },
                { label: "Material", value: product?.material },
                { label: "Weight", value: product?.weight },
                { label: "Dimensions", value: product?.dimensions },
                { label: "Warranty", value: product?.warranty },
              ].map((item, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 1,
                    borderBottom:
                      idx !== 5 ? "1px solid rgba(0,0,0,0.05)" : "none",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: "text.secondary" }}
                  >
                    {item.label}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.primary" }}>
                    {item.value || "—"}
                  </Typography>
                </Box>
              ))}
            </Card>
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default ProductDetailsPage;
