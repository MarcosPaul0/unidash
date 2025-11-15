import {
  PaginationDto,
  paginationDtoSchema,
} from "@unidash/api/dtos/pagination.dto";

export type GetAllStudentsParams = PaginationDto;

export class StudentParamsBuilder {
  private params: NonNullable<GetAllStudentsParams> = {};

  public applyPagination(paginationDto: PaginationDto) {
    const validatedPagination = paginationDtoSchema.parse(paginationDto);

    if (validatedPagination?.page) {
      this.params["page"] = validatedPagination.page;
    }

    if (validatedPagination?.itemsPerPage) {
      this.params["itemsPerPage"] = validatedPagination.itemsPerPage;
    }

    return this;
  }

  public build() {
    return this.params;
  }
}
