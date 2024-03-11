export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    timeZone: "UTC",
  });
}

interface FormatBlogPostsOptions {
  filterOutDrafts?: boolean;
  filterOutFuturePosts?: boolean;
  sortByDate?: boolean;
  limit?: number;
}

export function formatBlogPosts(
  posts: any[],
  {
    filterOutDrafts = true,
    filterOutFuturePosts = true,
    sortByDate = true,
    limit = undefined,
  }: FormatBlogPostsOptions = {}
) {
  const filteredPosts = posts.reduce((acc, post) => {
    const { date, draft } = post.frontmatter;
    // filter out drafts if true
    if (filterOutDrafts && draft) return acc;
    // filter out future posts if true
    if (filterOutFuturePosts && new Date(date) > new Date()) return acc;
    acc.push(post);

    return acc;
  }, []);

  if (sortByDate) {
    filteredPosts.sort(
      (a: any, b: any) =>
        (new Date(b.frontmatter.date) as any) -
        (new Date(a.frontmatter.date) as any)
    );
  }

  if (limit) {
    return filteredPosts.slice(0, limit);
  }

  return filteredPosts;
}
