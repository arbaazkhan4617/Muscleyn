"use client";

import {

  useEffect,

  useState,

} from "react";

import {

  useParams,

} from "next/navigation";

import toast from "react-hot-toast";

import api from "@/services/api";

import {

  Plus,

  Package,

} from "lucide-react";

import { getBackendImageUrl } from "@/lib/commerce";


export default function ProductVariantsPage() {

  const params =
    useParams();

  const productId =
    params.productId;

  // FORM
  const [variantName,
    setVariantName] =
    useState("");

  const [sku,
    setSku] =
    useState("");

  const [price,
    setPrice] =
    useState("");

  const [oldPrice,
    setOldPrice] =
    useState("");

  const [discountPercent,
    setDiscountPercent] =
    useState("");

  const [stock,
    setStock] =
    useState("");

  const [size,
    setSize] =
    useState("");

  const [color,
    setColor] =
    useState("");

  const [weight,
    setWeight] =
    useState("");

  const [flavor,
    setFlavor] =
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
  const [variants,
    setVariants] =
    useState<any[]>([]);

  const [loading,
    setLoading] =
    useState(true);

  const [saving,
    setSaving] =
    useState(false);

    const [editingId,
  setEditingId] =
  useState<number | null>(
    null
  );

  // LOAD VARIANTS
  useEffect(() => {

    const loadVariants =
      async () => {

        try {

          const response =

            await api.get(

              `/product-variants/product/${productId}`
            );

          setVariants(
            response.data.data || []
          );

        } catch (error) {

          console.log(error);

          toast.error(
            "Failed to load variants"
          );

        } finally {

          setLoading(false);
        }
      };

    if (productId) {

      loadVariants();
    }

  }, [productId]);

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

const handleEdit =
  (
    variant: any
  ) => {

    setEditingId(
      variant.id
    );

    setVariantName(
      variant.variantName || ""
    );

    setSku(
      variant.sku || ""
    );

    setPrice(
      String(
        variant.price || ""
      )
    );

    setOldPrice(
      String(
        variant.oldPrice || ""
      )
    );

    setDiscountPercent(
      String(
        variant.discountPercent || ""
      )
    );

    setStock(
      String(
        variant.stock || ""
      )
    );

    setSize(
      variant.size || ""
    );

    setColor(
      variant.color || ""
    );

    setWeight(
      variant.weight || ""
    );

    setFlavor(
      variant.flavor || ""
    );

    setActive(
      variant.isActive
    );

    setPreview(
      getBackendImageUrl(variant.imageUrl)
    );
  };

    const handleDelete =
  async (
    variantId: number
  ) => {

    const confirmDelete =
      confirm(
        "Are you sure you want to delete this variant?"
      );

    if (!confirmDelete) {

      return;
    }

    try {

      await api.delete(

        `/product-variants/${variantId}`
      );

      toast.success(
        "Variant deleted successfully"
      );

      // RELOAD
      const response =

        await api.get(

          `/product-variants/product/${productId}`
        );

      setVariants(
        response.data.data || []
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to delete variant"
      );
    }
  };

    const handleToggleStatus =
  async (
    variantId: number
  ) => {

    try {

      await api.patch(

        `/product-variants/toggle-status/${variantId}`
      );

      toast.success(
        "Variant status updated"
      );

      // RELOAD
      const response =

        await api.get(

          `/product-variants/product/${productId}`
        );

      setVariants(
        response.data.data || []
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to update status"
      );
    }
  };

  // CREATE VARIANT
  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      if (
        !variantName ||
        !price
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
          "variantName",
          variantName
        );

        formData.append(
          "sku",
          sku
        );

        formData.append(
          "price",
          price
        );

        formData.append(
          "oldPrice",
          oldPrice
        );

        formData.append(
          "discountPercent",
          discountPercent
        );

        formData.append(
          "stock",
          stock
        );

        formData.append(
          "size",
          size
        );

        formData.append(
          "color",
          color
        );

        formData.append(
          "weight",
          weight
        );

        formData.append(
          "flavor",
          flavor
        );

        formData.append(
          "active",
          String(active)
        );

        formData.append(
          "productId",
          String(productId)
        );

        if (image) {

          formData.append(
            "image",
            image
          );
        }

        if (editingId) {

  await api.put(

    `/product-variants/${editingId}`,

    formData,

    {

      headers: {

        "Content-Type":
          "multipart/form-data",
      },
    }
  );

} else {

  await api.post(

    "/product-variants",

    formData,

    {

      headers: {

        "Content-Type":
          "multipart/form-data",
      },
    }
  );
}

       toast.success(

  editingId

    ? "Variant updated successfully"

    : "Variant added successfully"
);

        // RESET
        setVariantName("");
        setSku("");
        setPrice("");
        setOldPrice("");
        setDiscountPercent("");
        setStock("");
        setSize("");
        setColor("");
        setWeight("");
        setFlavor("");
        setActive(true);
        setImage(null);
        setPreview("");
        setEditingId(null);

        // RELOAD
        const response =

          await api.get(

            `/product-variants/product/${productId}`
          );

        setVariants(
          response.data.data || []
        );

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to add variant"
        );

      } finally {

        setSaving(false);
      }
    };

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

        Loading variants...

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
          Product Variants
        </h1>

        <p className="
          text-gray-500
          mt-2
        ">
          Manage product variants
        </p>

      </div>

      {/* FORM */}
      <form

        onSubmit={
          handleSubmit
        }

        className="
          bg-white
          text-white
          rounded-3xl
          p-10
          shadow-sm
          space-y-8
          mb-10
        "
      >

        {/* IMAGE */}
        <div>

          <label className="
            block
            mb-4
            font-bold
          ">
            Variant Image
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

        {/* GRID */}
        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-6
        ">

          <input
            type="text"
            placeholder="Variant Name"
            value={variantName}
            onChange={(e) =>
              setVariantName(
                e.target.value
              )
            }
            className="
              border
              rounded-2xl
              px-5
              py-4
              text-white
            "
          />

          <input
            type="text"
            placeholder="SKU"
            value={sku}
            onChange={(e) =>
              setSku(
                e.target.value
              )
            }
            className="
              border
              rounded-2xl
              px-5
              py-4
              text-white
            "
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }
            className="
              border
              rounded-2xl
              px-5
              py-4
              text-white
            "
          />

          <input
            type="number"
            placeholder="Old Price"
            value={oldPrice}
            onChange={(e) =>
              setOldPrice(
                e.target.value
              )
            }
            className="
              border
              rounded-2xl
              px-5
              py-4
              text-white
            "
          />

          <input
            type="number"
            placeholder="Discount %"
            value={discountPercent}
            onChange={(e) =>
              setDiscountPercent(
                e.target.value
              )
            }
            className="
              border
              rounded-2xl
              px-5
              py-4
              text-white
            "
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) =>
              setStock(
                e.target.value
              )
            }
            className="
              border
              rounded-2xl
              px-5
              py-4
              text-white
            "
          />

          <input
            type="text"
            placeholder="Size"
            value={size}
            onChange={(e) =>
              setSize(
                e.target.value
              )
            }
            className="
              border
              rounded-2xl
              px-5
              py-4
              text-white
            "
          />

          <input
            type="text"
            placeholder="Color"
            value={color}
            onChange={(e) =>
              setColor(
                e.target.value
              )
            }
            className="
              border
              rounded-2xl
              px-5
              py-4
              text-white
            "
          />

          <input
            type="text"
            placeholder="Weight"
            value={weight}
            onChange={(e) =>
              setWeight(
                e.target.value
              )
            }
            className="
              border
              rounded-2xl
              px-5
              py-4
              text-white
            "
          />

          <input
            type="text"
            placeholder="Flavor"
            value={flavor}
            onChange={(e) =>
              setFlavor(
                e.target.value
              )
            }
            className="
              border
              rounded-2xl
              px-5
              py-4
              text-white
            "
          />

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
          />

          <label>
            Active Variant
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
            flex
            items-center
            gap-3
          "
        >

          <Plus
            className="
              w-5
              h-5
            "
          />

          {

            saving

              ? "Saving..."

              : editingId

  ? "Update Variant"

  : "Add Variant"
          }

        </button>

      </form>

      {/* VARIANTS */}
      {variants.length === 0 && (

        <div className="
          bg-white
          rounded-3xl
          p-16
          text-center
        ">

          <Package
            className="
              w-20
              h-20
              mx-auto
              mb-6
              text-gray-300
            "
          />

          <h2 className="
            text-3xl
            font-bold
            mb-3
            text-white
          ">
            No Variants Found
          </h2>

        </div>
      )}

      {/* TABLE */}
      {variants.length > 0 && (

        <div className="
          bg-white
          rounded-3xl
          overflow-hidden
          shadow-sm
        ">

          <div className="
            overflow-x-auto
          ">

            <table className="
              w-full
            ">

              <thead className="
                bg-black
                text-white
              ">

                <tr>

                  <th className="p-5 text-left">
                    Variant
                  </th>

                  <th className="p-5 text-left">
                    Price
                  </th>

                  <th className="p-5 text-left">
                    Stock
                  </th>

                  <th className="p-5 text-left">
                    Weight
                  </th>

                  <th className="p-5 text-left">
                    Flavor
                  </th>

                  <th className="
                    p-5
                    text-left
                    ">
                    Status
                    </th>

                    <th className="
                    p-5
                    text-left
                    ">
                    Actions
                    </th>


                </tr>

              </thead>

              <tbody>

                {variants.map(
                  (variant) => (

                    <tr
                      key={variant.id}
                      className="
                        border-b
                      "
                    >

                      <td className="
                        p-5
                        text-zinc-300
                      ">

                        {
                          variant.variantName
                        }

                      </td>

                      <td className="
                        p-5
                        text-zinc-300
                      ">

                        ₹
                        {variant.price}

                      </td>

                      <td className="
                        p-5
                        text-zinc-300
                      ">

                        {variant.stock}

                      </td>

                      <td className="
                        p-5
                        text-zinc-300
                      ">

                        {variant.weight}

                      </td>

                      <td className="
                        p-5
                        text-zinc-300
                      ">

                        {variant.flavor}

                      </td>

                        {/* STATUS */}
<td className="
  p-5
">

  <button

    onClick={() =>
      handleToggleStatus(
        variant.id
      )
    }

    className={`
      px-4
      py-2
      rounded-xl
      text-sm
      font-semibold
      text-white

      ${
        variant.isActive

          ? "bg-green-600"

          : "bg-red-500"
      }
    `}
  >

    {
      variant.isActive

        ? "ACTIVE"

        : "INACTIVE"
    }

  </button>

</td>

{/* ACTIONS */}
<td className="
  p-5
">

  <div className="
    flex
    items-center
    gap-3
  ">

    {/* EDIT */}
    <button

      onClick={() =>
        handleEdit(
          variant
        )
      }

      className="
        bg-blue-600
        hover:bg-blue-700
        text-white
        px-4
        py-2
        rounded-xl
        text-sm
        font-semibold
      "
    >

      Edit

    </button>

    {/* DELETE */}
    <button

      onClick={() =>
        handleDelete(
          variant.id
        )
      }

      className="
        bg-red-500
        hover:bg-red-600
        text-white
        px-4
        py-2
        rounded-xl
        text-sm
        font-semibold
      "
    >

      Delete

    </button>

  </div>

</td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>

        </div>
      )}

    </div>
  );
}