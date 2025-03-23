import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

// Helper function to get the pages from the app directory
const getPages = (): { path: string }[] => {
    const appDir = path.join(process.cwd(), "app");

    // Read all directories directly under the app folder
    const files = fs.readdirSync(appDir);

    return files
        .filter((file) => {
            const filePath = path.join(appDir, file);
            return fs.statSync(filePath).isDirectory();
        })
        .map((folder) => {
            return {
                path: `/${folder}`, // Form URL path for each directory
            };
        });
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Get all pages from the app directory
    const pages = getPages();

    // Return the sitemap with URLs and lastModified dates
    return pages.map((page) => ({
        url: `https://ramicoin.com${page.path}`,
        lastModified: new Date().toISOString(),
    }));
}