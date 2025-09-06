"use client";
import React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
  Drawer,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";

const categories = ["Ornaments", "Cosmetics"];

// ✅ Validation Schema
const validationSchema = Yup.object({
  name: Yup.string().required("Product name is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  stock: Yup.number()
    .typeError("Stock must be a number")
    .min(0, "Stock cannot be negative")
    .required("Stock is required"),
  images: Yup.array()
    .of(Yup.string().url("Enter a valid image URL"))
    .min(1, "At least one image is required"),
  brand: Yup.string().required("Brand is required"),
  sku: Yup.string().required("SKU is required"),
  material: Yup.string().required("Material is required"),
  weight: Yup.string().required("Weight is required"),
  dimensions: Yup.string().required("Dimensions are required"),
  warranty: Yup.string().required("Warranty is required"),
});

const AddAdminProducts = ({ drawerOpen, setDrawerOpen }: any) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      category: "",
      stock: "",
      images: [""], // ✅ multiple images
      brand: "",
      sku: "",
      material: "",
      weight: "",
      dimensions: "",
      warranty: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await res.json();
        console.log("✅ Product saved:", data);

        resetForm();
        setDrawerOpen(false);
      } catch (err) {
        console.error("❌ Error saving product:", err);
      }
    },
  });

  // ✅ Function to add new image field
  const addImageField = () => {
    formik.setFieldValue("images", [...formik.values.images, ""]);
  };

  // ✅ Function to update a specific image
  const updateImage = (index: number, value: string) => {
    const newImages = [...formik.values.images];
    newImages[index] = value;
    formik.setFieldValue("images", newImages);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      {/* Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 400, p: 3 } }}
      >
        {/* Drawer Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" fontWeight={600}>
            Add New Product
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Form */}
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Product Name"
              name="name"
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              label="Price (₹)"
              name="price"
              type="number"
              fullWidth
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
            <TextField
              label="Description"
              name="description"
              fullWidth
              multiline
              rows={3}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            <TextField
              select
              label="Category"
              name="category"
              fullWidth
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Stock Quantity"
              name="stock"
              type="number"
              fullWidth
              value={formik.values.stock}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.stock && Boolean(formik.errors.stock)}
              helperText={formik.touched.stock && formik.errors.stock}
            />

            {/* ✅ Multiple Images */}
            <Typography variant="subtitle1" fontWeight={500}>
              Product Images
            </Typography>
            {formik.values.images.map((img, index) => (
              <TextField
                key={index}
                label={`Image URL ${index + 1}`}
                fullWidth
                value={img}
                onChange={(e) => updateImage(index, e.target.value)}
                error={
                  formik.touched.images &&
                  Boolean(formik.errors.images?.[index])
                }
                helperText={
                  formik.touched.images &&
                  (formik.errors.images as any)?.[index]
                }
              />
            ))}
            <Button
              variant="outlined"
              onClick={addImageField}
              sx={{ textTransform: "none" }}
            >
              + Add More Images
            </Button>

            {/* ✅ Extra Fields */}
            <TextField
              label="Brand"
              name="brand"
              fullWidth
              value={formik.values.brand}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.brand && Boolean(formik.errors.brand)}
              helperText={formik.touched.brand && formik.errors.brand}
            />
            <TextField
              label="SKU/Product Code"
              name="sku"
              fullWidth
              value={formik.values.sku}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.sku && Boolean(formik.errors.sku)}
              helperText={formik.touched.sku && formik.errors.sku}
            />
            <TextField
              label="Material"
              name="material"
              fullWidth
              value={formik.values.material}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.material && Boolean(formik.errors.material)}
              helperText={formik.touched.material && formik.errors.material}
            />
            <TextField
              label="Weight"
              name="weight"
              fullWidth
              value={formik.values.weight}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.weight && Boolean(formik.errors.weight)}
              helperText={formik.touched.weight && formik.errors.weight}
            />
            <TextField
              label="Dimensions"
              name="dimensions"
              fullWidth
              value={formik.values.dimensions}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.dimensions && Boolean(formik.errors.dimensions)
              }
              helperText={formik.touched.dimensions && formik.errors.dimensions}
            />
            <TextField
              label="Warranty"
              name="warranty"
              fullWidth
              value={formik.values.warranty}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.warranty && Boolean(formik.errors.warranty)}
              helperText={formik.touched.warranty && formik.errors.warranty}
            />

            <Button type="submit" variant="contained" sx={{ mt: 1 }}>
              Save Product
            </Button>
          </Stack>
        </form>
      </Drawer>
    </Container>
  );
};

export default AddAdminProducts;
