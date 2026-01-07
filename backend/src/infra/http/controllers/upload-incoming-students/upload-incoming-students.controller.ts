import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  ForbiddenException,
  MaxFileSizeValidator,
  NotFoundException,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import { z } from "zod";
import { CurrentUser } from "@/infra/auth/current-user-decorator";
import { SessionUser } from "@/domain/entities/user";
import { NotAllowedError } from "@/core/errors/errors/not-allowed-error";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { FilesInterceptor } from "@nestjs/platform-express";
import { UploadIncomingStudentsUseCase } from "@/domain/application/use-cases/upload-incoming-students/upload-incoming-students";
import { InvalidStudentPdfError } from "@/domain/application/use-cases/errors/invalid-students-pdf-error";

const uploadIncomingStudentsBodySchema = z.object({
  clearIncomingStudents: z
    .string()
    .optional()
    .transform((value) => value === "true"),
  courseId: z.uuid(),
});

export type UploadIncomingStudentsBodySchema = z.infer<
  typeof uploadIncomingStudentsBodySchema
>;

@Controller("/students/incoming/upload")
export class UploadIncomingStudentsController {
  constructor(
    private uploadIncomingStudentsUseCase: UploadIncomingStudentsUseCase
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor("incomingStudentsPdf"))
  async handle(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 3, // 3mb
          }),
          new FileTypeValidator({
            fileType: /(pdf)/,
          }),
        ],
      })
    )
    incomingStudentsPdf: Array<Express.Multer.File>,
    @CurrentUser() sessionUser: SessionUser,
    @Body(new ZodValidationPipe(uploadIncomingStudentsBodySchema))
    data: UploadIncomingStudentsBodySchema
  ) {
    const result = await this.uploadIncomingStudentsUseCase.execute({
      sessionUser,
      data: {
        ...data,
        incomingStudentsBuffer: incomingStudentsPdf[0].buffer,
      },
    });

    if (result.isLeft()) {
      const error = result.value;
      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message);
        case NotAllowedError:
          throw new ForbiddenException(error.message);
        case InvalidStudentPdfError:
          throw new BadRequestException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
