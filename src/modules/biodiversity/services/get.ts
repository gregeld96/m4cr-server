import { Prisma, PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { generatePaginationValue } from 'src/utils/pagination_and_filter';
import { GetBiodiversityListFilterDTO } from 'src/validator/biodiversity';

const prisma = new PrismaClient();

export const getBiodiversityList = async (filter: GetBiodiversityListFilterDTO) => {
    const { name, currentPage, sortBy, limit, } = filter;

    try {
        const whereOptions: Prisma.BioDiversityWhereInput = {
            OR: [
                {
                    commonName: {
                        contains: name,
                        mode: 'insensitive',
                    },
                },
                {
                    scientificName: {
                        contains: name,
                        mode: 'insensitive',
                    },
                }
            ],
            deletedAt: null,
        }

        const totalCount = await prisma.bioDiversity.count({ where: whereOptions })

        const { skip, take, totalPage } = generatePaginationValue({ limit, currentPage, totalCount })

        const sortOption: Prisma.BioDiversityOrderByWithRelationInput = {}

        if (sortBy) {
            const sort = sortBy.startsWith('-') ? 'desc' : 'asc';
            const sortField = (sortBy.startsWith('-') ? sortBy.substring(1) : sortBy) as keyof Prisma.BioDiversityOrderByWithRelationInput;

            sortOption[sortField] = sort;
        }

        const items = await prisma.bioDiversity.findMany({
            where: whereOptions,
            orderBy: sortOption,
            include: {
                image: true,
            },
            skip,
            take,
        });

        return {
            totalCount,
            totalPage,
            list: items,
        }
    } catch (error: any) {
        switch (error.name) {
            case ValuesError.ErrorName.PRISMA_NOT_FOUND:
                throw prismaNotFound(error);
            case ValuesError.ErrorName.PRISMA_CLIENT_ERROR:
                throw prismaClientError(error);
            default:
                throw internalServerError(error);
        }
    }
}