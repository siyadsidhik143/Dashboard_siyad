"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import AddAdminProducts from "../EcommerceSeller/AddAdminProducts";
import { useRouter } from "next/navigation";
import EcommerceHeader from "../EcommerceSeller/EcommerceHeader";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

const EcommerceIndex = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addProductDrawerOpen, setAddProductDrawerOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <>
      <EcommerceHeader />
      <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
        {/* Header with Add Product */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#2c2c2c", letterSpacing: 1 }}
          >
            ✨ Ornaments & Cosmetics ✨
          </Typography>

          <Button
            variant="contained"
            onClick={() => setAddProductDrawerOpen(true)}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              background: "linear-gradient(135deg, #0076ca, #7c90ff)",
            }}
          >
            + Add New Product
          </Button>
        </Box>

        {/* Product list */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)", // ✅ 4 items per row
            gap: 3,
          }}
        >
          {products.map((product) => (
            <Card
              key={product.id}
              sx={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                },
              }}
              onClick={() => router.push(`/product/${product.id}`)}
            >
              {/* Image */}
              <Box
                sx={{
                  width: "100%",
                  height: 200,
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f8f8f8",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                }}
              >
                <Box
                  component="img"
                  src={product.image}
                  alt={product.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>

              {/* Content */}
              <CardContent
                sx={{
                  flexGrow: 1,
                  p: 2.5,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 600, color: "#333" }}
                >
                  {product.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    flexGrow: 1,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {product.description}
                </Typography>

                {/* Price */}
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ color: "#d32f2f", mb: 2 }}
                >
                  ₹{product.price.toLocaleString()}
                </Typography>

                {/* Action Buttons */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      borderRadius: "8px",
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    🛒 Add to Cart
                  </Button>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      borderRadius: "8px",
                      textTransform: "none",
                      fontWeight: 600,
                      background: "linear-gradient(135deg, #ff5722, #ff9800)",
                    }}
                  >
                    ⚡ Buy Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <AddAdminProducts
          drawerOpen={addProductDrawerOpen}
          setDrawerOpen={setAddProductDrawerOpen}
        />
      </Container>
    </>
  );
};

export default EcommerceIndex;
