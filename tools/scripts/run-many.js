import {execSync} from "child_process"

const target = process.argv[2];
const jobIndex = Number(process.argv[3]);
const jobCount = Number(process.argv[4]);


const affected = execSync(
    `npx nx show projects --affected --base=main --target=${target}`
).toString('utf-8');

const affectedArray = affected.split('\n').filter(Boolean);

const sliceSize = Math.max(Math.floor(affectedArray.length / jobCount), 1);
const projects =
    jobIndex < jobCount
        ? affectedArray.slice(sliceSize * (jobIndex - 1), sliceSize * jobIndex)
        : affectedArray.slice(sliceSize * (jobIndex - 1));

if (projects.length > 0) {
    execSync(
        `npx nx run-many --target=${target} --projects=${projects} --parallel`,
        {
            stdio: [0, 1, 2],
        }
    );
}