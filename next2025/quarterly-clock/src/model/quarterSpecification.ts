export function parseParameters(params: URLSearchParams): QuarterSpecification {
    // We zero-index months internally because JS does but we don't expose that in the
    // API since it's weird
    const yearStartMonth = parseInt(params.get('yearStartMonth') || '1') - 1;
    return new QuarterSpecification(yearStartMonth)
}

export class QuarterSpecification {
    yearStartMonth: number;
    static default(): QuarterSpecification {
        return new QuarterSpecification(0);
    }

    constructor(yearStartMonth: number) {
        this.yearStartMonth = yearStartMonth;
    }
}
