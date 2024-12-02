import { prisma } from '../../prisma/prismaClient'

export class AppModels {

    static findByID = async (id: string) => {

        try {
            const existingID = await prisma.short_urls.findUnique({
                where: {
                    id: id
                },
                select: {
                    original_link: true
                }
            })

            return existingID ? existingID.original_link : false
        } catch (error) {
            console.log(`[AppModels.findByID]: Error to find id: ${id}`)
            throw new Error('Internal server error!')
        }
    }

    static findByOriginalLink = async (originalLink: string) => {
        try {
            const existingRecord = await prisma.short_urls.findFirst({
                where: {
                    original_link: originalLink
                },
                select: {
                    id: true
                }
            })
            return existingRecord ? existingRecord : false;
        } catch (error) {
            console.log(`[AppModels.findByOriginalLink]: Error to find link: ${originalLink}`)
            throw new Error('Internal server error!')
        }
    }
}