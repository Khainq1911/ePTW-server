export class TemplateDto {
  name: string;
  description: string;
  fields: any;
  isActive?: boolean;
  imgUrl: string;
}

export class UpdateTemplateDto {
  name?: string;
  description?: string;
  fields?: any;
  isActive?: boolean;
  imgUrl?: string;
}

export class QueryDto {
  q?: string;
  page?: number;
  limit?: number;
}
