const pageQuery = `
{
    ...,
    image {
      asset->{url}
    },
    postview {
      posts[]-> {
        title,
        slug {
          current
        },
        publishedAt
      },
      poststyle
    },
    embed,
    gallery[] {
      asset -> {
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    }
  }
`;

export { pageQuery };
