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

import api from "@/services/api";

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
        text-black
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
          text-black
        ">
          Edit Product
        </h1>

        <p className="
          text-gray-500
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
          bg-white
          text-black
          rounded-3xl
          p-10
          shadow-sm
          space-y-8
        "
      >

        {/* IMAGE */}
        <div>

          <label className="
            block
            mb-4
            font-bold
          ">
            Product Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={
              handleImageChange
            }
          />

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
              border
              rounded-2xl
              px-5
              py-4
              outline-none
              text-black
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
              border
              rounded-2xl
              px-5
              py-4
              outline-none
              text-black
            "
          />

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
                border
                rounded-2xl
                px-5
                py-4
                outline-none
                text-black
              "
            >

              <option value="">
                Select Brand
              </option>

              {brands.map(
                (brand) => (

                  <option

                    key={brand.id}

                    value={brand.id}
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
                border
                rounded-2xl
                px-5
                py-4
                outline-none
                text-black
              "
            >

              <option value="">
                Select Category
              </option>

              {categories.map(
                (category) => (

                  <option

                    key={category.id}

                    value={category.id}
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
                border
                rounded-2xl
                px-5
                py-4
                outline-none
                text-black
              "
            >

              <option value="">
                Select Sub Category
              </option>

              {filteredSubCategories.map(
                (subCategory) => (

                  <option

                    key={subCategory.id}

                    value={subCategory.id}
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

        {/* BUTTON */}
        <button

          type="submit"

          disabled={saving}

          className="
            bg-black
            hover:bg-red-500
            text-white
            px-8
            py-4
            rounded-2xl
            font-bold
            transition-all
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