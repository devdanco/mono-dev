import {execSync} from "child_process"

const target = process.argv[2];
const jobIndex = Number(process.argv[3]);
const jobCount = Number(process.argv[4]);

const affected = execSync(
    `npx nx print-affected --base=main --target=${target}`
).toString('utf-8');
console.log("affected",JSON.stringify(JSON.parse(affected), null, 2));


const affected2 = execSync(
    `npx nx show projects --affected --base=main --target=${target}`
).toString('utf-8');

console.log("affected2",JSON.stringify(JSON.parse(affected2), null, 2));


const array = JSON.parse(affected)
    .tasks.map((t) => t.target.project)
    .slice()
    .sort();

console.log("ohoho", array)
const sliceSize = Math.max(Math.floor(array.length / jobCount), 1);
const projects =
    jobIndex < jobCount
        ? array.slice(sliceSize * (jobIndex - 1), sliceSize * jobIndex)
        : array.slice(sliceSize * (jobIndex - 1));

if (projects.length > 0) {
    execSync(
        `npx nx run-many --target=${target} --projects=${projects} --parallel`,
        {
            stdio: [0, 1, 2],
        }
    );
}