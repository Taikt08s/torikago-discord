import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = () => {
    const userId = auth();
    if (!userId) throw new Error("Unauthorized");
    return { userId: userId };
}

export const ourFileRouter = {
    serverImage: f({
        image: { maxFileSize: "2MB", maxFileCount: 1 }
    })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),
    messageFile: f(["image", "pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"])
        .middleware(() => handleAuth())
        .onUploadComplete(() => { })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;