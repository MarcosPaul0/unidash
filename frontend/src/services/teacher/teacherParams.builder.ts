import {
  PaginationDto,
  paginationDtoSchema,
} from "@unidash/api/dtos/pagination.dto";
import { FilterTeachersDto } from "@unidash/api/dtos/teacher.dto";

export type GetAllTeachersParams = FilterTeachersDto & PaginationDto;

export class TeacherParamsBuilder {
  private params: NonNullable<GetAllTeachersParams> = {};

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

  public applyFilters(filterTeachersDto: FilterTeachersDto) {
    if (filterTeachersDto?.isActive !== undefined) {
      this.params["isActive"] = filterTeachersDto.isActive;
    }

    if (filterTeachersDto?.name && filterTeachersDto.name.trim() !== "") {
      this.params["name"] = filterTeachersDto.name;
    }

    if (filterTeachersDto?.email && filterTeachersDto.email.trim() !== "") {
      this.params["email"] = filterTeachersDto.email;
    }

    return this;
  }

  public build() {
    return this.params;
  }
}
