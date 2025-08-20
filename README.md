# m4cr-server

## Technology
1. Express JS (Node JS Framework)
2. Typescript Syntax
3. Prisma (ORM)
4. PostgreSQL (Database)

## Installation
1. Cloned the project 
2. Make sure you have yarn and node preinstalled to you local machine
3. Install the project dependency
```
yarn
```

## First Timer Setup
1. Copy .env.example and change it to .env
2. Change DATABASE_URL with local machine DB information
3. Fill all env variable based on real / production information
4. Run sript for get existing migration
```
npm run migrate-deploy
```

## Seeding
1. Run sript for get existing seeding
```
npm run seed-init
```

## RUN PRODUCTION READY
1. Run sript for build production ready
```
npm run build
```

## OTHER STEP PRODUCTION
1. Install PM2
2. Start with PM2 command

## Create new Migration
1. If there any change related to schema.prisma
2. Create the new migration by run the prisma script cli
```
npx prisma migrate dev
```

## Run the code
1. Write script at the terminal
```
yarn dev
```