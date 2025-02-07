import { Button } from "../ui/button";
import {
  CardContent,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";

const Hero = () => {
  return (
    <div className="!flex h-[90vh] w-full items-center justify-between px-10">
      <img
        src="https://bucket.material-tailwind.com/magic-ai/533bce4cae28c0673a41bd6f91cf9d1063c842a2bd80092e2c9b000df480dd7c.jpg"
        alt="bg-img"
        className="absolute inset-0  h-full rounded-bl-[100px] object-cover object-center w-screen"
      />
      <div className="container mx-auto lg:mt-0">
        <div className="grid grid-cols-12 text-center lg:text-left">
          <Card className="relative flex flex-col bg-clip-border text-foreground px-6 py-10 border border-background shadow-lg col-span-full rounded-xl bg-background shadow-black/10 backdrop-blur-sm backdrop-saturate-200 xl:col-span-7">
            <CardHeader>
              <CardTitle className="block antialiased tracking-normal font-sans font-semibold text-blue-gray-900 text-3xl !leading-snug lg:text-5xl">
                Online Book Store
              </CardTitle>
              <CardDescription className="block antialiased font-sans text-xl font-normal leading-relaxed mb-10 mt-6 text-foreground">
                Welcome to our online book store where you can explore a wide
                range of books from various genres. Whether you&apos;re a
                bookworm or looking for a gift, we have something for everyone.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center gap-4 mb-8 lg:justify-start text-foreground">
                <Button className="bg-gray-900 text-white hover:bg-gray-800">
                  Contact Us
                </Button>
                <Button variant="outline" className="">
                  Read More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Hero;
