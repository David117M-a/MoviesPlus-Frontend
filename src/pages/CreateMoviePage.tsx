import CreateMovieForm from "../components/CreateMovieForm";
import MoviesNavBar from "../components/MoviesNavbar";

const CreateMoviePage: React.FC = () => {
    return (
        <div>
            <MoviesNavBar />
            <CreateMovieForm />
        </div>
    );
};

export default CreateMoviePage;