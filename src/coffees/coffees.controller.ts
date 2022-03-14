import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {

    // Notes:

    // PRIVATE Mean to Only This File is Accessible to CoffesService.
    // With Private, Services Will be Declared & Initialize Immediately With This Class.

    // READONLY Mean That is CoffesServices is Cannot Edited/Mutated By its Class
    // Hence in ReadOnly.

    constructor(private readonly coffeeService: CoffeesService) { }

    // Without Nested URL
    // Access it With "BaseUrl/coffees"
    // @Get()
    // getAll() {
    //     return "This is My Coffees";
    // }

    // With Nested URL
    // Access it With "BaseUrl/coffees/flavors"
    @Get("flavors")
    @HttpCode(HttpStatus.OK)
    getAll(@Query() paginationQuery) {
        // const { limit, offset } = paginationQuery;
        // return `This is My Coffees, Limit: ${limit}, Offset: ${offset}`;
        return this.coffeeService.findAll();
    }

    // With Route Parameters, With All Request Params.
    // @Get("detailWithParams/:routes/:id/:things")
    // getDetail(@Param() params) {
    //     console.log(params);
    //     return `This is Detail Coffee, With ID: ${params.id} ${params.routes} ${params.things}`;
    // }

    // With Specific Route Parameters
    @Get("detail/:id")
    @HttpCode(HttpStatus.OK)
    getDetail(@Param('id') id: string) {
        // return `This is Detail Coffee, With ID: ${id}`;
        return this.coffeeService.findOne(id);
    }

    // Custom Approaches With Http Code
    // @Post("create")
    // create(@Res() response) {
    // const words = `Name: ${body.name}, Phone: ${body.phone}`;
    // response.status(200).send("This Action Return Created Coffee & Custom Status Code");
    // }

    // Best Approaches Http Code
    @Post("create")
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        // const words = `Name: ${body.name}, Phone: ${body.phone}`;
        // return body;
        // return this.coffeeService.create(createCoffeeDto);
        return {
            data: this.coffeeService.create(createCoffeeDto),
            statusCode: HttpStatus.OK,
            message: 'success',
        };
    }

    @Patch("update/:id")
    @HttpCode(HttpStatus.OK)
    update(@Param("id") id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
        // return `Updated Data With ID: #${id} & Body( name:${body.name} phone:${body.phone} )`;
        return this.coffeeService.update(id, updateCoffeeDto);
    }

    @Delete("delete/:id")
    @HttpCode(HttpStatus.OK)
    delete(@Param("id") id: string) {
        // return `Deleted Data With ID: #${id}`;
        return this.coffeeService.remove(id);
    }
}
