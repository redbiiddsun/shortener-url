import { NextApiResponse } from "next";

import { IShortenerCrudService } from "../services/shortenerService";
import { ShortenerNextApiRequest } from "@/pages/api/shortener";
import responseFormat from "../utils/responseFormator";

// Prisma Error handler
import { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

export const ShortenerController  = async <T>(
    request: ShortenerNextApiRequest,
    response: NextApiResponse<ResponseFormat>,
    service: IShortenerCrudService<T>
) => {
    try {
        const HTTP_METHOD: string | undefined = request.method;
        const { targeturl, pathurl } = request.body;

        if (HTTP_METHOD === "GET") {
            if(!pathurl) return response.status(400).json(responseFormat(false, "No pathurl provided", null))

            const result = await service.getOne(pathurl)

            if (result == null ) return response.status(204).end()

            return response.status(200).json(responseFormat(true, "Content successfuly query", result))
        }

        if (HTTP_METHOD === "POST") {
            if(!pathurl) return response.status(400).json(responseFormat(false, "No pathurl provided", null))
            if(!targeturl) return response.status(400).json(responseFormat(false, "No pathurl provided", null))


            const validateExistingURL = await service.getOne(pathurl)
            if (validateExistingURL != null) return response.status(400).json(responseFormat(false, `${pathurl} is already in use`, null))

            const result = await service.create({targeturl, pathurl} as T)
            if (result == null) return response.status(400).json(responseFormat(false, "Can not create content", null))

            return response.status(200).json(responseFormat(true, "Content successfuly created", result))
        }

    } catch (error) {

        if( error instanceof PrismaClientKnownRequestError){
            return response.status(404).json(responseFormat(false, error.message, null))
        }else if(error instanceof PrismaClientUnknownRequestError ){
            return response.status(404).json(responseFormat(false, error.message, null))
        }else if (error instanceof PrismaClientValidationError){
            return response.status(404).json(responseFormat(false, error.message, null))
        }else{
            return response.status(500).json(responseFormat(false, "Internal error", null))
        }
    }
}
