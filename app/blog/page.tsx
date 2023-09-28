import Image from "next/image";
import Link from "next/link";

import BlogPosts from "@/constants/BlogPosts";

const BlogPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full flex flex-col justify-center items-start px-8 pt-8 md:max-w-lg">
        <Image
          src="/me/memojis/blog.png"
          alt="Memoji doing prayer hands to symbolise a namaste"
          width="100"
          height="100"
          data-testid="blog-memoji"
        />

        <h1 className="capitalize font-bold text-2xl md:text-4xl">
          My ramblings
        </h1>

        <h3 className="text-gray-700 mb-2 md:text-xl">
          Thoughts that keep me up at night.
        </h3>
      </div>

      <ul className="w-full md:max-w-lg px-8">
        {[
          [...BlogPosts]
            .reverse()
            .map(({ title, description, slug }, index) => (
              <>
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
              </>
            )),
        ]}
      </ul>
    </div>
  );
};

BlogPage.displayName = "App:BlogPage";

export default BlogPage;
