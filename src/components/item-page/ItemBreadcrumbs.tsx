import React, { FunctionComponent } from 'react'

import ItemBreadcrumbLink from '@components/item-page/ItemBreadcrumbLink'
import { ProductLowercase } from '@models/ambassador'

interface OwnProps {
  product: ProductLowercase
}

type Props = OwnProps

const ItemBreadcrumbs: FunctionComponent<Props> = ({ product }) => {
  const { data, type: parentType } = product
  const { category, varietal } = data
  const [primaryVarietal] = varietal

  return (
    <div
      className="h-8 lg:h-12 flex flex-wrap text-xs leading-none font-bold
    overflow-hidden"
    >
      <ItemBreadcrumbLink
        hasBorder={
          parentType.length === 0 &&
          category.length === 0 &&
          primaryVarietal.length === 0
        }
        category=""
        tag=""
      />
      {parentType.length > 0 && (
        <ItemBreadcrumbLink
          hasBorder={category.length === 0 && primaryVarietal.length === 0}
          category="parentType"
          tag={parentType}
        />
      )}
      {category.length > 0 && (
        <ItemBreadcrumbLink
          hasBorder={primaryVarietal.length === 0}
          category="category"
          tag={category}
        />
      )}
      {primaryVarietal.length > 0 && (
        <ItemBreadcrumbLink
          hasBorder
          category="varietal"
          tag={primaryVarietal}
        />
      )}
    </div>
  )
}

export default ItemBreadcrumbs
