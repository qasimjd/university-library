"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/valiations";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import ColorPicker from "@/components/admin/ColorPicker";
import { createBook, updateBook } from "@/lib/admin/actions/book.action";
import { toast } from "sonner"
import { IBook } from "@/database/Models/book.modle";


const BookForm = ({ book, type = "create" }: { book?: IBook; type?: "create" | "update" }) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof bookSchema>>({
        resolver: zodResolver(bookSchema),
        defaultValues: book || {
            title: "",
            description: "",
            author: "",
            genre: "",
            rating: 1,
            totalCopies: 1,
            availableCopies: 1,
            coverUrl: "",
            coverColor: "",
            videoUrl: "",
            summary: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof bookSchema>) => {
        let result;
        if (type === "update" && book?._id) {
            result = await updateBook(book._id.toString(), values);
            toast.success("Book updated successfully");
        } else {
            result = await createBook(values);
            toast.success("Book added successfully");
        }

        if (result.success) {
            router.push("/admin/books");
        } else {
            toast.error("Failed to save book");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  text-gray-300">
                <div className="flex gap-4">
                    <FormField
                        control={form.control}
                        name={"title"}
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-1">
                                <FormLabel className="text-base font-normal ">
                                    Book Title
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        required
                                        placeholder="Book title"
                                        {...field}
                                        className="book-form_input"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={"author"}
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-1">
                                <FormLabel className="text-base font-normal ">
                                    Author
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        required
                                        placeholder="Book author"
                                        {...field}
                                        className="book-form_input"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name={"genre"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal ">
                                Genre
                            </FormLabel>
                            <FormControl>
                                <Input
                                    required
                                    placeholder="Book genre"
                                    {...field}
                                    className="book-form_input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-6">
                    <FormField
                        control={form.control}
                        name={"rating"}
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-1">
                                <FormLabel className="text-base font-normal ">
                                    Rating
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min={1}
                                        max={5}
                                        placeholder="Book rating"
                                        {...field}
                                        className="book-form_input"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"totalCopies"}
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-1">
                                <FormLabel className="text-base font-normal ">
                                    Total Copies
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min={1}
                                        max={10000}
                                        placeholder="Total copies"
                                        {...field}
                                        className="book-form_input"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name={"availableCopies"}
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-1">
                                <FormLabel className="text-base font-normal ">
                                    Available Copies
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min={1}
                                        max={10000}
                                        placeholder="Total copies"
                                        {...field}
                                        className="book-form_input"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name={"summary"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal ">
                                Book Summary
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Book summary"
                                    {...field}
                                    rows={5}
                                    className="book-form_input"
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={"description"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal ">
                                Book Description
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Book description"
                                    {...field}
                                    rows={10}
                                    className="book-form_input"
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={"coverUrl"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal ">
                                Book Image
                            </FormLabel>
                            <FormControl>
                                <FileUpload
                                    type="image"
                                    accept="image/*"
                                    placeholder="Upload a book cover"
                                    folder="books/covers"
                                    variant="admin"
                                    onFileChange={field.onChange}
                                    value={field.value}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={"videoUrl"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal ">
                                Book Trailer
                            </FormLabel>
                            <FormControl>
                                <FileUpload
                                    type="video"
                                    accept="video/*"
                                    placeholder="Upload a book trailer"
                                    folder="books/videos"
                                    variant="admin"
                                    onFileChange={field.onChange}
                                    value={field.value}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={"coverColor"}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal ">
                                Primary Color
                            </FormLabel>
                            <FormControl>
                                <ColorPicker
                                    onPickerChange={field.onChange}
                                    value={field.value}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="book-form_btn text-white">
                   { type === "create" ? "Add Book to Library": "Update Book"}
                </Button>
            </form>
        </Form>
    );
};
export default BookForm;