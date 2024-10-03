"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/components/navbar";

const FormSchema = z.object({
    title: z.string().min(1, { message: "This field has to be filled." }),
    link: z.string().min(1, { message: "This field has to be filled." }),
});

export default function CreateCertificate() {
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            link: "",
        },
    });

    async function onSubmit(formdata: z.infer<typeof FormSchema>) {
        try {
            console.log(formdata);
            let response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/certificates/create`,
                formdata
            );
            if (response.status === 201) {
                console.log(response.data);
                toast({
                    title: "Created successfully",
                    description: "Redirecting...",
                });
                router.push("/admin/certificates");
            }
        } catch (error) {
            console.log(error);
            toast({
                title: "Uh-oh!",
                description: "Something went wrong",
                variant: "destructive",
            });
        }
    }

    return (
        <>
            <Navbar />
            <Form {...form}>
                <form
                    className="lg:h-[calc(100vh-150px)] bg-purp-dark flex flex-col gap-4 items-center justify-center p-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="space-y-4 text-center w-full max-w-[400px] lg:max-w-[800px]">
                        <div className="text-3xl font-bold">Add a Certificate</div>
                        <p className="text-gray-500 dark:text-gray-400">
                            Enter Certificate Details
                        </p>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="space-y-2 text-left">
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="link"
                            render={({ field }) => (
                                <FormItem className="space-y-2 text-left">
                                    <FormLabel>Link</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="w-full lg:w-1/3" type="submit">
                            Add Certificate
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
}