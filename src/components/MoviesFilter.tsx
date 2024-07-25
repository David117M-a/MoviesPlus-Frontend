import { Input, Select, SelectItem } from "@nextui-org/react";
import "./MoviesFilter.css"
import { useContext, useEffect, useState } from "react";
import { MoviesContext } from "../store/movies-context";
import { SelectorItems } from "../types/SelectorItems";

type Filters = {
    title: string;
    genre: number;
    actor: number;
}

const MoviesFilter: React.FC = () => {
    const moviesCtx = useContext(MoviesContext);
    const [selectorItems, setSelectorItems] = useState<SelectorItems>({
        genres: [{
            id: 0,
            name: ""
        }],
        actors: [{
            id: 0,
            name: ""
        }]
    });
    const [filters, setFilters] = useState<Filters>({
        title: '',
        genre: 0,
        actor: 0,
    });

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/actors`).then(res => res.json())
            .then(actors => {
                fetch(`${process.env.REACT_APP_API_URL}/genres`).then(res => res.json())
                    .then(genres => setSelectorItems({ ...selectorItems, genres, actors }));
            });
    }, []);

    useEffect(() => {
        moviesCtx.filterMovies(filters.title, filters.genre, filters.actor);
    }, [filters]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({
            ...filters,
            title: e.target.value,
        });
    };

    const handleGenreChange = (selectedKey: number) => {
        setFilters({
            ...filters,
            genre: selectedKey,
        });
    };

    const handleActorChange = (selectedKey: number) => {
        setFilters({
            ...filters,
            actor: selectedKey,
        });
    };

    return (
        <div className="filter-wrapper">
            <Input className="max-w-xs" type="text" label="Search by title" placeholder="Enter a movie title" value={filters.title} onChange={handleTitleChange} />
            <Select
                label="Filter by genre"
                placeholder="Select a genre"
                className="max-w-xs"
                onChange={(e) => handleGenreChange(Number(e.target.value))}
                value={filters.genre ?? ''}
            >
                {selectorItems.genres.map(g =>
                    <SelectItem key={g.id}>
                        {g.name}
                    </SelectItem>
                )}
            </Select>
            <Select
                label="Filter by actor"
                placeholder="Select an actor"
                className="max-w-xs"
                onChange={(e) => handleActorChange(Number(e.target.value))}
                value={filters.actor ?? ''}
            >
                {selectorItems.actors.map(g =>
                    <SelectItem key={g.id}>
                        {g.name}
                    </SelectItem>
                )}
            </Select>
        </div>
    );
};

export default MoviesFilter;