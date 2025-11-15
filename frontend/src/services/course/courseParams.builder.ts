import { FilterCoursesDto } from "@unidash/api/dtos/course.dto";

export type GetAllCoursesParams = FilterCoursesDto;

export class CourseParamsBuilder {
  private params: NonNullable<GetAllCoursesParams> = {};

  public applyFilters(filterCoursesDto: FilterCoursesDto) {
    if (filterCoursesDto?.name) {
      this.params["name"] = filterCoursesDto.name;
    }

    return this;
  }

  public build() {
    return this.params;
  }
}
