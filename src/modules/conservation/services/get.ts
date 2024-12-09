import { Prisma, PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { generatePaginationValue } from 'src/utils/pagination_and_filter';
import { GetConservationListFilterDTO } from 'src/validator/conservation';

const prisma = new PrismaClient();

export const getConservationList = async (filter: GetConservationListFilterDTO) => {
    const { name, type, currentPage, sortBy, limit, } = filter;

    try {
        const whereOptions: Prisma.ConservationStatusWhereInput = {
            name: {
                contains: name,
                mode: 'insensitive',
            },
            type: type ? {
                equals: type,
                mode: 'insensitive'
            } : undefined,
            deletedAt: null,
        }

        const totalCount = await prisma.conservationStatus.count({ where: whereOptions })

        const { skip, take, totalPage } = generatePaginationValue({ limit, currentPage, totalCount })

        const sortOption: Prisma.ConservationStatusOrderByWithRelationInput = {}

        if (sortBy) {
            const sort = sortBy.startsWith('-') ? 'desc' : 'asc';
            const sortField = (sortBy.startsWith('-') ? sortBy.substring(1) : sortBy) as keyof Prisma.ConservationStatusOrderByWithRelationInput;

            sortOption[sortField] = sort;
        }

        const items = await prisma.conservationStatus.findMany({
            where: whereOptions,
            orderBy: sortOption,
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