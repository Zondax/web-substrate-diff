import React from 'react'
import PropTypes from 'prop-types'
import {
  Header,
  HeaderContainer,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  HeaderSideNavItems,
  SideNav,
  SideNavItems,
  SkipToContent,
} from 'carbon-components-react'

const SubstrateDiffLayout: React.FC = ({ children }) => {
  return (
    <div>
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <Header aria-label="IBM Platform Name">
            <SkipToContent />
            <HeaderMenuButton aria-label="Open menu" onClick={onClickSideNavExpand} isActive={isSideNavExpanded} />

            <HeaderName href="#" prefix="">
              <img src="/images/logo-zondax.svg" width="100px" />
            </HeaderName>
            {/* <HeaderGlobalBar> */}
            <HeaderNavigation aria-label="Zondax dark">
              <HeaderMenuItem href="/">Metadata Diff</HeaderMenuItem>
            </HeaderNavigation>
            {/* </HeaderGlobalBar> */}
            <SideNav aria-label="Side navigation" expanded={isSideNavExpanded} isPersistent={false}>
              <SideNavItems>
                <HeaderSideNavItems>
                  <HeaderMenuItem href="/">Metadata Diff</HeaderMenuItem>
                </HeaderSideNavItems>
              </SideNavItems>
            </SideNav>
          </Header>
        )}
      />
      {children}
    </div>
  )
}

SubstrateDiffLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SubstrateDiffLayout
