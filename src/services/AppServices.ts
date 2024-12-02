import { NextFunction, Request, Response } from "express";
import { nanoid } from "nanoid"
import urlExist from "url-exist"
import { AppModels } from "../model/AppModels";

export class AppServices {

    static idGenerator = async () => {
        try {
            return nanoid(8);
        } catch (error) {
            console.log('[AppServices.idGenerator]: Error to genearte ID ', error);
            throw new Error('Internal server error!');
        };
    };

    static urlValidate = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { originalLink } = req.body

            const validURL = await urlExist(originalLink)
            
            validURL ? next() : res.status(500).json('This url is not valid!')
        } catch (error) {
            console.log(`[AppServices.urlValidate]: ${error}`)
            throw new Error('Internal server error')
        }
    }

    static redirectToOriginalLink = async (req: Request, res: Response) => {
        
        const {id} = req.params

        console.log(id)

        const originalLink = await AppModels.findByID(id)

        originalLink ? res.redirect(originalLink) : res.status
    }

};