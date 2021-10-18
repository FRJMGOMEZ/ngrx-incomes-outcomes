export class IncomeOutcome {
    constructor(
        public amount:number,
        public type:string,
        public description:string,
        public uid?:string
    ){}
}