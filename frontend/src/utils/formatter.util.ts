export class Formatter {
  static getInitials(name?: string) {
    const splittedName = name ? name.split(" ") : [""];

    const initials =
      splittedName.length > 1
        ? `${splittedName[0].charAt(0)}${splittedName[1].charAt(0)}`
        : splittedName[0].slice(0, 2).toUpperCase();

    return initials;
  }

  static registerDate(date: string | Date): string {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "medium",
    }).format(new Date(date));
  }

  static getIndicatorsPeriod(
    yearFrom?: number | null,
    yearTo?: number | null
  ): string {
    if (!yearFrom) {
      return "";
    }

    const result = `(${yearFrom}`;

    if (yearTo) {
      return `${result}-${yearTo})`;
    }

    return `${result})`;
  }

  static toPercentage(value?: number): string {
    if (!value) {
      return "--";
    }

    return new Intl.NumberFormat("pt-BR", {
      style: "percent",
    }).format(value);
  }

  static toDecimal(value?: number): string {
    if (!value) {
      return "--";
    }

    return new Intl.NumberFormat("pt-BR", {
      style: "decimal",
    }).format(value);
  }

  static getChartLabel(value: string, mapper: Record<string, string>) {
    return mapper[value] ?? value;
  }
}
