export class Car {
  constructor(imageUrl?: string, name?: string, price?: string) {
    this.imageUrl = imageUrl;
    this.name = name;
    this.price = price;
  }

  imageUrl: string;
  name: string;
  price: string;
}
