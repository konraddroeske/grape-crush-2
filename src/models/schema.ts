import { gql } from '@apollo/client'

const heroFragment = gql`
  fragment HeroFragment on HeroSlide {
    title
    image {
      description
      title
      url
      width
      height
    }
    mainImage
    link
  }
`

const pageFragment = gql`
  fragment PageFragment on Page {
    title
    slug
    category
    content {
      json
    }
  }
`

const categoryFragment = gql`
  fragment CategoryFragment on Category {
    title
    image {
      width
      height
      url
      title
      description
    }
    categoryName
    link
  }
`

const footerFragment = gql`
  fragment FooterFragment on Footer {
    image {
      title
      description
      width
      height
      url
    }
  }
`

const navFragment = gql`
  fragment NavFragment on Nav {
    image {
      title
      description
      url
      width
      height
    }
  }
`

const pageQuery = gql`
  query PageAssets {
    pageCollection {
      items {
        ...PageFragment
      }
    }
  }
  ${pageFragment}
`

const globalQuery = gql`
  query HeroAssets {
    heroSlideCollection {
      items {
        ...HeroFragment
      }
    }
    pageCollection {
      items {
        ...PageFragment
      }
    }
    categoryCollection {
      items {
        ...CategoryFragment
      }
    }
    footerCollection {
      items {
        ...FooterFragment
      }
    }
    navCollection {
      items {
        ...NavFragment
      }
    }
  }
  ${heroFragment}
  ${pageFragment}
  ${categoryFragment}
  ${footerFragment}
  ${navFragment}
`

const contactFragment = gql`
  fragment ContactFragment on Contact {
    slug
    address {
      json
    }
    hours {
      json
    }
    contact {
      json
    }
    image {
      title
      description
      width
      height
      url
    }
  }
`

const contactQuery = gql`
  query ContactAssets {
    contactCollection {
      items {
        ...ContactFragment
      }
    }
  }
  ${contactFragment}
`

const faqFragment = gql`
  fragment FaqFragment on Faq {
    question
    answer
    anchor
    published
  }
`

const faqQuery = gql`
  query FaqAssets {
    faqCollection {
      items {
        ...FaqFragment
      }
    }
  }
  ${faqFragment}
`

const aboutFragment = gql`
  fragment AboutFragment on About {
    slug
    headline
    paragraph1 {
      json
    }
    image1 {
      title
      description
      width
      height
      url
    }
    paragraph2 {
      json
    }
    image2 {
      title
      description
      url
      width
      height
    }
  }
`

const teamMembersFragment = gql`
  fragment TeamMembersFragment on TeamMembers {
    name
    image {
      description
      url
      width
      height
      title
    }
    description
  }
`

const aboutQuery = gql`
  query AboutAssets {
    aboutCollection {
      items {
        ...AboutFragment
      }
    }
    teamMembersCollection {
      items {
        ...TeamMembersFragment
      }
    }
  }
  ${aboutFragment}
  ${teamMembersFragment}
`

const infoBoxFragment = gql`
  fragment InfoBox1Fragment on InfoBox1 {
    title
    order
    description
    image {
      title
      description
      url
      width
      height
    }
    tag
  }
`

const indexQuery = gql`
  query InfoBoxAssets {
    infoBox1Collection {
      items {
        ...InfoBox1Fragment
      }
    }
  }
  ${infoBoxFragment}
`

export const missingImageQuery = gql`
  query Query($assetCollectionWhere: AssetFilter) {
    assetCollection(where: $assetCollectionWhere) {
      items {
        title
        description
        url
        width
        height
      }
    }
  }
`
// eslint-disable-next-line import/prefer-default-export
export {
  globalQuery,
  contactQuery,
  faqQuery,
  aboutQuery,
  indexQuery,
  pageQuery,
}
