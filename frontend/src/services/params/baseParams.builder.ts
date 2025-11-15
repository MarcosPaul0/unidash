import {
  PaginationDto,
  paginationDtoSchema,
} from "@unidash/api/dtos/pagination.dto";

export abstract class BaseParamsBuilder<T> {
  protected params: NonNullable<Partial<T> & PaginationDto> = {};

  public applyPagination(paginationDto: PaginationDto) {
    const validatedPagination = paginationDtoSchema.parse(paginationDto);

    this.params["page"] = validatedPagination?.page ?? 1;

    if (validatedPagination?.itemsPerPage) {
      this.params["itemsPerPage"] = validatedPagination.itemsPerPage;
    }

    return this;
  }

  public build() {
    return this.params;
  }

  abstract applyFilters(filtersDto: T): this;
}
