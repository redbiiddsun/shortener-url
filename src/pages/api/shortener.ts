import type { NextApiRequest, NextApiResponse } from "next";

// Service & Controller
import { ShortenerController } from "@/lib/backend/controller/shortenerController";
import { ShortenerService } from "@/lib/backend/services/shortenerService";

export interface ShortenerNextApiRequest extends NextApiRequest {
    body: {
        targeturl: string;
        pathurl: string;
    };
}

export default async function handler(
    req: ShortenerNextApiRequest,
    res: NextApiResponse<ResponseFormat>
) {
    await ShortenerController(req, res, ShortenerService);
}
