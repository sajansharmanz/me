import path from "path";
import fs from "fs/promises";
import MarkdownIt from "markdown-it";

import BackButton from "@/components/BackButton";
import BlogPosts from "@/constants/BlogPosts";

export async function generateStaticParams() {
  return BlogPosts.map((post) => ({ slug: post.slug }));
}

const getPost = async (slug: string): Promise<string> => {
  try {
    const blogPostInfo = BlogPosts.find((post) => post.slug === slug);

    if (!blogPostInfo) {
      return "";
    }

    const file = await fs.readFile(
      path.join(`./markdown/${blogPostInfo.markdownFilename}.md`),
      { encoding: "utf-8" },
    );

    return file;
  } catch (error) {
    return "";
  }
};

interface IProps {
  params: {
    slug: string;
  };
}

const BlogSlugPage: React.FC<IProps> = async ({ params: { slug } }) => {
  const post = await getPost(slug);

  if (!post) {
    return null;
  }

  const md = new MarkdownIt();

  return (
    <>
      <div className="w-full flex justify-center items-center p-8">
        <div className="w-full md:max-w-lg">
          <BackButton />
          <span
            className="prose lg:prose-xl"
            dangerouslySetInnerHTML={{ __html: md.render(post) }}
          />
        </div>
      </div>
    </>
  );
};

BlogSlugPage.displayName = "App:BlogPage";

export default BlogSlugPage;
