import { Controller, Get } from "@nestjs/common";
import { TemplateService } from "./template.service";
import { Public } from "src/common/decorators/public.decorators";

@Controller("template")

export class TemplateController {
    constructor(private readonly templateService: TemplateService) {}

    @Public()
    @Get()
    getTemplate(){
        return "this is template"
    }
}