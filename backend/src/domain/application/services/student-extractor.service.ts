import { Injectable } from "@nestjs/common";

export interface ExtractedStudent {
  matriculation: string;
  name: string;
  dateOfBirth: string;
  cpf: string;
  rg: string;
  city: string;
  landlinePhone: string;
  cellPhone: string;
  email: string;
}

@Injectable()
export class StudentExtractorService {
  extractYearBlock(text: string, year: number): string {
    const regex = new RegExp(
      `^Ano:\\s*${year}[\\n\\p{L}: 0-9\\/.()@\\-]+?(?=Total de Registros:|^Ano:)`,
      "gmu"
    );

    return text.match(regex)?.[0] ?? "";
  }

  normalizeYearBlock(pdfText: string) {
    let normalizedText = pdfText.replace(/-\n/gm, "-");
    normalizedText = normalizedText.replace(
      /(\d{10})\n((?:[\p{L} ]+\n?)+)/gmu,
      (match, matriculation, name) => {
        const normalizedName = name.trim().replace(/\s*\n\s*/g, " ");

        return `${matriculation}\n${normalizedName}\n`;
      }
    );
    normalizedText = normalizedText.replace(
      /(\d{10})([\p{L} ]+)([\d]{2}\/[\d]{2}\/[\d]{4})/gu,
      "$1\n$2\n$3"
    );
    normalizedText = normalizedText.replace(
      /((?:\.[\d]{3})|(?:-[\d]{2})|(?:-[\d]{1}))([\p{L}])/gu,
      "$1\n$2"
    );
    normalizedText = normalizedText.replace(/(\([\d]+\))\n([\d]+)/gm, "$1 $2");
    normalizedText = normalizedText.replace(
      /([\p{L}])(\([\d]*\))/gmu,
      "$1\n$2"
    );
    normalizedText = normalizedText.replace(
      /(\([\d]*\))(\([\d]*\))/gm,
      "$1\n$2\n"
    );
    normalizedText = normalizedText.replace(
      /(\([\d]*\))(\([\d]*\))((?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*)+@)/gm,
      "$1\n$2\n$3"
    );
    normalizedText = normalizedText.replace(/^\n/gm, "");
    normalizedText = normalizedText.replace(/^([\d]+)([\p{L}])/gmu, "$1\n$2");
    normalizedText = normalizedText.replace(
      /^(\([\d]{2}\))([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$)/gm,
      "$1\n$2"
    );

    return normalizedText;
  }

  extractStudentsFromNormalizedYearBlock(
    normalizedYearBlock: string,
    year: number
  ) {
    const students: ExtractedStudent[] = [];

    // Divide o texto em linhas
    const lines = normalizedYearBlock
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    let currentStudent: ExtractedStudent | null = null;
    let lineIndex = 0;

    while (lineIndex < lines.length) {
      const line = lines[lineIndex];

      const regex = new RegExp(`^(${year}\\d{6})$`);

      // Verifica se a linha contém uma matrícula (início de um novo aluno)
      const matriculationMatch = line.match(regex);

      if (matriculationMatch) {
        // Se já existe um aluno sendo processado, adiciona à lista
        if (currentStudent && currentStudent.matriculation) {
          students.push(currentStudent as ExtractedStudent);
        }

        // Inicia um novo aluno
        currentStudent = {
          matriculation: matriculationMatch[1],
          name: "",
          dateOfBirth: "",
          cpf: "",
          rg: "",
          city: "",
          landlinePhone: "",
          cellPhone: "",
          email: "",
        };

        lineIndex++;
        if (lineIndex < lines.length) {
          currentStudent.name = lines[lineIndex];
        }

        lineIndex++;
        if (lineIndex < lines.length) {
          currentStudent.dateOfBirth = lines[lineIndex];
        }

        lineIndex++;
        if (lineIndex < lines.length) {
          currentStudent.cpf = lines[lineIndex];
        }

        lineIndex++;
        if (lineIndex < lines.length) {
          currentStudent.rg = lines[lineIndex];
        }

        lineIndex++;
        if (lineIndex < lines.length) {
          let cidade = lines[lineIndex];

          if (
            lineIndex + 1 < lines.length &&
            lines[lineIndex + 1] !== "()" &&
            !lines[lineIndex + 1].match(/^\(\d{2}\)/)
          ) {
            lineIndex++;
            cidade += " " + lines[lineIndex];
          }

          currentStudent.city = cidade;
        }

        lineIndex++;
        if (lineIndex < lines.length) {
          const landlinePhone = lines[lineIndex];
          if (landlinePhone !== "()") {
            currentStudent.landlinePhone = landlinePhone;
          }
        }

        lineIndex++;
        if (lineIndex < lines.length) {
          const cellPhone = lines[lineIndex];
          if (cellPhone !== "()" && !cellPhone.includes("@")) {
            currentStudent.cellPhone = cellPhone;

            lineIndex++;
            if (lineIndex < lines.length) {
              currentStudent.email = lines[lineIndex];
            }
          } else if (cellPhone.includes("@")) {
            currentStudent.email = cellPhone;
          }
        }
      }

      lineIndex++;
    }
    if (currentStudent && currentStudent.matriculation) {
      students.push(currentStudent as ExtractedStudent);
    }

    return students;
  }
}
