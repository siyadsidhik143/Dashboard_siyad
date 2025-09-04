import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "products.json");

// ✅ Ensure file exists
function ensureFile() {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, "[]", "utf-8");
  }
}

// ✅ GET all products OR GET by ID (using query param)
export async function GET(req: Request) {
  ensureFile();
  const data = fs.readFileSync(filePath, "utf-8");
  const products = JSON.parse(data);

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const product = products.find((p: any) => String(p.id) === id);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(product);
  }

  return NextResponse.json(products);
}

// ✅ POST new product
export async function POST(req: Request) {
  try {
    ensureFile();

    const newProduct = await req.json();

    const data = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(data);

    const productWithId = { id: Date.now(), ...newProduct };
    products.push(productWithId);

    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

    return NextResponse.json({ success: true, product: productWithId });
  } catch (err: any) {
    console.error("API Error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to save product" },
      { status: 500 }
    );
  }
}

// ✅ PUT update product by ID
export async function PUT(req: Request) {
  try {
    ensureFile();

    const { id, ...updates } = await req.json();

    const data = fs.readFileSync(filePath, "utf-8");
    let products = JSON.parse(data);

    const index = products.findIndex((p: any) => String(p.id) === String(id));
    if (index === -1) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    products[index] = { ...products[index], ...updates };
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

    return NextResponse.json({ success: true, product: products[index] });
  } catch (err: any) {
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}

// ✅ DELETE product by ID
export async function DELETE(req: Request) {
  try {
    ensureFile();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Product ID required" },
        { status: 400 }
      );
    }

    const data = fs.readFileSync(filePath, "utf-8");
    let products = JSON.parse(data);

    const filtered = products.filter((p: any) => String(p.id) !== id);

    fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2));

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}
