interface BlogPost {
  title: string;
  description: string;
  slug: string;
  markdownFilename: string;
}

const BlogPosts: BlogPost[] = [
  {
    title: "Decoding Browser Storage Options",
    description:
      "An overview of when it is appropriate to use the different storage methods considering their offerings and security implications.",
    slug: "decoding-browser-storage-options",
    markdownFilename: "decoding-browser-storage-options",
  },
  {
    title: "Simple Animated Accordion With TypeScript, React And Tailwind",
    description:
      "Learn to create your own Accordion component using TypeScript, React and Tailwind, utilising the Compound Component Pattern.",
    slug: "simple-animated-accordion-with-typescript-react-and-tailwind",
    markdownFilename:
      "simple-animated-accordion-with-typescript-react-and-tailwind",
  },
  {
    title: "HTTPS/SSL For Local Development",
    description: "Use HTTPS during local development",
    slug: "https-ssl-for-local-development",
    markdownFilename: "https-ssl-for-local-development",
  },
  {
    title: "Reusable components for any flavour of JavaScript",
    description:
      "Learn to create components once and have them work across any JavaScript flavour",
    slug: "reusable-components-for-any-flavour-of-javascript",
    markdownFilename: "reusable-components-stenciljs",
  },
  {
    title: "ExpressJS Auth",
    description: "Considerations to make when setting up your own auth",
    slug: "express-js-auth",
    markdownFilename: "express-js-auth",
  },
];

export default BlogPosts;
