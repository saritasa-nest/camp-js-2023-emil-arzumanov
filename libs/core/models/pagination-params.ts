/** Pagination class. */
export class PaginationParams {
	/** Page size. */
	public pageSize: number;

	/** Page index. */
	public pageIndex: number;

	public constructor(data: InitPaginationParams) {
		this.pageSize = data.pageSize;
		this.pageIndex = data.pageIndex;
	}
}

type InitPaginationParams = PaginationParams;
