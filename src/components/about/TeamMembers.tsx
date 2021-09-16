import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import ContentfulImage from '@components/common/ContentfulImage'
import { selectAbout } from '@redux/aboutSlice'
import { selectGlobal } from '@redux/globalSlice'

const TeamMembers: FunctionComponent = () => {
  const { locale } = useSelector(selectGlobal())
  const { teamMembers } = useSelector(selectAbout())

  return (
    <ul
      className="body-gutter-sm lg:body-gutter-lg xl:body-gutter-xl 2xl:body-gutter-2xl
    lg:grid lg:grid-cols-3 lg:gap-x-8"
    >
      {teamMembers.length > 0 &&
        teamMembers
          .slice()
          .reverse()
          .map((teamMember) => {
            return (
              <li key={teamMember.name[locale]} className="py-6">
                {teamMember.image && (
                  <div className="w-10/12 mx-auto mb-6 lg:w-8/12">
                    <ContentfulImage image={teamMember.image} />
                  </div>
                )}
                <h2
                  className="text-center text-2xl text-blue-dark font-medium my-2
                lg:text-3xl 2xl:my-3"
                >
                  {teamMember?.name[locale]}
                </h2>
                <p className="text-base 2xl:text-lg">
                  {teamMember.description[locale]}
                </p>
              </li>
            )
          })}
    </ul>
  )
}

export default TeamMembers
