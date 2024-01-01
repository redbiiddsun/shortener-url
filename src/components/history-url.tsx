import { Url } from "@prisma/client"
import { Button } from "./ui/button"
import { DOMAIN } from "@/lib/config"
import ShortenerCard from "./shortenercard"

export default function HistoryURL({ shorturlData }: { shorturlData: Url[] }) {
    return (
        <>
            <div className="w-full max-w-md mt-8">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Your Shortened URLs</h2>
                <div className="space-y-4">
                    {shorturlData.map(function (data) {
                        return (
                            <ShortenerCard targeturl={data.targeturl} pathurl={DOMAIN + data.pathurl} />
                        )
                    })}
                </div>
                <Button className="w-full mt-4 py-2 rounded-b-md" onClick={() => {
                    localStorage.removeItem('shortener-data')
                }}>Clear</Button>
            </div>
        </>)
}