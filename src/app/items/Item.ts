export class Item {
    constructor(
        public itemId: number,
        public itemName: string,
        public price: number,
        public description: string,
        public category: string,
        public imageUrl: string
        ) {
    }
}
