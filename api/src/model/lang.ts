/*interface Word {
    dutch: string;
    engels: string;
    notes?: Array<string>;
    sentences?: Array<string>;
}

interface Pagination {
    npp: number;
    pages: number;
    total: number;
}

export interface Lang {
    data: [Word];
    meta: {
        pagination: Pagination
    };
}*/
export interface Lang {
    dutch: string;
    engels: string;
    notes?: Array<string>;
    sentences?: Array<string>;
}
