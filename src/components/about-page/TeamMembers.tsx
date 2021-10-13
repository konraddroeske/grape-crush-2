import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import ContentfulImage from '@components/common/ContentfulImage'
import { selectAbout } from '@redux/aboutSlice'

const TeamMembers: FunctionComponent = () => {
  // const { locale } = useSelector(selectGlobal())
  const { teamMembers } = useSelector(selectAbout())

  return (
    <ul
      className="py-6 body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl
    grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-12 lg:pb-0"
    >
      {teamMembers.length > 0 &&
        teamMembers
          .slice()
          .reverse()
          .map((teamMember) => {
            return (
              <li key={teamMember.name} className="">
                {teamMember.image && (
                  <div className="w-10/12 mx-auto mb-6 lg:w-8/12">
                    <ContentfulImage image={teamMember.image} />
                  </div>
                )}
                <h2
                  className="text-center text-2xl text-blue-dark font-medium my-2
                lg:text-3xl 2xl:my-3"
                >
                  {teamMember?.name}
                </h2>
                <p className="text-base 2xl:text-lg">
                  {teamMember.description}
                </p>
              </li>
            )
          })}
    </ul>
  )
}

export default TeamMembers
