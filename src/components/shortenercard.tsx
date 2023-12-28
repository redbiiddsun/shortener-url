import { Button } from "./ui/button";

export default function ShortenerCard({ targeturl, pathurl }: { targeturl: string, pathurl: string }) {

    return (
        <>
            <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-4 rounded-md">
                <div>
                    <p className="text-sm text-gray-900 dark:text-white mb-1">{pathurl}</p>
                    <p className="text-xs text-gray-500">{`Original URL: ${targeturl}`}</p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => {
                    navigator.clipboard.writeText(pathurl);
                }}>
                    Copy
                </Button>
            </div>
        </>
    )
}