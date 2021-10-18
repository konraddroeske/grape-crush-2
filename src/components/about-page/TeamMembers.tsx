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
              <li key={teamMember.name} className="z-10 my-4">
                {teamMember.image && teamMember.svgMask && (
                  <div className="relative w-10/12 mx-auto mb-6 lg:w-8/12">
                    <div
                      className="mask-nav"
                      style={{
                        maskImage: `url(${teamMember.svgMask.url})`,
                        WebkitMaskImage: `url(${teamMember.svgMask.url})`,
                      }}
                    >
                      <ContentfulImage
                        image={teamMember.image}
                        containerStyles="absolute"
                      />
                    </div>
                  </div>
                )}
                <div className="mb-3 2xl:mb-4">
                  <h2 className="text-center text-2xl text-blue-dark font-medium lg:text-3xl">
                    {teamMember?.name}
                  </h2>
                  <h3 className="text-center">{teamMember?.position}</h3>
                </div>
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
