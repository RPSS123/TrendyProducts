import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios";

const productSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    description: z.string().min(1, "Description is required"),
    price: z.coerce.number().positive("Price must be > 0"),
    currency: z.string().min(1, "Currency is required"),
    imageUrl: z.string().min(1, "Image is required"),
    categoryId: z.coerce.number().int().positive("Category required"),
    stock: z.coerce.number().int().nonnegative("Stock must be ≥ 0"),
});

function AddProducts() {

    const {
        reset,
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            title: "",
            slug: "",
            description: "",
            price: "",
            currency: "INR",
            imageUrl: "",
            categoryId: "",
            stock: "",
        },
    });

    const api = axios.create({
        baseURL: process.env.REACT_APP_API_URL || 'https://localhost:7057/api',
        timeout: 10000
    });

    const add = async (values) => {
        const payload = {
            ...values,
            price: Number(values.price),
            categoryId: Number(values.categoryId),
            stock: Number(values.stock),
        };
        try {
            const res = await api.post("/Products", payload);
            console.log("Created:", res.data);
            reset();
        } catch (err) {
            console.error("Create failed:", err.response?.data || err.message);
        }
    };

    return (
        <div className="col-sm-6 offset-sm-3" style={{ textAlign: "center" }}>
            <h1>Add Product</h1>
            <br />
            <form onSubmit={handleSubmit(add)}>
                <input type="text" className="form-control" {...register("title")} placeholder="Product Title" />
                {errors.title && <small className="text-danger">{errors.title.message}</small>}<br />
                <input type="text" className="form-control" {...register("slug")} placeholder="Slug" />
                {errors.slug && <small className="text-danger">{errors.slug.message}</small>}<br />
                <input type="text" className="form-control" {...register("description")} placeholder="Description" />
                {errors.description && <small className="text-danger">{errors.description.message}</small>}<br />
                <input type="number" className="form-control" {...register("price")} placeholder="Price" />
                {errors.price && <small className="text-danger">{errors.price.message}</small>}<br />
                <input type="text" className="form-control" {...register("currency")} placeholder="Currency" />
                {errors.currency && <small className="text-danger">{errors.currency.message}</small>}<br />
                <input type="file" className="form-control" accept="image/*" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) {
                        setValue("imageUrl", "", { shouldValidate: true });
                        return;
                    }

                    // sirf relative path store karo
                    const relativePath = `/Images/products/${file.name}`;
                    setValue("imageUrl", relativePath, { shouldValidate: true });
                }} placeholder="Product Image" />
                <input type="hidden" {...register("imageUrl")} />
                {errors.imageUrl && <small className="text-danger">{errors.imageUrl.message}</small>}<br />
                <input type="number" className="form-control" {...register("categoryId")} placeholder="Category ID" />
                {errors.categoryId && <small className="text-danger">{errors.categoryId.message}</small>}<br />
                <input type="number" className="form-control" {...register("stock")} placeholder="Stock" />
                {errors.stock && <small className="text-danger">{errors.stock.message}</small>}<br />
                <button className="btn btn-primary w-100" type="submit" disabled={isSubmitting} >{isSubmitting ? "Saving..." : "Submit"}</button>
            </form>
        </div>
    )
}
export default AddProducts;