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
    const data = [
        {
            "firstName": "Gregorius",
            "lastName": null,
            "phone": null,
            "gender": "male",
            "email": "gregeld96@gmail.com",
            "password": "testing@123",
            "subscribeNews": true,
            "socialMedia": "instagram",
            "socialLink": "https://instagram.com/",
            "reference": "Ads Instagram"
        },
        {
            "firstName": "Sophia",
            "lastName": "Williams",
            "phone": "1234567890",
            "gender": "female",
            "email": "sophia.w@gmail.com",
            "password": "password123",
            "subscribeNews": false,
            "socialMedia": "facebook",
            "socialLink": "https://facebook.com/sophia",
            "reference": "Friend"
        },
        {
            "firstName": "Liam",
            "lastName": "Smith",
            "phone": "0987654321",
            "gender": "male",
            "email": "liam.smith@gmail.com",
            "password": "securePass!1",
            "subscribeNews": true,
            "socialMedia": "linkedin",
            "socialLink": "https://linkedin.com/in/liamsmith",
            "reference": "Ads LinkedIn"
        },
        {
            "firstName": "Emma",
            "lastName": null,
            "phone": null,
            "gender": "female",
            "email": "emma.2023@yahoo.com",
            "password": "mypassword",
            "subscribeNews": false,
            "socialMedia": "twitter",
            "socialLink": "https://twitter.com/emma",
            "reference": "Social Media"
        },
        {
            "firstName": "Noah",
            "lastName": "Johnson",
            "phone": "5559876543",
            "gender": "male",
            "email": "noah.johnson@gmail.com",
            "password": "Pass@1234",
            "subscribeNews": true,
            "socialMedia": "instagram",
            "socialLink": "https://instagram.com/noah.j",
            "reference": "Ads Instagram"
        },
        {
            "firstName": "Olivia",
            "lastName": "Brown",
            "phone": null,
            "gender": "female",
            "email": "olivia_brown@outlook.com",
            "password": "olivia@password",
            "subscribeNews": true,
            "socialMedia": "pinterest",
            "socialLink": "https://pinterest.com/oliviabrown",
            "reference": "Friend"
        },
        {
            "firstName": "James",
            "lastName": null,
            "phone": null,
            "gender": "male",
            "email": "james.doe@gmail.com",
            "password": "James12345",
            "subscribeNews": false,
            "socialMedia": "twitter",
            "socialLink": "https://twitter.com/james_doe",
            "reference": "Ads Twitter"
        },
        {
            "firstName": "Ava",
            "lastName": "Taylor",
            "phone": "9998887776",
            "gender": "female",
            "email": "ava.taylor@gmail.com",
            "password": "Taylor@123",
            "subscribeNews": true,
            "socialMedia": "instagram",
            "socialLink": "https://instagram.com/ava.taylor",
            "reference": "Ads Instagram"
        },
        {
            "firstName": "William",
            "lastName": "Martinez",
            "phone": "4443332221",
            "gender": "male",
            "email": "will.martinez@gmail.com",
            "password": "WillPower123",
            "subscribeNews": false,
            "socialMedia": "facebook",
            "socialLink": "https://facebook.com/willmartinez",
            "reference": "Friend"
        },
        {
            "firstName": "Isabella",
            "lastName": "Garcia",
            "phone": null,
            "gender": "female",
            "email": "isabella.garcia@hotmail.com",
            "password": "Bella@2023",
            "subscribeNews": true,
            "socialMedia": "linkedin",
            "socialLink": "https://linkedin.com/in/isabellagarcia",
            "reference": "Ads LinkedIn"
        }
        // {
        //     "firstName": "Lucas",
        //     "lastName": null,
        //     "phone": "3332221110",
        //     "gender": "male",
        //     "email": "lucas.hall@gmail.com",
        //     "password": "Lucas@123",
        //     "subscribeNews": false,
        //     "socialMedia": "instagram",
        //     "socialLink": "https://instagram.com/lucas.h",
        //     "reference": "Social Media"
        // },
        // {
        //     "firstName": "Mia",
        //     "lastName": null,
        //     "phone": null,
        //     "gender": "female",
        //     "email": "mia.lee@gmail.com",
        //     "password": "LeeMia2023",
        //     "subscribeNews": true,
        //     "socialMedia": "twitter",
        //     "socialLink": "https://twitter.com/mia_lee",
        //     "reference": "Ads Twitter"
        // },
        // {
        //     "firstName": "Benjamin",
        //     "lastName": "Harris",
        //     "phone": "1234567891",
        //     "gender": "male",
        //     "email": "benjamin.harris@gmail.com",
        //     "password": "BenHarris!",
        //     "subscribeNews": false,
        //     "socialMedia": "instagram",
        //     "socialLink": "https://instagram.com/ben.h",
        //     "reference": "Ads Instagram"
        // },
        // {
        //     "firstName": "Charlotte",
        //     "lastName": "Clark",
        //     "phone": "5551112223",
        //     "gender": "female",
        //     "email": "charlotte.clark@yahoo.com",
        //     "password": "CharlottePass",
        //     "subscribeNews": true,
        //     "socialMedia": "facebook",
        //     "socialLink": "https://facebook.com/charlotte.clark",
        //     "reference": "Friend"
        // },
        // {
        //     "firstName": "Elijah",
        //     "lastName": "Lopez",
        //     "phone": null,
        //     "gender": "male",
        //     "email": "elijah.lopez@gmail.com",
        //     "password": "Lopez2023",
        //     "subscribeNews": true,
        //     "socialMedia": "linkedin",
        //     "socialLink": "https://linkedin.com/in/elijahlopez",
        //     "reference": "Ads LinkedIn"
        // },
        // {
        //     "firstName": "Amelia",
        //     "lastName": null,
        //     "phone": null,
        //     "gender": "female",
        //     "email": "amelia.davis@gmail.com",
        //     "password": "Davis@2024",
        //     "subscribeNews": false,
        //     "socialMedia": "instagram",
        //     "socialLink": "https://instagram.com/amelia.d",
        //     "reference": "Social Media"
        // },
        // {
        //     "firstName": "Henry",
        //     "lastName": "Walker",
        //     "phone": "8887776665",
        //     "gender": "male",
        //     "email": "henry.walker@gmail.com",
        //     "password": "HenryW123",
        //     "subscribeNews": true,
        //     "socialMedia": "facebook",
        //     "socialLink": "https://facebook.com/henry.walker",
        //     "reference": "Friend"
        // },
        // {
        //     "firstName": "Evelyn",
        //     "lastName": "Young",
        //     "phone": null,
        //     "gender": "female",
        //     "email": "evelyn.young@gmail.com",
        //     "password": "Evelyn2023",
        //     "subscribeNews": false,
        //     "socialMedia": "linkedin",
        //     "socialLink": "https://linkedin.com/in/evelynyoung",
        //     "reference": "Ads LinkedIn"
        // },
        // {
        //     "firstName": "Alexander",
        //     "lastName": "King",
        //     "phone": "1112223334",
        //     "gender": "male",
        //     "email": "alex.king@gmail.com",
        //     "password": "King@123",
        //     "subscribeNews": true,
        //     "socialMedia": "twitter",
        //     "socialLink": "https://twitter.com/alex.king",
        //     "reference": "Ads Twitter"
        // },
        // {
        //     "firstName": "Ella",
        //     "lastName": null,
        //     "phone": "9991112223",
        //     "gender": "female",
        //     "email": "ella.brown@gmail.com",
        //     "password": "EllaBrown!",
        //     "subscribeNews": true,
        //     "socialMedia": "instagram",
        //     "socialLink": "https://instagram.com/ella.b",
        //     "reference": "Ads Instagram"
        // }
    ]

    const hashPasswordUsers = data.map((x) => {
        return {
            ...x,
            id: uuidv7(),
            password: hashPassword(x.password),
        }
    })

    await prisma.follower.createMany({
        data: hashPasswordUsers
    });
}

console.time('Seeding follower duration');
main()
    .then(async () => {
        await prisma.$disconnect()
        console.timeEnd('Seeding follower duration');
        console.log('Finished!');
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })