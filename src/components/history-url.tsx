import { Url } from "@prisma/client"
import { Button } from "./ui/button"
import { DOMAIN } from "@/lib/config"
import ShortenerCard from "./shortenercard"
import { removeLocalStorage } from "@/lib/localStorage"
import { MouseEventHandler } from "react"
import getURL from "@/lib/config/getURL"

export default function HistoryURL({ shorturlData, onClick }: { shorturlData: Url[], onClick?: MouseEventHandler<HTMLButtonElement> | undefined }) {
    return (
        <>
            <div className="w-full max-w-md mt-8">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Your Shortened URLs</h2>
                <div className="space-y-4">
                    {shorturlData.map(function (data) {
                        return (
                            <ShortenerCard key={data.id} targeturl={data.targeturl} pathurl={getURL( data.pathurl)} />
                        )
                    })}
                </div>
                <Button className="w-full mt-4 py-2 rounded-b-md" onClick={onClick}>Clear History</Button>
            </div>
        </>)
}