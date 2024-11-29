import { prisma } from "../../prisma/prismaClient";


export class UserModels {

    static addShorURL = async (id: string, originalLink: string) => {
        try {
            await prisma.short_urls.create({
                data: {
                    id: id,
                    original_link: originalLink
                }
            })
            return {
                message: 'Short URL saved succesfly',
                shortURL: `${process.env.SHORT_URL_BASE}/${id}`
            }
        } catch (error) {
            console.error(`[addShortURL] Failed to create short URL for ID: ${id}`, error);
            throw new Error(`Internal server error!`)
        }
    }

}