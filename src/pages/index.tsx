/**
 * v0 by Vercel.
 * @see https://v0.dev/t/AsdIjgi4QIr
 */

import HistoryURL from "@/components/history-url"
import { Shorturlform } from "@/components/shorturl-form"
import { accessLocalStorage, removeLocalStorage, storeLocalStorage } from "@/lib/localStorage"

import { Url } from "@prisma/client"
import axios from "axios"
import { useEffect, useState } from "react"
import { SubmitHandler } from "react-hook-form"

interface IshortURL {

}

interface IFormInput {
  targeturl: string
  pathurl: string
}
export default function Home() {

  const [shortUrl, setShortUrl] = useState<Url[]>([])

  useEffect(() => {
    setShortUrl(accessLocalStorage())
  }, [])

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    axios.post('/api/shortener', data)
      .then(function (response) {
        storeLocalStorage(response.data.data as Url)
        setShortUrl(accessLocalStorage())
      })
      .catch(function (error) {
        alert(error.response.data.message)
      });
  }

  return (
    <div className="w-full bg-white dark:bg-gray-800 p-8">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">URL Shortener</h1>
        <div className="w-full max-w-md">
          <Shorturlform onSubmit={onSubmit} />
        </div>
        <HistoryURL shorturlData={shortUrl} onClick={() => {
          removeLocalStorage()
          setShortUrl(accessLocalStorage())
        }} />
      </div>
    </div>

  )
}

