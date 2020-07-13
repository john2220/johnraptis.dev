import React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Helmet from "react-helmet"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { title, description, date } = post.frontmatter
    const { html, timeToRead } = post

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet title={`${title} - John Raptis`} />
        <SEO title={title} description={description || post.excerpt} />

        <article className="post">
          <header className="post-title">
            <h1>{title}</h1>
            <p>{date}</p>
            <span> {timeToRead} min read</span>
          </header>

          <section dangerouslySetInnerHTML={{ __html: html }} />
          <hr />

          <footer>
            <Bio />
          </footer>
        </article>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
