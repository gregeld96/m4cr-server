interface CustomError {
    name?: string;
    code?: number;
    status?: number;
    maxPage?: number;
    message?: string;
    meta?: any;
}

export const prismaClientError = (error: CustomError) => {
    if(String(error.code) === 'P2002') {
        return {
            status: 400,
            provider: 'prisma',
            code: error.code,
            message: `${error.meta.target[0]} already registered! Used another ${error.meta.target[0]}`,
        }
    }

    return {
        status: 400,
        provider: 'prisma',
        code: error.code,
        message: ``
    }
}

export const prismaNotFound = (error: CustomError) => {
    return {
        status: 404,
        provider: 'prisma',
        code: error.code,
        message: `Data not found`
    }
}

export const maximumPageError = (error: CustomError) => {
    return {
        status: 400,
        provider: 'internal',
        code: error.code || '',
        message: `Maximum page is ${error.maxPage}`,
    }
}

export const internalServerError = (error: CustomError) => {
    return {
        status: error.status,
        provider: 'internal',
        code: error.code || '',
        message: error.message,
    }
}
