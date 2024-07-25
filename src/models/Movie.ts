import { getuid } from "process";
import Actor from "./Actor";

class Movie {
    id: number;
    title: string;
    genreId: number;
    genre?: string;
    cover: string;
    actors?: number[];

    constructor(id: number, title: string, genreId: number, cover: string) {
        this.id = id;
        this.title = title;
        this.genreId = genreId;
        this.cover = cover;
    }
}

export default Movie;