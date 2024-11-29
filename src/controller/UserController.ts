import { Request, Response } from "express";
import { AppServices } from "../services/AppServices";
import { AppModels } from "../model/AppModels";
import { UserModels } from "../model/UserModels";

export class UserController {

    static addShorURL = async (req: Request, res: Response) => {
        try {
            const { originalLink } = req.body;

            const existingOriginalLink = await AppModels.findByOriginalLink(originalLink)

            if (existingOriginalLink) {
                return res.status(200).json({ shorURL: `${process.env.SHORT_URL_BASE}/${existingOriginalLink.id}` })
            }

            let id = '';
            let existingID: boolean = true;

            do {
                id = await AppServices.idGenerator();
                existingID = await AppModels.findByID(id);
            } while (existingID);

            await UserModels.addShorURL(id, originalLink);

            return res.status(201).json({
                message: 'Short URL created successfully!',
                shortURL: `${process.env.SHORT_URL_BASE}/${id}`
            });


        } catch (error) {
            console.error('[UserController.addShortURL] Error:', error);
            res.status(500).json({ message: 'Internal server error!' });
        };
    };
};