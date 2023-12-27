export default function responseFormat(
    success: boolean,
    message: string,
    data: any | undefined
): ResponseFormat {
    return {
        success,
        message,
        data,
    };
}
