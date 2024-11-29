import { nanoid } from "nanoid"

export class AppServices {

    static idGenerator = async () => {
        try {
            return nanoid(8);
        } catch (error) {
            console.log('[AppServices.idGenerator]: Error to genearte ID ', error);
            throw new Error('Internal server error!');
        };
    };

};