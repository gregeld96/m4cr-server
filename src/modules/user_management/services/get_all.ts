import { Prisma, PrismaClient } from '@prisma/client';
import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { GetUserListFilterDTO } from 'src/validator/user';
import { generatePaginationValue } from 'src/utils/pagination_and_filter';

const prisma = new PrismaClient();

export const getAccountData = async (req: GetUserListFilterDTO) => {
    const { name, sortBy, email, limit, currentPage } = req;
    try {
        const whereOptions: Prisma.UserWhereInput = name ? {
            deletedAt: null,
            OR: [
                {
                    firstName: {
                        contains: name,
                        mode: 'insensitive',
                    },
                },
                {
                    lastName: {
                        contains: name,
                        mode: 'insensitive',
                    },
                }
            ],
            email: {
                contains: email,
                mode: 'insensitive',
            }
        } : {
            deletedAt: null,
            email: {
                contains: email,
                mode: 'insensitive',
            }
        }

        const totalCount = await prisma.user.count({ where: whereOptions });

        const { skip, take, totalPage } = generatePaginationValue({ limit, currentPage, totalCount })

        const sortOption: Prisma.UserOrderByWithRelationInput = {}

        if (sortBy) {
            const sort = sortBy.startsWith('-') ? 'desc' : 'asc';
            const sortField = (sortBy.startsWith('-') ? sortBy.substring(1) : sortBy) as keyof Prisma.UserOrderByWithRelationInput;

            sortOption[sortField] = sort;
        }

        const items = await prisma.user.findMany({
            where: whereOptions,
            orderBy: sortOption,
            skip,
            take,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                createdAt: true,
                role: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                status: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            },
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