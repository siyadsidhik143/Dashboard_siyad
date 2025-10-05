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
  IconButton,
  Tooltip,
} from "@mui/material";
import ProductImages from "./ProductImages";
import { IconEdit } from "@tabler/icons-react";

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "70vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Typography variant="h6" align="center" mt={10}>
        Product not found!
      </Typography>
    );
  }

  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        p: { xs: 2, md: 3 },
        mt: 2,
      }}
    >
      {/* Left: Image + Buttons */}
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // ✅ center everything
        }}
      >
        {/* Product Images */}
        <ProductImages
          images={product?.images ?? []}
          selectedImage={selectedImage}
          setSelectedImage={setselectedImage}
        />
      </Box>

      {/* Right: Details */}
      <Box sx={{ flex: 1, pl: { md: 4 }, mt: { xs: 3, md: 0 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            {product?.name}
          </Typography>
          <Tooltip title="Edit" placement="top">
            <IconButton>
              <IconEdit size={22} stroke={1.5} color="#666" />
            </IconButton>
          </Tooltip>
        </Box>

        <Typography
          variant="subtitle1"
          color="text.secondary"
          gutterBottom
          sx={{ mt: 0.5 }}
        >
          {product?.category}
        </Typography>

        {product?.price !== undefined && (
          <Typography
            variant="h6"
            fontWeight="bold"
            color="error"
            sx={{ mb: 1 }}
          >
            ₹{product.price.toLocaleString()}
          </Typography>
        )}

        <Typography
          variant="body2"
          sx={{ mb: 2, lineHeight: 1.6, color: "text.secondary" }}
        >
          {product?.description}
        </Typography>

        {product?.stock !== undefined && (
          <Typography
            variant="body2"
            sx={{ mb: 2, color: product.stock > 0 ? "green" : "red" }}
          >
            {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
          </Typography>
        )}

        {/* Product Information */}
        <Card
          variant="outlined"
          sx={{
            mt: 3,
            p: 2,
            borderRadius: "12px",
            backgroundColor: "#fafafa",
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={600}
            gutterBottom
            sx={{ mb: 1 }}
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
          ].map((item, idx, arr) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: { xs: "column", sm: "row" }, // ✅ stack on mobile
                py: 1,
                borderBottom:
                  idx !== arr.length - 1
                    ? "1px solid rgba(0,0,0,0.05)"
                    : "none",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: "text.secondary" }}
              >
                {item.label}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.primary", mt: { xs: 0.5, sm: 0 } }}
              >
                {item.value || "—"}
              </Typography>
            </Box>
          ))}
        </Card>
      </Box>
    </Card>
  );
};

export default ProductDetailsPage;
