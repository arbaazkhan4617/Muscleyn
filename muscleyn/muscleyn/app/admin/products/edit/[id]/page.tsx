"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import toast from "react-hot-toast";
import { Plus, Trash2, Upload } from "lucide-react";

import api from "@/services/api";
import { products } from "@/lib/commerce";

export default function EditProductPage() {

  const router =
    useRouter();

  const params =
    useParams();

  const productId =
    params.id;

  // FORM
  const [name,
    setName] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [brandId,
    setBrandId] =
    useState("");

  const [categoryId,
    setCategoryId] =
    useState("");

  const [subCategoryId,
    setSubCategoryId] =
    useState("");

  const [active,
    setActive] =
    useState(true);

  // IMAGE
  const [image,
    setImage] =
    useState<File | null>(
      null
    );

  const [preview,
    setPreview] =
    useState("");

  // PRICE & STOCK
  const [variantId, setVariantId] = useState<number | null>(null);
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [stock, setStock] = useState("");

  // GALLERY IMAGES
  const [existingImages, setExistingImages] = useState<any[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);

  // NUTRITION FACTS
  const [servingSize, setServingSize] = useState("");
  const [keyIngredients, setKeyIngredients] = useState("");
  const [nutritionCards, setNutritionCards] = useState<{ label: string; value: string }[]>([]);

  // BENEFITS
  const [benefitsList, setBenefitsList] = useState<string[]>([]);

  // DATA
  const [brands,
    setBrands] =
    useState<any[]>([]);

  const [categories,
    setCategories] =
    useState<any[]>([]);

  const [allSubCategories,
    setAllSubCategories] =
    useState<any[]>([]);

  const [loading,
    setLoading] =
    useState(true);

  const [saving,
    setSaving] =
    useState(false);

  // LOAD DATA
  useEffect(() => {

    const loadData =
      async () => {

        try {

          const [

            productRes,

            brandRes,

            categoryRes,

            subCategoryRes,

          ] = await Promise.all([

            api.get(
              `/products/${productId}`
            ),

            api.get(
              "/brands"
            ),

            api.get(
              "/categories"
            ),

            api.get(
              "/sub-categories"
            ),
          ]);

          const product =
            productRes.data.data;

          // PRODUCT
          setName(
            product.name || ""
          );

          setDescription(
            product.description || ""
          );

          setBrandId(

            String(
              product.brandId || ""
            )
          );

          const category =
            product.categoryId;

          setCategoryId(

            String(
              category || ""
            )
          );

          setSubCategoryId(

            String(
              product.subCategoryId
                 || ""
            )
          );

          setActive(
            product?.isActive
          );

          setPreview(
            product.imageUrl || ""
          );

          // PRIMARY VARIANT
          const primaryVariant = product.variants?.[0];
          if (primaryVariant) {
            setVariantId(primaryVariant.id);
            setPrice(String(primaryVariant.price || ""));
            setOldPrice(String(primaryVariant.oldPrice || ""));
            setStock(String(primaryVariant.stock || "0"));
          } else {
            setVariantId(null);
            setPrice("");
            setOldPrice("");
            setStock("0");
          }

          // GALLERY IMAGES
          setExistingImages(product.productImages || []);

          // NUTRITION FACTS
          if (product.nutrition) {
            try {
              const parsed = JSON.parse(product.nutrition);
              setServingSize(parsed.servingSize || "");
              setKeyIngredients(parsed.ingredients || "");
              setNutritionCards(parsed.facts || []);
            } catch (e) {
              console.error("Failed to parse nutrition JSON", e);
            }
          } else {
            const staticProduct = products.find(p => p.name.toLowerCase() === product.name?.toLowerCase());
            if (staticProduct && staticProduct.nutrition) {
              setServingSize(staticProduct.nutrition.servingSize || "");
              setKeyIngredients(staticProduct.nutrition.keyIngredients?.join(", ") || "");
              setNutritionCards([
                { label: "protein", value: staticProduct.nutrition.protein },
                { label: "carbs", value: staticProduct.nutrition.carbs },
                { label: "calories", value: staticProduct.nutrition.calories }
              ]);
            }
          }

          // BENEFITS
          if (product.benefits) {
            try {
              setBenefitsList(JSON.parse(product.benefits) || []);
            } catch (e) {
              console.error("Failed to parse benefits JSON", e);
            }
          } else {
            const staticProduct = products.find(p => p.name.toLowerCase() === product.name?.toLowerCase());
            if (staticProduct) {
              setBenefitsList([
                "Accelerates muscle protein synthesis",
                "Reduces muscle soreness and fatigue",
                "Mixes instantly with no clumps",
                "Zero artificial colors or dyes",
                "Enhanced with digestive enzymes",
                "Incredible, award-winning taste"
              ]);
            }
          }

          // MASTER DATA
          setBrands(
            brandRes.data.data || []
          );

          setCategories(
            categoryRes.data.data || []
          );

          setAllSubCategories(
            subCategoryRes.data.data || []
          );

        } catch (error) {

          console.log(error);

          toast.error(
            "Failed to load product"
          );

        } finally {

          setLoading(false);
        }
      };

    if (productId) {

      loadData();
    }

  }, [productId]);

  // FILTERED SUB CATEGORY
  const filteredSubCategories =
    useMemo(() => {

      if (!categoryId) {

        return [];
      }

      return allSubCategories.filter(
        (item) =>

          String(
            item.category?.id
          ) === categoryId
      );

    }, [

      categoryId,

      allSubCategories
    ]);

  // IMAGE CHANGE
  const handleImageChange =
    (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {

      const file =
        e.target.files?.[0];

      if (!file) {

        return;
      }

      setImage(file);

      setPreview(

        URL.createObjectURL(
          file
        )
      );
    };

  // CATEGORY CHANGE
  const handleCategoryChange =
    (
      value: string
    ) => {

      setCategoryId(
        value
      );

      setSubCategoryId("");
    };

  // MULTIPLE IMAGES
  const handleMultipleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewImages(files);
    const previewUrls = files.map(file => URL.createObjectURL(file));
    setNewPreviews(previewUrls);
  };

  const handleDeleteExistingImage = async (imageId: number) => {
    if (!confirm("Are you sure you want to delete this gallery image?")) return;
    try {
      await api.delete(`/products/images/${imageId}`);
      setExistingImages(prev => prev.filter(img => img.id !== imageId));
      toast.success("Gallery image deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete gallery image");
    }
  };

  // NUTRITION HELPERS
  const handleAddNutritionCard = () => {
    setNutritionCards(prev => [...prev, { label: "", value: "" }]);
  };

  const handleUpdateNutritionCard = (index: number, field: "label" | "value", val: string) => {
    setNutritionCards(prev => prev.map((card, i) => {
      if (i === index) {
        return { ...card, [field]: val };
      }
      return card;
    }));
  };

  const handleDeleteNutritionCard = (index: number) => {
    setNutritionCards(prev => prev.filter((_, i) => i !== index));
  };

  // BENEFITS HELPERS
  const handleAddBenefit = () => {
    setBenefitsList(prev => [...prev, ""]);
  };

  const handleUpdateBenefit = (index: number, val: string) => {
    setBenefitsList(prev => prev.map((item, i) => i === index ? val : item));
  };

  const handleDeleteBenefit = (index: number) => {
    setBenefitsList(prev => prev.filter((_, i) => i !== index));
  };

  // UPDATE PRODUCT
  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      if (

        !name ||

        !brandId ||

        !subCategoryId

      ) {

        toast.error(
          "Please fill required fields"
        );

        return;
      }

      try {

        setSaving(true);

        const formData =
          new FormData();

        formData.append(
          "name",
          name
        );

        formData.append(
          "description",
          description
        );

        formData.append(
          "brandId",
          brandId
        );

        formData.append(
          "subCategoryId",
          subCategoryId
        );

        formData.append(
          "active",
          String(active)
        );

        if (image) {

          formData.append(
            "image",
            image
          );
        }

        // Add gallery images
        if (newImages && newImages.length > 0) {
          newImages.forEach(file => {
            formData.append("images", file);
          });
        }

        // Add nutrition facts
        const nutritionObj = {
          servingSize,
          ingredients: keyIngredients,
          facts: nutritionCards.filter(c => c.label.trim() && c.value.trim())
        };
        formData.append("nutrition", JSON.stringify(nutritionObj));

        // Add benefits
        formData.append("benefits", JSON.stringify(benefitsList.filter(b => b.trim())));

        await api.put(

          `/products/update/${productId}`,

          formData,

          {

            headers: {

              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        // Update or Create default variant with Price details
        const variantData = new FormData();
        variantData.append("variantName", "Default");
        variantData.append("price", price || "0");
        if (oldPrice) {
          variantData.append("oldPrice", oldPrice);
        }
        variantData.append("stock", String(stock || "0"));
        variantData.append("active", "true");
        variantData.append("productId", String(productId));

        if (variantId) {
          await api.put(`/product-variants/${variantId}`, variantData, {
            headers: { "Content-Type": "multipart/form-data" }
          });
        } else {
          await api.post(`/product-variants`, variantData, {
            headers: { "Content-Type": "multipart/form-data" }
          });
        }

        toast.success(
          "Product updated successfully"
        );

        router.push(
          "/admin/products"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to update product"
        );

      } finally {

        setSaving(false);
      }
    };

  // LOADING
  if (loading) {

    return (

      <div className="
        min-h-screen
        flex
        items-center
        justify-center
        text-2xl
        font-bold
        text-white
      ">

        Loading product...

      </div>
    );
  }

  return (
    <div>

      {/* TOP */}
      <div className="
        mb-10
      ">

        <h1 className="
          text-4xl
          font-extrabold
          text-white
        ">
          Edit Product
        </h1>

        <p className="
          text-zinc-400
          mt-2
        ">
          Update existing product
        </p>

      </div>

      {/* FORM */}
      <form

        onSubmit={
          handleSubmit
        }

        className="
          bg-zinc-900/50
          backdrop-blur-md
          text-white
          border
          border-white/10
          rounded-3xl
          p-10
          shadow-xl
          space-y-8
        "
      >

        {/* IMAGE */}
        <div>

          <label className="
            block
            mb-4
            font-bold
            text-white
          ">
            Product Image
          </label>

          <label className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/5 border border-white/10 hover:bg-white hover:text-zinc-950 text-white rounded-xl font-bold cursor-pointer transition-all shadow-md group">
            <Upload className="w-5 h-5 text-zinc-400 group-hover:text-zinc-950 transition-colors" />
            <span>Choose Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={
                handleImageChange
              }
              className="hidden"
            />
          </label>

          {preview && (

            <img

              src={preview}

              alt="Preview"

              className="
                mt-5
                w-40
                h-40
                rounded-3xl
                object-cover
              "
            />

          )}

        </div>

        {/* GALLERY IMAGES */}
        <div className="border-t border-white/10 pt-8">
          <label className="block mb-4 font-bold text-lg">Product Gallery Images</label>
          
          {/* Existing Gallery Images */}
          {existingImages.length > 0 && (
            <div className="mb-6">
              <span className="text-sm font-semibold text-zinc-400 block mb-3">Existing Gallery Images (Click trash icon to delete)</span>
              <div className="flex flex-wrap gap-4">
                {existingImages.map((img) => (
                  <div key={img.id} className="relative group w-32 h-32 rounded-2xl overflow-hidden border border-white/10">
                    <img src={img.imageUrl} alt="Gallery" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleDeleteExistingImage(img.id)}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-200"
                    >
                      <Trash2 className="w-6 h-6 hover:text-red-500 transition-colors" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload New Gallery Images */}
          <div>
            <span className="text-sm font-semibold text-zinc-400 block mb-3">Upload New Gallery Images</span>
            <label className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/5 border border-white/10 hover:bg-white hover:text-zinc-950 text-white rounded-xl font-bold cursor-pointer transition-all shadow-md group">
              <Upload className="w-5 h-5 text-zinc-400 group-hover:text-zinc-950 transition-colors" />
              <span>Choose Files</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleMultipleImages}
                className="hidden"
              />
            </label>
            {newPreviews.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-5">
                {newPreviews.map((preview, idx) => (
                  <img key={idx} src={preview} alt="New Preview" className="w-32 h-32 rounded-2xl object-cover border border-gray-200" />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* NAME */}
        <div>

          <label className="
            block
            mb-3
            font-bold
          ">
            Product Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="
              w-full
              bg-black
              border
              border-white/10
              focus:border-red-500
              rounded-2xl
              px-5
              py-4
              outline-none
              text-white
              transition-colors
            "
          />

        </div>

        {/* DESCRIPTION */}
        <div>

          <label className="
            block
            mb-3
            font-bold
          ">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            rows={6}
            className="
              w-full
              bg-black
              border
              border-white/10
              focus:border-red-500
              rounded-2xl
              px-5
              py-4
              outline-none
              text-white
              transition-colors
            "
          />

        </div>

        {/* PRICING & STOCK */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/10 pt-8">
          <div>
            <label className="block mb-3 font-bold">Price (₹)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 2499"
              className="w-full bg-black border border-white/10 focus:border-red-500 rounded-2xl px-5 py-4 outline-none text-white transition-colors"
              required
            />
          </div>

          <div>
            <label className="block mb-3 font-bold">Old Price (₹)</label>
            <input
              type="number"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
              placeholder="e.g. 3499"
              className="w-full bg-black border border-white/10 focus:border-red-500 rounded-2xl px-5 py-4 outline-none text-white transition-colors"
            />
          </div>

          <div>
            <label className="block mb-3 font-bold">Stock Quantity</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="e.g. 15"
              className="w-full bg-black border border-white/10 focus:border-red-500 rounded-2xl px-5 py-4 outline-none text-white transition-colors"
              required
            />
          </div>
        </div>

        {/* DROPDOWNS */}
        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        ">

          {/* BRAND */}
          <div>

            <label className="
              block
              mb-3
              font-bold
            ">
              Brand
            </label>

            <select

              value={brandId}

              onChange={(e) =>
                setBrandId(
                  e.target.value
                )
              }

              className="
                w-full
                bg-black
                border
                border-white/10
                focus:border-red-500
                rounded-2xl
                px-5
                py-4
                outline-none
                text-white
                transition-colors
              "
            >

              <option value="" className="bg-zinc-900 text-white">
                Select Brand
              </option>

              {brands.map(
                (brand) => (

                  <option

                    key={brand.id}

                    value={brand.id}
                    className="bg-zinc-900 text-white"
                  >

                    {brand.name}

                  </option>
                )
              )}

            </select>

          </div>

          {/* CATEGORY */}
          <div>

            <label className="
              block
              mb-3
              font-bold
            ">
              Category
            </label>

            <select

              value={categoryId}

              onChange={(e) =>
                handleCategoryChange(
                  e.target.value
                )
              }

              className="
                w-full
                bg-black
                border
                border-white/10
                focus:border-red-500
                rounded-2xl
                px-5
                py-4
                outline-none
                text-white
                transition-colors
              "
            >

              <option value="" className="bg-zinc-900 text-white">
                Select Category
              </option>

              {categories.map(
                (category) => (

                  <option

                    key={category.id}

                    value={category.id}
                    className="bg-zinc-900 text-white"
                  >

                    {category.name}

                  </option>
                )
              )}

            </select>

          </div>

          {/* SUB CATEGORY */}
          <div>

            <label className="
              block
              mb-3
              font-bold
            ">
              Sub Category
            </label>

            <select

              value={subCategoryId}

              onChange={(e) =>
                setSubCategoryId(
                  e.target.value
                )
              }

              disabled={!categoryId}

              className="
                w-full
                bg-black
                border
                border-white/10
                focus:border-red-500
                rounded-2xl
                px-5
                py-4
                outline-none
                text-white
                transition-colors
              "
            >

              <option value="" className="bg-zinc-900 text-white">
                Select Sub Category
              </option>

              {filteredSubCategories.map(
                (subCategory) => (

                  <option

                    key={subCategory.id}

                    value={subCategory.id}
                    className="bg-zinc-900 text-white"
                  >

                    {subCategory.name}

                  </option>
                )
              )}

            </select>

          </div>

        </div>

        {/* ACTIVE */}
        <div className="
          flex
          items-center
          gap-4
        ">

          <input
            type="checkbox"
            checked={active}
            onChange={(e) =>
              setActive(
                e.target.checked
              )
            }
            className="
              w-5
              h-5
            "
          />

          <label className="
            font-semibold
          ">
            Active Product
          </label>

        </div>

        {/* NUTRITION FACTS EDITOR */}
        <div className="border-t border-white/10 pt-8 space-y-6">
          <h3 className="text-xl font-bold text-white">Supplement & Nutrition Facts</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-3 font-bold text-zinc-300">Serving Size</label>
              <input
                type="text"
                value={servingSize}
                onChange={(e) => setServingSize(e.target.value)}
                placeholder="e.g. 1 Scoop (32g)"
                className="w-full bg-black border border-white/10 focus:border-red-500 rounded-2xl px-5 py-4 outline-none text-white transition-colors"
              />
            </div>
            
            <div>
              <label className="block mb-3 font-bold text-zinc-300">Key Ingredients</label>
              <input
                type="text"
                value={keyIngredients}
                onChange={(e) => setKeyIngredients(e.target.value)}
                placeholder="e.g. Micellar casein, Magnesium, Cocoa"
                className="w-full bg-black border border-white/10 focus:border-red-500 rounded-2xl px-5 py-4 outline-none text-white transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="font-bold text-sm text-zinc-400">Nutrition Cards / Highlights (e.g. 25g protein, 4g carbs)</label>
              <button
                type="button"
                onClick={handleAddNutritionCard}
                className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white hover:text-black text-white px-4 py-2 rounded-full font-bold text-xs transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Card
              </button>
            </div>

            <div className="space-y-3">
              {nutritionCards.map((card, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <input
                    type="text"
                    value={card.label}
                    onChange={(e) => handleUpdateNutritionCard(idx, "label", e.target.value)}
                    placeholder="Label (e.g. protein)"
                    className="flex-1 bg-black border border-white/10 focus:border-red-500 rounded-2xl px-5 py-3 outline-none text-white text-sm transition-colors"
                  />
                  <input
                    type="text"
                    value={card.value}
                    onChange={(e) => handleUpdateNutritionCard(idx, "value", e.target.value)}
                    placeholder="Value (e.g. 25g)"
                    className="flex-1 bg-black border border-white/10 focus:border-red-500 rounded-2xl px-5 py-3 outline-none text-white text-sm transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteNutritionCard(idx)}
                    className="p-3 text-red-500 hover:bg-red-500/10 rounded-full transition-colors animate-fade-in cursor-pointer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BENEFITS EDITOR */}
        <div className="border-t border-white/10 pt-8 space-y-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold text-white">Product Benefits</h3>
            <button
              type="button"
              onClick={handleAddBenefit}
              className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white hover:text-black text-white px-4 py-2 rounded-full font-bold text-xs transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Benefit
            </button>
          </div>

          <div className="space-y-3">
            {benefitsList.map((benefit, idx) => (
              <div key={idx} className="flex gap-4 items-center">
                <input
                  type="text"
                  value={benefit}
                  onChange={(e) => handleUpdateBenefit(idx, e.target.value)}
                  placeholder="Benefit description..."
                  className="flex-1 bg-black border border-white/10 focus:border-red-500 rounded-2xl px-5 py-3 outline-none text-white text-sm transition-colors"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteBenefit(idx)}
                  className="p-3 text-red-500 hover:bg-red-500/10 rounded-full transition-colors animate-fade-in cursor-pointer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* BUTTON */}
        <button

          type="submit"

          disabled={saving}

          className="
            bg-red-600
            hover:bg-white
            hover:text-zinc-950
            text-white
            px-8
            py-4
            rounded-2xl
            font-bold
            transition-all
            disabled:opacity-50
            shadow-lg
            shadow-red-950/20
            cursor-pointer
          "
        >

          {
            saving

              ? "Updating..."

              : "Update Product"
          }

        </button>

      </form>

    </div>
  );
}