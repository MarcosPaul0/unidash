import { Module } from "@nestjs/common";
import { StudentExtractorService } from "./student-extractor.service";

@Module({
  imports: [],
  providers: [StudentExtractorService],
  exports: [StudentExtractorService],
})
export class ServicesModule {}
