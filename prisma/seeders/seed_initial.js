require('dotenv').config();
const {
    PrismaClient
} = require('@prisma/client');
const {
    uuidv7
} = require('uuidv7');
const bcrypt = require('bcryptjs');

const hashPassword = (inputPassword) => {
    var salt = bcrypt.genSaltSync(Number(process.env.SALT_KEY));
    return bcrypt.hashSync(inputPassword, salt);
}

const prisma = new PrismaClient();

async function main() {
    await prisma.tag.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.role.deleteMany({});
    await prisma.status.deleteMany({});

    const roleId = uuidv7();
    const statusId = 1;

    await prisma.role.createMany({
        data: [{
                id: roleId,
                name: 'superadmin',
            },
            {
                id: uuidv7(),
                name: 'admin content',
            },
            {
                id: uuidv7(),
                name: 'admin geospatial',
            }
        ]
    });

    await prisma.status.createMany({
        data: [
            {
                id: statusId,
                name: 'active',
                category: 'account',
            },
            {
                id: 2,
                name: 'in-active',
                category: 'account'
            },
            {
                id: 3,
                name: 'draft',
                category: 'content',
            },
            {
                id: 4,
                name: 'publish',
                category: 'content'
            }
        ]
    });

    await prisma.tag.createMany({
        data: [
            {
                name: 'forest',
            },
            {
                name: 'rare species',
            }
        ]
    });

    await prisma.category.createMany({
        data: [
            {
                name: 'newsletter',
            },
            {
                name: 'blog',
            },
        ]
    });

    await prisma.user.createMany({
        data: [{
                id: uuidv7(),
                firstName: 'Bina Usaha',
                lastName: 'Teknologi',
                email: 'm4cr.binausaha@gmail.com',
                password: hashPassword("admin"),
                roleId: roleId,
                statusId: statusId,
            },
            {
                id: uuidv7(),
                firstName: 'Bina Usaha',
                lastName: 'Teknologi',
                email: 'gregeld96@gmail.com',
                password: hashPassword("admin"),
                roleId: roleId,
                statusId: statusId,
            },
        ]
    });
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })