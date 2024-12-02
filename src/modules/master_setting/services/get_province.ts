import { Prisma, PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { GetAddressListFilterDTO } from 'src/validator/address';
import { generatePaginationValue } from 'src/utils/pagination_and_filter';

const prisma = new PrismaClient();

export const getProvince = async (filter: GetAddressListFilterDTO) => {
    const { name, currentPage, sortBy, limit, } = filter;
    try {
        const whereOptions: Prisma.ProvinceWhereInput = {
            name: name ? {
                contains: name,
                mode: 'insensitive',
            } : undefined,
        }

        const totalCount = await prisma.province.count({ where: whereOptions })

        const { skip, take, totalPage } = generatePaginationValue({ limit, currentPage, totalCount })

        const sortOption: Prisma.ProvinceOrderByWithRelationInput = {}

        if (sortBy) {
            const sort = sortBy.startsWith('-') ? 'desc' : 'asc';
            const sortField = (sortBy.startsWith('-') ? sortBy.substring(1) : sortBy) as keyof Prisma.ProvinceOrderByWithRelationInput;

            sortOption[sortField] = sort;
        }

        const items = await prisma.province.findMany({
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