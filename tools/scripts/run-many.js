import {execSync} from "child_process"

const target = process.argv[2];
const jobIndex = Number(process.argv[3]);
const jobCount = Number(process.argv[4]);


const affected = execSync(
    `npx nx show projects --affected --base=main --target=${target}`
).toString('utf-8');


let arr = [].push(affected)

const sliceSize = Math.max(Math.floor(arr.length / jobCount), 1);
const projects =
    jobIndex < jobCount
        ? arr.slice(sliceSize * (jobIndex - 1), sliceSize * jobIndex)
        : arr.slice(sliceSize * (jobIndex - 1));

if (projects.length > 0) {
    execSync(
        `npx nx run-many --target=${target} --projects=${projects} --parallel`,
        {
            stdio: [0, 1, 2],
        }
    );
}