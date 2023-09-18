import {execSync} from "child_process"

const target = process.argv[2];
const jobIndex = Number(process.argv[3]);
const jobCount = Number(process.argv[4]);

const affected = execSync(
    `nx print-affected --base=main --target=${target}`
).toString('utf-8');
console.log("affected",JSON.parse(affected))


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