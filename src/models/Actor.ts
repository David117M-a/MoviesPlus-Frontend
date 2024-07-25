class Actor {
    id: number;
    name: string;
    photo?: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

export default Actor;