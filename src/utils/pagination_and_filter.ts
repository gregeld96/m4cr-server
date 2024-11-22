import ValuesError from 'src/constants/values';
import { z } from 'zod';

export const generatePaginationSchema = (payload: {sortByEnum: z.EnumLike, defaultSort: string}) => {
  const {sortByEnum, defaultSort} = payload;
  return z.object({
      limit: z.coerce.number({ message: 'limit should be number' }).min(1).optional().default(100),
      currentPage: z.coerce.number({ message: 'currentPage should be number' }).min(1).optional().default(1),
      sortBy: z.nativeEnum(sortByEnum, { message: `Invalid enum value. Expected ${Object.values(sortByEnum).join(' | ')}` })
                .optional()
                .default(defaultSort)
                .transform((val) => val.toString()),
  })
}

export const generatePaginationValue = (payload: { limit: number, currentPage: number, totalCount: number }) => {
  const { limit, currentPage, totalCount } = payload;

  const totalPage = Math.ceil(totalCount / limit) || 1;

  if (currentPage > totalPage) {
    throw { 
      name: ValuesError.ErrorName.MAXIMUM_PAGE,
      maxPage: totalPage,
    }
  }

  return {
    take: Number(limit),
    skip: (currentPage - 1) * limit,
    totalPage,
  }
}

