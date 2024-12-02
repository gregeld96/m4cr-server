require('dotenv').config();

const {
    PrismaClient
} = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const provinceData = require('../../asset/provinces.json');
    const cityData = require('../../asset/regencies.json');
    const districtData = require('../../asset/districts.json');
    const villageData = require('../../asset/villages.json');

    const villageFormatted = villageData.map((data) => {
        return {
            ...data,
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude)
        }
    })

    await prisma.$transaction(async (tx) => {
        await tx.province.createMany({
            data: provinceData
        });

        await tx.city.createMany({
            data: cityData
        });

        await tx.district.createMany({
            data: districtData
        });

        await tx.urban.createMany({
            data: villageFormatted
        });
    }, {
        maxWait: 1000000, // default: 2000
        timeout: 1000000, // default: 5000
    })

}

console.time('Seeding address duration');
main()
    .then(async () => {
        await prisma.$disconnect();
        console.timeEnd('Seeding address duration');
        console.log('Finished!');
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        console.timeEnd('Seeding address duration');
        process.exit(1)
    })