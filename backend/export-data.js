const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const prisma = new PrismaClient()

async function main() {
    const data = {
        users: await prisma.user.findMany(),
        patients: await prisma.patient.findMany(),
        caregivers: await prisma.caregiver.findMany(),
        patientCaregivers: await prisma.patientCaregiver.findMany(),
        taskTypes: await prisma.taskType.findMany(),
        tasks: await prisma.task.findMany(),
        recurrenceRules: await prisma.recurrenceRule.findMany(),
        siteContent: await prisma.siteContent.findMany(),
        logs: await prisma.log.findMany(),
    }
    fs.writeFileSync('seed-data.json', JSON.stringify(data, null, 2))
    console.log('Done!')
}

main().finally(() => prisma.$disconnect())