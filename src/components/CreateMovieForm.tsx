import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import "./CreateMovieForm.css";
import { useContext, useEffect, useState } from "react";
import { SelectorItems } from "../types/SelectorItems";
import Movie from "../models/Movie";
import { MoviesContext } from "../store/movies-context";
import { useNavigate } from "react-router-dom";

const CreateMovieForm: React.FC = () => {
    const navigate = useNavigate();
    const moviesCtx = useContext(MoviesContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [movie, setMovie] = useState<Movie>({
        id: 0,
        title: "",
        cover: "",
        genreId: 0,
        genre: "",
        actors: []
    });
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

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/actors`).then(res => res.json())
            .then(actors => {
                fetch(`${process.env.REACT_APP_API_URL}/genres`).then(res => res.json())
                    .then(genres => setSelectorItems({ ...selectorItems, genres, actors }));
            });
    }, []);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMovie({
            ...movie,
            title: e.target.value,
        });
    };

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMovie({
            ...movie,
            cover: e.target.value,
        });
    };

    const handleGenreChange = (selectedKey: number) => {
        setMovie({
            ...movie,
            genreId: selectedKey,
        });
    };

    const handleCreate = () => {
        if (movie.title == "")
            return;

        moviesCtx.createMovie(movie);

        // TODO - Handle api exception
        onOpen();
    };

    const handleReturn = () => {
        navigate("/");
    };

    const handleActorChange = (selectedKey: number) => {
        if (movie.actors?.includes(selectedKey))
            return;

        setMovie({
            ...movie,
            actors: [...movie.actors!, selectedKey],
        });
    };

    const handleDeleteActor = (selectedKey: number) => {
        let newActors: number[] | undefined = movie.actors?.filter(a => a != selectedKey);

        setMovie({
            ...movie,
            actors: [...newActors!],
        });
    };

    return (
        <>
            <div className="form-wrapper">
                <Card className="max-w-xs">
                    <CardHeader className="flex gap-3">
                        <Image
                            alt="nextui logo"
                            height={40}
                            radius="sm"
                            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                            width={40}
                        />
                        <div className="flex flex-col">
                            <p className="text-md">Create Movie</p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <Input className="form-input" type="text" label="Title" placeholder="Enter a movie title" value={movie.title} onChange={handleTitleChange} />
                        <Input className="form-input" type="text" label="Cover" placeholder="Enter a cover url image" value={movie.cover} onChange={handleCoverChange} />
                        <div>
                            <p className="text-sm">Cover Previsualization</p>
                            <Image
                                className="form-input"
                                alt="Cover photo"
                                height={70}
                                radius="sm"
                                src={movie.cover}
                                width={60}
                            />
                        </div>
                        <Select
                            label="Filter by genre"
                            placeholder="Select a genre"
                            className="form-input"
                            onChange={(e) => handleGenreChange(Number(e.target.value))}
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
                            className="form-input"
                            onChange={(e) => handleActorChange(Number(e.target.value))}
                        >
                            {selectorItems.actors.map(g =>
                                <SelectItem key={g.id}>
                                    {g.name}
                                </SelectItem>
                            )}
                        </Select>
                        <p className="text-sm">Selected actors (click to delete)</p>
                        <ul>
                            {movie.actors?.map(a => <li onClick={() => handleDeleteActor(a)}>{selectorItems.actors.find(ac => ac.id == a)?.name}</li>)}
                        </ul>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                        <Button onClick={handleCreate} className="text-tiny text-white" color="success" radius="md" size="md" variant="shadow">
                            Create
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Movie Created Successfully!</ModalHeader>
                            <ModalBody>
                                <h1>Let's back to movies list</h1>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={handleReturn}>
                                    Return to Movies List
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default CreateMovieForm;