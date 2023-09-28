import Image from "next/image";
import Link from "next/link";

import BlogPosts from "@/constants/BlogPosts";

import AddToClipboardButton from "@/components/AddToClipboardButton";
import AnimatedTypingText from "@/components/AnimatedTypingText";
import HomePageAccordion from "@/components/HomepageAccordion";

const HomePage: React.FC = () => {
  const postsToDisplay = BlogPosts.slice(
    BlogPosts.length > 5 ? BlogPosts.length - 5 : 0,
    BlogPosts.length,
  );

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="relative min-h-screen w-full flex flex-col justify-center items-start p-8 md:max-w-lg">
          <div className="relative mb-2">
            <Image
              src="/memojis/namaste.png"
              alt="Memoji doing prayer hands to symbolise a namaste"
              width="100"
              height="100"
              data-testid="namaste-memoji"
            />

            <Image
              src="/icons/chat_bubble.png"
              alt="Chat bubble"
              width="100"
              height="100"
              className="absolute -top-16 -right-12 -scale-x-100"
              data-testid="chat-bubble"
            />

            <span className="absolute -top-8 -right-8 -rotate-12 italic text-sm">
              Namaste
            </span>
          </div>

          <AnimatedTypingText />

          <span className="text-gray-700 mb-2 md:text-xl">
            Having worked in an array of industries, you can count on me to help
            you create innovative bespoke solutions using proven technology.
          </span>

          <HomePageAccordion />
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center bg-gray-200">
        <div className="w-full flex flex-col justify-center items-start px-8 pt-8 md:max-w-lg">
          <Image
            src="/memojis/blog.png"
            alt="Memoji doing prayer hands to symbolise a namaste"
            width="100"
            height="100"
            data-testid="blog-memoji"
          />

          <span className="capitalize font-bold text-2xl md:text-4xl">
            Latest ramblings
          </span>

          <span className="text-gray-700 mb-2 md:text-xl">
            Sometimes I write my thoughts down.
          </span>
        </div>

        <ul className="w-full md:max-w-lg px-8">
          {[
            postsToDisplay
              .reverse()
              .map(({ title, description, slug }, index) => (
                <li
                  key={index}
                  className="w-full border-2 border-gray-700 rounded-md p-2 mb-2 mr-2 cursor-pointer relative focus-within:border-red-500 even:bg-gray-700 even:text-gray-200"
                >
                  <h1 className="font-semibold text-lg mb-2 flex flex-row justify-between items-center capitalize">
                    {title}
                  </h1>
                  <p className="text-xs font-light">{description}</p>
                  <Link
                    aria-label={`read ${title} post`}
                    href={`/blog/${slug}`}
                    className="after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0"
                  />
                </li>
              )),
          ]}
        </ul>

        <div className=" w-full flex flex-row justify-center items-start p-8 md:max-w-lg">
          <Link
            href="/blog"
            aria-label="See all blog posts"
            className="py-2 px-4 focus:outline-none focus:rounded-md focus:ring-2 focus:ring-red-500 focus:ring-inset"
          >
            See All
          </Link>
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        <div
          className="relative min-h-screen w-full flex flex-col justify-center items-start p-8 md:max-w-lg"
          id="contact-me"
        >
          <Image
            src="/memojis/contact.png"
            alt="Memoji doing prayer hands to symbolise a namaste"
            width="100"
            height="100"
            className="mb-2"
            data-testid="contact-memoji"
          />

          <span className="capitalize font-bold text-2xl md:text-4xl">
            Wanna chat?
          </span>

          <span className="text-gray-700 mb-4 md:text-xl">
            Drop me an email and I&apos;ll be in touch as soon as possible.
          </span>

          <AddToClipboardButton
            label="Copy Email"
            clipboardText="sajansharmanz@gmail.com"
          />
        </div>
      </div>
    </>
  );
};

HomePage.displayName = "App:HomePage";

export default HomePage;
