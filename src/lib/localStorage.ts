import { Url } from "@prisma/client"

export const accessLocalStorage = () => JSON.parse(localStorage.getItem('shortener-data') || '[]')

export const storeLocalStorage = (data: Url | null) => {

  let urlHistory = accessLocalStorage()

  if (data != null) {
    urlHistory.push(data)
  }

  localStorage.setItem('shortener-data', JSON.stringify(urlHistory))
}