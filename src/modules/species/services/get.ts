import { Prisma, PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { generatePaginationValue } from 'src/utils/pagination_and_filter';
import { GetSpeciesListFilterDTO } from 'src/validator/species';

const prisma = new PrismaClient();

export const getSpeciesList = async (filter: GetSpeciesListFilterDTO) => {
    const { name, currentPage, sortBy, limit, } = filter;

    try {
        const whereOptions: Prisma.SpeciesWhereInput = {
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

        const totalCount = await prisma.species.count({ where: whereOptions })

        const { skip, take, totalPage } = generatePaginationValue({ limit, currentPage, totalCount })

        const sortOption: Prisma.SpeciesOrderByWithRelationInput = {}

        if (sortBy) {
            const sort = sortBy.startsWith('-') ? 'desc' : 'asc';
            const sortField = (sortBy.startsWith('-') ? sortBy.substring(1) : sortBy) as keyof Prisma.SpeciesOrderByWithRelationInput;

            sortOption[sortField] = sort;
        }

        const items = await prisma.species.findMany({
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