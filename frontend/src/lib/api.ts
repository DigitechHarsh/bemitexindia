export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://bemitex.harshaicreations.com/backend/api";

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/categories.php`, {
      next: { revalidate: 60 },
    });
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    return [];
  }
}

export async function fetchProducts(category?: string, search?: string) {
  try {
    let url = `${API_BASE_URL}/products.php`;
    const params = new URLSearchParams();
    if (category && category !== "all") params.append("category", category);
    if (search) params.append("search", search);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const res = await fetch(url, {
      next: { revalidate: 60 },
    });
    const json = await res.json();
    return json.success ? json.data : [];
  } catch (err) {
    console.error("Failed to fetch products:", err);
    return [];
  }
}

export async function fetchProductBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/product.php?slug=${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    });
    const json = await res.json();
    return json.success ? json.data : null;
  } catch (err) {
    console.error("Failed to fetch product:", err);
    return null;
  }
}

export async function submitInquiry(data: Record<string, any>) {
  const res = await fetch(`${API_BASE_URL}/inquiry.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function submitVideoCallBooking(data: Record<string, any>) {
  const res = await fetch(`${API_BASE_URL}/video-call.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}
