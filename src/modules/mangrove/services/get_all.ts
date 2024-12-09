import { Prisma, PrismaClient } from '@prisma/client';

import ValuesError from 'src/constants/values';
import { internalServerError, prismaClientError, prismaNotFound } from 'src/constants/errors';
import { generatePaginationValue } from 'src/utils/pagination_and_filter';
import { GetLocationListFilterDTO } from 'src/validator/mangrove';

const prisma = new PrismaClient();

export const getMangroveList = async (filter: GetLocationListFilterDTO) => {
    const { name, province, city, urban, district, activity, species, ntfp, currentPage, sortBy, limit, } = filter;

    try {
        const whereOptions: Prisma.MangroveLocationWhereInput = {
            name: {
                contains: name,
                mode: 'insensitive',
            },
            humanActivities: activity ? {
                every: {
                    name: {
                        contains: activity,
                        mode: 'insensitive',
                    }
                }
            } : undefined,
            species: species ? {
                every: {
                    species: {
                        OR: [
                            {
                                commonName: {
                                    contains: species,
                                    mode: 'insensitive',
                                },
                            },
                            {
                                scientificName: {
                                    contains: species,
                                    mode: 'insensitive',
                                },
                            }
                        ]
                    }
                }
            } : undefined,
            ntfps: ntfp ? {
                every: {
                    OR: [
                        {
                            localName: {
                                contains: ntfp,
                                mode: 'insensitive',
                            }
                        },
                        {
                            scientificName: {
                                contains: ntfp,
                                mode: 'insensitive',
                            }
                        },
                        {
                            product: {
                                contains: ntfp,
                                mode: 'insensitive',
                            }
                        }
                    ]
                }
            } : undefined,
            province: {
                contains: province,
                mode: 'insensitive',
            },
            city: {
                contains: city,
                mode: 'insensitive',
            },
            urban: {
                contains: urban,
                mode: 'insensitive',
            },
            district: {
                contains: district,
                mode: 'insensitive',
            },
            deletedAt: null,
        }

        const totalCount = await prisma.mangroveLocation.count({ where: whereOptions })

        const { skip, take, totalPage } = generatePaginationValue({ limit, currentPage, totalCount })

        const sortOption: Prisma.MangroveLocationOrderByWithRelationInput = {}

        if (sortBy) {
            const sort = sortBy.startsWith('-') ? 'desc' : 'asc';
            const sortField = (sortBy.startsWith('-') ? sortBy.substring(1) : sortBy) as keyof Prisma.MangroveLocationOrderByWithRelationInput;

            sortOption[sortField] = sort;
        }

        const items = await prisma.mangroveLocation.findMany({
            where: whereOptions,
            orderBy: sortOption,
            include: {
                conservationStatus: true,
                boundary: true,
            },
            skip,
            take,
        });

        const data = items.map((item) => {
            return {
                id: item.id,
                area: item.area,
                name: item.name,
                description: item.description,
                province: item.province,
                city: item.city,
                district: item.district,
                urban: item.urban,
                longitude: item.longitude,
                latitude: item.latitude,
                conservation: {
                    name: item.conservationStatus?.name,
                    type: item.conservationStatus?.type,
                    description: item.conservationStatus?.description,
                    color: item.conservationStatus?.color,
                },
                boundary: {
                    type: item.boundary?.type,
                    cordinates: item.boundary ? item.boundary.geometry ? JSON.parse(item.boundary.geometry) : null : null,
                }
            }
        })

        return {
            totalCount,
            totalPage,
            list: data,
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