const {
    PrismaClient
} = require('@prisma/client');
const {
    uuidv7
} = require('uuidv7');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const hashPassword = (inputPassword) => {
    var salt = bcrypt.genSaltSync(Number(process.env.SALT_KEY));
    return bcrypt.hashSync(inputPassword, salt);
}

const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany({});
    await prisma.role.deleteMany({});
    await prisma.status.deleteMany({});

    const roleId = uuidv7();

    await prisma.role.createMany({
        data: [{
                id: roleId,
                name: 'superadmin',
            },
            {
                id: uuidv7(),
                name: 'admin',
            }
        ]
    });

    await prisma.status.createMany({
        data: [{
                name: 'active',
                category: 'account',
            },
            {
                name: 'in-active',
                category: 'account'
            },
            {
                name: 'draft',
                category: 'content',
            },
            {
                name: 'publish',
                category: 'content'
            }
        ]
    });

    await prisma.user.createMany({
        data: [{
                id: uuidv7(),
                firstName: 'Bina Usaha',
                lastName: 'Teknologi',
                email: 'binausaha@gmail.com',
                password: hashPassword("admin"),
                roleId: roleId,
                statusId: 1,
            },
            {
                id: uuidv7(),
                firstName: 'Bina Usaha',
                lastName: 'Teknologi',
                email: 'gregeld96@gmail.com',
                password: hashPassword("admin"),
                roleId: roleId,
                statusId: 1,
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