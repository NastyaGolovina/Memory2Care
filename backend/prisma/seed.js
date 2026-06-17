// prisma/seed.js
const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const prisma = new PrismaClient()

async function main() {
    // const data = JSON.parse(fs.readFileSync('seed-data.json'))
    const data = JSON.parse(fs.readFileSync(__dirname + '/seed-data.json'))

    for (const u of data.users) {
        await prisma.user.upsert({ where: { user_id: u.user_id }, update: u, create: u })
    }
    for (const r of data.recurrenceRules) {
        await prisma.recurrenceRule.upsert({ where: { recurrence_rule_id: r.recurrence_rule_id }, update: r, create: r })
    }
    for (const t of data.taskTypes) {
        await prisma.taskType.upsert({ where: { task_type_id: t.task_type_id }, update: t, create: t })
    }
    for (const p of data.patients) {
        await prisma.patient.upsert({ where: { patient_id: p.patient_id }, update: p, create: p })
    }
    for (const c of data.caregivers) {
        await prisma.caregiver.upsert({ where: { caregiver_id: c.caregiver_id }, update: c, create: c })
    }
    for (const pc of data.patientCaregivers) {
        await prisma.patientCaregiver.upsert({ where: { pc_id: pc.pc_id }, update: pc, create: pc })
    }
    for (const task of data.tasks) {
        await prisma.task.upsert({ where: { task_id: task.task_id }, update: task, create: task })
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    for (const s of data.siteContent) {
        await prisma.siteContent.upsert({ where: { content_id: s.content_id }, update: s, create: s })
    }
    for (const l of data.logs) {
        await prisma.log.upsert({ where: { log_id: l.log_id }, update: l, create: l })
    }

    console.log('Seed done!')
}

main().finally(() => prisma.$disconnect())



// npx prisma migrate deploy
// npx prisma db seed