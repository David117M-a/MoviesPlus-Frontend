import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";

const Movie: React.FC<{ title: string, genre: string | undefined, cover: string }> = (props) => {

    const toTitleCase = (str: string): string => {
        return str.replace(
          /\w\S*/g,
          text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
        );
      }

    return (
        <Card style={{ width: '200px', height: '300px' }} isFooterBlurred isPressable>
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white uppercase font-bold">{props.genre}</p>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card example background"
                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                src={props.cover}
            />
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                <div>
                    <h4 className="text-white font-medium text-2xl">{toTitleCase(props.title)}</h4>
                </div>
                <Button className="text-tiny" color="default" radius="md" size="sm" variant="shadow">
                    See Details
                </Button>
            </CardFooter>
        </Card>
    );
};

export default Movie;