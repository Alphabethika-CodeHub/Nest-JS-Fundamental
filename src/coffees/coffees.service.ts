import { HttpException, Injectable, HttpStatus, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {

    private coffees: Coffee[] = [
        {
            id: 1,
            name: "Shipwreck Roast",
            brand: "Buddy Brew",
            flavors: ["Chocolate", "Vanilla"],
        }
    ];

    // The Big 4 CRUD

    findAll() {
        return this.coffees;
    }

    findOne(id: string) {
        const coffee = this.coffees.find(item => item.id === +id);
        if (!coffee) {
            // Friendly Error Message
            // throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;
    }

    create(createCoffeeDto: any) {
        this.coffees.push(createCoffeeDto);
    }

    update(id: string, updateCoffeeDto: any) {
        const existingCoffee = this.findOne(id);
        // if (existingCoffee) {

        // }
    }

    remove(id: string) {
        const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
        if (coffeeIndex >= 0) {
            this.coffees.splice(coffeeIndex, 1);
        }
    }

}
