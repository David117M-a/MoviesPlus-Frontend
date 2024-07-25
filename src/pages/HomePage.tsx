import Movies from "../components/Movies";
import MoviesFilter from "../components/MoviesFilter";
import MoviesNavBar from "../components/MoviesNavbar";

const HomePage: React.FC = () => {
    return (
        <div>
            <MoviesNavBar />
            <MoviesFilter />
            <Movies />
        </div>
    );
};

export default HomePage;