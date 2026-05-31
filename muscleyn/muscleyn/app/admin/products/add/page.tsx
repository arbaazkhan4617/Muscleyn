"use client";

import {

  useEffect,

  useMemo,

  useState,

} from "react";

import {

  useRouter,

} from "next/navigation";

import toast from "react-hot-toast";
import { Upload } from "lucide-react";

import api from "@/services/api";

export default function AddProductPage() {

  const router =
    useRouter();

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

    const [images,
setImages] =
useState<File[]>([]);

const [previews,
setPreviews] =
useState<string[]>([]);

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
    useState(false);

  // LOAD DATA
  useEffect(() => {

    const loadData =
      async () => {

        try {

          const [

            brandRes,

            categoryRes,

            subCategoryRes,

          ] = await Promise.all([

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
            "Failed to load data"
          );
        }
      };

    loadData();

  }, []);

  // FILTERED SUB CATEGORIES
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

      allSubCategories,

      categoryId
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

    const handleMultipleImages =
(
  e: React.ChangeEvent<HTMLInputElement>
) => {

  const files =
    Array.from(
      e.target.files || []
    );

  setImages(files);

  const previewUrls =
    files.map(
      (file) =>
        URL.createObjectURL(file)
    );

  setPreviews(previewUrls);
};

  // CATEGORY CHANGE
  const handleCategoryChange =
    (
      value: string
    ) => {

      setCategoryId(
        value
      );

      // RESET SUB CATEGORY
      setSubCategoryId("");
    };

  // SUBMIT
  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      if (

        !name ||

        !brandId ||

        !categoryId ||

        !subCategoryId

      ) {

        toast.error(
          "Please fill required fields"
        );

        return;
      }

      try {

        setLoading(true);

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
        
      if (images) {
        images.forEach(
  (file) => {
    formData.append(
      "images",
      file
    );
  }
    );
  }

        await api.post(

          "/products",

          formData,

          {

            headers: {

              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        toast.success(
          "Product added successfully"
        );

        router.push(
          "/admin/products"
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to add product"
        );

      } finally {

        setLoading(false);
      }
    };

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
          Add Product
        </h1>

        <p className="
          text-zinc-400
          mt-2
        ">
          Create new product
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
        {/* <div>

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

        </div> */}


<div>

  <label className="
    block
    mb-4
    font-bold
  ">
    Product Gallery Images
  </label>

  <label className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/5 border border-white/10 hover:bg-white hover:text-zinc-950 text-white rounded-xl font-bold cursor-pointer transition-all shadow-md group">
    <Upload className="w-5 h-5 text-zinc-400 group-hover:text-zinc-950 transition-colors" />
    <span>Choose Files</span>
    <input
      type="file"
      multiple
      accept="image/*"
      onChange={
        handleMultipleImages
      }
      className="hidden"
    />
  </label>

  <div className="
    flex
    flex-wrap
    gap-4
    mt-5
  ">

    {previews.map(
      (
        preview,
        index
      ) => (

        <img
          key={index}
          src={preview}
          alt="preview"
          className="
            w-32
            h-32
            rounded-2xl
            object-cover
          "
        />
      )
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
            placeholder="
              Enter product name
            "
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

        {/* BUTTON */}
        <button

          type="submit"

          disabled={loading}

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
            loading

              ? "Saving..."

              : "Add Product"
          }

        </button>

      </form>

    </div>
  );
}