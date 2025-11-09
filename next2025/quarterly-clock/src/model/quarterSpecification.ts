export function parseParameters(params: URLSearchParams): QuarterSpecification {
    // We zero-index months internally because JS does but we don't expose that in the
    // API since it's weird

    if (params.has('yearStartMonth')) {
        const yearStartMonthParam = params.get('yearStartMonth');
        if (yearStartMonthParam?.match(/^\d+$/)) {
            const monthNumber = parseInt(yearStartMonthParam);
            if (monthNumber >= 1 && monthNumber <= 12) {
                const yearStartMonth = monthNumber - 1;
                return new QuarterSpecification(yearStartMonth);
            }
        }
    }

    return QuarterSpecification.default();
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
