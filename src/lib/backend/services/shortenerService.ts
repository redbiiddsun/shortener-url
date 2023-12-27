import { prisma } from "@/lib/prisma"
import { ICrudService } from "@/lib/types/crud"
import { Url } from "@prisma/client"

export interface IShortenerCrudService<T> extends Omit<ICrudService<T>, 'update' | 'delete'> {}

export const ShortenerService: IShortenerCrudService<Url> = {
    getAll: () => prisma.url.findMany(),
    getOne: (pathurl: string) => prisma.url.findFirst({where: {pathurl}}),
    create: (data) => prisma.url.create({data}),
}
