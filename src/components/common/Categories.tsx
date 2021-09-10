import React, { FunctionComponent } from 'react'

// import { useSelector } from 'react-redux'
//
// import { selectGlobal } from '@redux/globalSlice'
// import { selectProducts } from '@redux/productsSlice'

const Categories: FunctionComponent = () => {
  // const { locale } = useSelector(selectGlobal())
  // const { categories } = useSelector(selectProducts())
  return (
    // <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 my-6 sm:my-8 lg:my-12">
    //   {categories.map((category) => {
    //     return (
    //       <li key={category.id}>
    //         <div className="flex">
    //           <img
    //             className="object-cover w-full"
    //             src={category?.image?.file[locale].url}
    //             alt=""
    //           />
    //         </div>
    //         <h4 className="title text-base text-center text-blue text-sm font-bold uppercase mt-2 sm:mt-4 lg:mt-6">
    //           {category.title[locale]}
    //         </h4>
    //       </li>
    //     )
    //   })}
    // </ul>
    <div>Categories</div>
  )
}

export default Categories
